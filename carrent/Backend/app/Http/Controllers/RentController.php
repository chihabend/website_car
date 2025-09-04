<?php

namespace App\Http\Controllers;

use App\Models\Rent;
use App\Models\Car;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use PDF;

class RentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $allRents = Rent::all();
        $results = [];
        foreach ($allRents as $rent) {
            $obj  = [
                    'id' => $rent->id,
                    // car info
                    'car_id' => $rent->cars->id,
                    'brand' => $rent->cars->brand,
                    'price' => $rent->cars->price,
                    'photo' => $rent->cars->photo1,
                    'fuel_type' => $rent->cars->fuel_type,
                    // user info
                    'user_id' => $rent->user->id,
                    'firstname' => $rent->user->firstname,
                    'telephone' => $rent->user->telephone,
                    //rents info
                    'total' => $rent->price,
                    'rental_date' => $rent->rental_date,
                    'return_date' => $rent->return_date,
                ];

            $results[] = $obj;
        }

        return $results;

     
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'rental_date' => 'required|date',
            'return_date' => 'required|date',
            'price' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:cars,id',
        ]);

        $rental = new Rent();
        $rental->rental_date = $request->rental_date;
        $rental->return_date = $request->return_date;
        $rental->price = $request->price;
        $rental->user_id = $request->user_id;
        $rental->car_id = $request->car_id;
        $rental->save();

        // Récupérer les informations du client et de la voiture
        $user = User::find($request->user_id);
        $car = Car::find($request->car_id);

        // Envoyer l'email à l'admin
        $this->sendAdminNotification($user, $car, $rental);

        return response($rental);
    }

    /**
     * Envoyer une notification email à l'admin
     */
    private function sendAdminNotification($user, $car, $rental)
    {
        $adminEmail = 'testsaad8@gmail.com'; // Email de test
        
        $data = [
            'user_name' => $user->firstname . ' ' . $user->lastname,
            'user_email' => $user->email,
            'user_phone' => $user->telephone,
            'car_brand' => $car->brand,
            'car_model' => $car->model,
            'rental_date' => $rental->rental_date,
            'return_date' => $rental->return_date,
            'total_price' => $rental->price,
            'rental_id' => $rental->id
        ];

        try {
            Mail::send('emails.admin-notification', $data, function($message) use ($adminEmail, $data) {
                $message->to($adminEmail)
                        ->subject('Nouvelle réservation - Confirmation téléphonique requise')
                        ->from('noreply@synluxury.com', 'SY Luxury Rentals');
            });
        } catch (\Exception $e) {
            // Log l'erreur mais ne pas faire échouer la réservation
            \Log::error('Erreur envoi email admin: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return Rent::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $fields = $request->validate([
            'rental_date' => 'required|date',
            'return_date' => 'required|date',
            'price' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:cars,id',
        ]);
        if(!$fields){
            return ['message' => 'not valid fields to update'];
        }

        $rent = Rent::find($id);
        $rent->update($fields);

        return $rent;
        

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $rent = Rent::find($id);
        if(!$rent) {
            return ['message' => 'rent dont exist'];
        }
        return $rent->delete();
    }

    /**
     * Show list of rents for a user
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function myRents($id)
    {
        // Assuming the $id parameter is the user ID
        $rents = Rent::where('user_id', $id)->orderBy('id', 'desc')->get();
        $results = [];
        foreach($rents as $rent){
            $obj  = [
                'id' => $rent->id,
                'car_id' => $rent->cars->id,
                'brand' => $rent->cars->brand,
                'model' => $rent->cars->model,
                'photo' => $rent->cars->photo1,
                'fuel_type' => $rent->cars->fuel_type,
                'price' => $rent->price,
                'rental_date' => $rent->rental_date,
                'return_date' => $rent->return_date,
            ];

            $results[] = $obj;
        }

        return $results;
    }


    /**
     * Show form to edit a rent 
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editRent($id)
    {
        // Assuming the $id parameter is the user ID
        $rent = Rent::find($id);
  
        $obj  = [
            'id' => $rent->id,
            'brand' => $rent->cars->brand,
            'rental_date' => $rent->rental_date,
            'return_date' => $rent->return_date,
        ];
  
        return $obj;
    }




    // ...


    public function downloadRent($id)
    {
        $rent = Rent::findOrFail($id);

        // Prepare data for the PDF
        $obj = [
            'id' => $rent->id,
            'car_id' => $rent->cars->id,
            'brand' => $rent->cars->brand,
            'price' => $rent->cars->price,
            'photo' => $rent->cars->photo1,
            'fuel_type' => $rent->cars->fuel_type,
            'user_id' => $rent->user->id,
            'firstname' => $rent->user->firstname,
            'telephone' => $rent->user->telephone,
            'total' => $rent->price,
            'rental_date' => $rent->rental_date,
            'return_date' => $rent->return_date,
        ];

        // Generate the PDF using the view and data
        $pdf = PDF::loadView('pdfs.rent_pdf', compact('obj'))->setPaper('A4', 'portrait');

        // Generate the filename
        $filename = ''.$rent->user->firstname.'_rent_facture.pdf';

        // Download the PDF file
            return response($pdf->output(), 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'attachment; filename="'.$filename.'"');
    }

    /**
     * Generate invoice for a specific car
     */
    public function generateInvoice($carId)
    {
        $car = Car::findOrFail($carId);
        
        // Récupérer les informations de l'utilisateur connecté
        $user = auth()->user();
        
        // Calculate estimated price for 1 day
        $estimatedPrice = $car->price;
        $rentalDate = now()->format('Y-m-d');
        $returnDate = now()->addDay()->format('Y-m-d');
        
        // Prepare data for the invoice
        $invoiceData = [
            'invoice_number' => 'INV-' . strtoupper(uniqid()),
            'invoice_date' => now()->format('d/m/Y'),
            'due_date' => now()->addDays(30)->format('d/m/Y'),
            'car_brand' => $car->brand,
            'car_model' => $car->model,
            'car_category' => $car->category,
            'car_fuel_type' => $car->fuel_type,
            'car_gearbox' => $car->gearbox,
            'car_price_per_day' => $car->price,
            'rental_date' => $rentalDate,
            'return_date' => $returnDate,
            'total_days' => 1,
            'subtotal' => $estimatedPrice,
            'tax_rate' => 20, // 20% TVA
            'tax_amount' => $estimatedPrice * 0.20,
            'total_amount' => $estimatedPrice * 1.20,
            'company_name' => 'SY Luxury Rentals',
            'company_address' => '123 Avenue Mohammed V, Casablanca, Maroc',
            'company_phone' => '+212 6 12 34 56 78',
            'company_email' => 'contact@synluxury.com',
            'company_website' => 'www.synluxury.com',
            // Informations du client
            'client_name' => $user ? $user->firstname . ' ' . $user->lastname : 'Client',
            'client_email' => $user ? $user->email : 'Non spécifié',
            'client_phone' => $user ? $user->telephone : 'Non spécifié',
            'client_id' => $user ? $user->id : null
        ];

        // Generate the PDF using the invoice template
        $pdf = PDF::loadView('pdfs.invoice_template', compact('invoiceData'))->setPaper('A4', 'portrait');

        // Generate the filename
        $filename = 'facture_' . $car->brand . '_' . $car->model . '_' . now()->format('Y-m-d') . '.pdf';

        // Download the PDF file
        return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="'.$filename.'"');
    }

}
