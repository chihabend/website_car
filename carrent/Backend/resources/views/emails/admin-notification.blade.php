<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle Réservation - SY Luxury Rentals</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #dc2626;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #dc2626;
            margin-bottom: 10px;
        }
        .alert {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            color: #dc2626;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .info-section {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 5px 0;
        }
        .info-label {
            font-weight: bold;
            color: #555;
        }
        .info-value {
            color: #333;
        }
        .highlight {
            background-color: #dc2626;
            color: white;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
        }
        .cta-button {
            display: inline-block;
            background-color: #dc2626;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">SY LUXURY RENTALS</div>
            <h1 style="color: #dc2626; margin: 0;">Nouvelle Réservation</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Confirmation téléphonique requise</p>
        </div>

        <div class="alert">
            <strong>⚠️ ACTION REQUISE :</strong> Un client a confirmé une réservation. Veuillez l'appeler pour confirmer les détails.
        </div>

        <div class="info-section">
            <h3 style="color: #dc2626; margin-top: 0;">📞 Informations du Client</h3>
            <div class="info-row">
                <span class="info-label">Nom complet :</span>
                <span class="info-value">{{ $user_name }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email :</span>
                <span class="info-value">{{ $user_email }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Téléphone :</span>
                <span class="info-value"><strong>{{ $user_phone }}</strong></span>
            </div>
        </div>

        <div class="info-section">
            <h3 style="color: #dc2626; margin-top: 0;">🚗 Détails du Véhicule</h3>
            <div class="info-row">
                <span class="info-label">Marque :</span>
                <span class="info-value">{{ $car_brand }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Modèle :</span>
                <span class="info-value">{{ $car_model }}</span>
            </div>
        </div>

        <div class="info-section">
            <h3 style="color: #dc2626; margin-top: 0;">📅 Détails de la Réservation</h3>
            <div class="info-row">
                <span class="info-label">ID Réservation :</span>
                <span class="info-value">#{{ $rental_id }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Date de début :</span>
                <span class="info-value">{{ \Carbon\Carbon::parse($rental_date)->format('d/m/Y') }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Date de retour :</span>
                <span class="info-value">{{ \Carbon\Carbon::parse($return_date)->format('d/m/Y') }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Prix total :</span>
                <span class="info-value"><strong>{{ $total_price }} MAD</strong></span>
            </div>
        </div>

        <div class="highlight">
            <h3 style="margin: 0;">📞 ACTION IMMÉDIATE REQUISE</h3>
            <p style="margin: 10px 0 0 0;">
                Veuillez appeler le client au <strong>{{ $user_phone }}</strong> pour :
            </p>
            <ul style="text-align: left; margin: 10px 0;">
                <li>Confirmer les détails de la réservation</li>
                <li>Vérifier la disponibilité du véhicule</li>
                <li>Confirmer le mode de paiement</li>
                <li>Discuter des modalités de livraison/retrait</li>
            </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="tel:{{ $user_phone }}" class="cta-button">
                📞 Appeler {{ $user_name }}
            </a>
        </div>

        <div class="footer">
            <p><strong>SY Luxury Rentals</strong></p>
            <p>Email : admin@synluxury.com | Tél : +212 6 12 34 56 78</p>
            <p>Cet email a été généré automatiquement. Merci de ne pas y répondre.</p>
        </div>
    </div>
</body>
</html> 