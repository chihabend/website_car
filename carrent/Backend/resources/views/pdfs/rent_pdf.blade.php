<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture de Location</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #f7f7f7;
            color: #222;
        }
        .container {
            max-width: 700px;
            margin: 30px auto;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px #0001;
            padding: 32px 40px 24px 40px;
        }
        .header {
            display: flex;
            align-items: center;
            border-bottom: 2px solid #e53e3e;
            padding-bottom: 16px;
            margin-bottom: 24px;
        }
        .logo {
            width: 70px;
            height: 70px;
            object-fit: contain;
            margin-right: 24px;
        }
        .company-info {
            flex: 1;
        }
        .company-info h2 {
            margin: 0 0 4px 0;
            color: #e53e3e;
            font-size: 1.6rem;
            letter-spacing: 1px;
        }
        .company-info p {
            margin: 0;
            font-size: 0.95rem;
            color: #444;
        }
        .facture-title {
            text-align: right;
            font-size: 1.5rem;
            color: #222;
            font-weight: bold;
        }
        .section {
            margin-bottom: 24px;
        }
        .section-title {
            color: #e53e3e;
            font-weight: bold;
            margin-bottom: 8px;
            font-size: 1.1rem;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
        }
        .info-table td {
            padding: 6px 0;
            font-size: 1rem;
        }
        .car-photo {
            width: 120px;
            height: 80px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #eee;
        }
        .recap-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
        }
        .recap-table th, .recap-table td {
            border: 1px solid #e0e0e0;
            padding: 10px 8px;
            text-align: left;
        }
        .recap-table th {
            background: #f3f3f3;
            color: #e53e3e;
            font-size: 1rem;
        }
        .recap-table td.total-label {
            text-align: right;
            font-weight: bold;
        }
        .recap-table td.total-value {
            color: #e53e3e;
            font-size: 1.2rem;
            font-weight: bold;
        }
        .footer {
            margin-top: 32px;
            text-align: center;
            color: #888;
            font-size: 0.95rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="/assets/images/Logo.png" alt="Logo TEXAS CAR" class="logo">
            <div class="company-info">
                <h2>TEXAS CAR</h2>
                <p>28 bis Immeuble Khalifa, Rue Anatôle France, El Jadida 24000</p>
                <p>Tél: 06 55 58 31 58 | 06 61 11 88 85 | Fix: 05 23 34 01 32</p>
                <p>contact@texascar.ma • https://texascar.ma</p>
            </div>
            <div class="facture-title">
                Facture de Location
                <div style="font-size:0.95rem; color:#888; font-weight:normal;">N° {{ $obj['id'] }}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Informations du Client</div>
            <table class="info-table">
                <tr><td><b>Nom :</b></td><td>{{ $obj['firstname'] }}</td></tr>
                <tr><td><b>Téléphone :</b></td><td>{{ $obj['telephone'] }}</td></tr>
                <tr><td><b>ID Client :</b></td><td>{{ $obj['user_id'] }}</td></tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">Véhicule Loué</div>
            <table class="info-table">
                <tr>
                    <td rowspan="4">
                        <img src="./images/{{ $obj['photo'] }}" alt="Photo voiture" class="car-photo">
                    </td>
                    <td><b>Marque :</b></td><td>{{ $obj['brand'] }}</td>
                </tr>
                <tr><td><b>Carburant :</b></td><td>{{ $obj['fuel_type'] }}</td></tr>
                <tr><td><b>ID Voiture :</b></td><td>{{ $obj['car_id'] }}</td></tr>
                <tr><td><b>Prix/Jour :</b></td><td>{{ $obj['price'] }} MAD</td></tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">Détails de la Location</div>
            <table class="recap-table">
                <tr>
                    <th>Date Début</th>
                    <th>Date Fin</th>
                    <th>Prix/Jour</th>
                    <th>Nombre de Jours</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>{{ $obj['rental_date'] }}</td>
                    <td>{{ $obj['return_date'] }}</td>
                    <td>{{ $obj['price'] }} MAD</td>
                    <td>
                        @php
                            $days = (strtotime($obj['return_date']) - strtotime($obj['rental_date'])) / (60*60*24);
                            $days = $days > 0 ? $days : 1;
                        @endphp
                        {{ $days }}
                    </td>
                    <td class="total-value">{{ $obj['total'] }} MAD</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            Merci pour votre confiance.<br>
            TEXAS CAR &copy; {{ date('Y') }}
        </div>
    </div>
</body>
</html>
