<?php

/** @noinspection ALL */

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Rent;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class StripeController extends Controller
{
 
    public function checkout($id)
    {
        try {
            \Log::info('Début checkout Stripe', ['rent_id' => $id]);
            // Vérifier que les clés Stripe sont configurées
            $secretKey = env('STRIPE_SECRET');
            $publishableKey = env('STRIPE_KEY');
            
            \Log::info('Clés Stripe trouvées', [
                'secret_key_exists' => !empty($secretKey),
                'publishable_key_exists' => !empty($publishableKey),
                'secret_key_length' => strlen($secretKey),
                'publishable_key_length' => strlen($publishableKey)
            ]);
            
            if (empty($secretKey) || empty($publishableKey)) {
                \Log::error('Clés Stripe manquantes', [
                    'secret_key' => $secretKey,
                    'publishable_key' => $publishableKey
                ]);
                return response()->json([
                    'error' => 'Configuration Stripe manquante. Veuillez configurer les clés Stripe dans le fichier .env'
                ], 500);
            }

            \Log::info('Clés Stripe trouvées');

            // Récupérer la réservation spécifique
            $rent = Rent::with('cars')->find($id);

            if (!$rent) {
                \Log::error('Réservation non trouvée', ['rent_id' => $id]);
                return response()->json([
                    'error' => 'Réservation non trouvée'
                ], 404);
            }

            \Log::info('Réservation trouvée', ['rent' => $rent->toArray()]);

            // Vérifier que l'utilisateur est authentifié et propriétaire de la réservation
            if (!auth()->check()) {
                \Log::error('Utilisateur non authentifié');
                return response()->json([
                    'error' => 'Non authentifié'
                ], 401);
            }

            if (auth()->id() != $rent->user_id) {
                \Log::error('Utilisateur non autorisé', [
                    'auth_id' => auth()->id(),
                    'rent_user_id' => $rent->user_id
                ]);
                return response()->json([
                    'error' => 'Non autorisé'
                ], 403);
            }

            \Log::info('Utilisateur autorisé');

            \Stripe\Stripe::setApiKey($secretKey);
            
            $lineItems = [
                [
                    'price_data' => [
                        'currency' => 'mad',
                        'product_data' => [
                            'name' => $rent->cars->brand . ' ' . $rent->cars->model,
                            'description' => 'Location du ' . $rent->rental_date . ' au ' . $rent->return_date,
                        ],
                        'unit_amount' => (int)($rent->price * 100), // Stripe utilise les centimes
                    ],
                    'quantity' => 1,
                ]
                ];

            \Log::info('Création session Stripe', ['line_items' => $lineItems]);

            $checkout_session = \Stripe\Checkout\Session::create([
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => env('FRONTEND_URL', 'http://localhost:3000') . '/payment/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => env('FRONTEND_URL', 'http://localhost:3000') . '/payment/cancel',
                'metadata' => [
                    'rent_id' => $rent->id,
                    'user_id' => $rent->user_id,
                    'car_id' => $rent->car_id,
                    'total_amount' => $rent->price
                ],
                'customer_email' => auth()->user()->email ?? null,
                'locale' => 'fr',
                'payment_method_types' => ['card'],
            ]);

            \Log::info('Session Stripe créée', ['session_id' => $checkout_session->id]);

            return response()->json([
                'url' => $checkout_session->url,
                'session_id' => $checkout_session->id
            ]);

        } catch (\Exception $e) {
            \Log::error('Erreur Stripe checkout: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'error' => 'Erreur lors de la création de la session de paiement: ' . $e->getMessage()
            ], 500);
        }
    }
    
    public function success(Request $request)
    {
        try {
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            $sessionId = $request->get('session_id');

            if (!$sessionId) {
                return response()->json([
                    'error' => 'Session ID manquant'
                ], 400);
            }

            $session = \Stripe\Checkout\Session::retrieve($sessionId);
            
            if (!$session) {
                throw new NotFoundHttpException('Session non trouvée');
            }

            // Marquer la réservation comme payée
            $rentId = $session->metadata->rent_id ?? null;
            if ($rentId) {
                $rent = Rent::find($rentId);
                
                if ($rent) {
                    $rent->update([
                        'payment_status' => 'paid',
                        'payment_method' => 'stripe',
                        'stripe_session_id' => $sessionId,
                        'stripe_payment_intent_id' => $session->payment_intent ?? null,
                        'paid_at' => now()
                    ]);
                }
            }

            \Log::info('Paiement Stripe réussi', [
                'session_id' => $sessionId,
                'rent_id' => $rentId,
                'amount' => $session->amount_total
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Paiement effectué avec succès',
                'session_id' => $sessionId
            ]);

        } catch (\Exception $e) {
            \Log::error('Erreur Stripe success: ' . $e->getMessage());
            return response()->json([
                'error' => 'Erreur lors du traitement du paiement: ' . $e->getMessage()
            ], 500);
        }
    }

    public function cancel()
    {
        return response()->json([
            'message' => 'Paiement annulé'
        ]);
    }
}
