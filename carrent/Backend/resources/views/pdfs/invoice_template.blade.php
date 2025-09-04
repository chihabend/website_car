<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture - TEXAS CAR</title>
    <style>
        @page {
            margin: 0;
            padding: 20px;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background: #ffffff;
        }
        
        .header {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            transform: translate(30px, -30px);
        }
        
        .company-logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .company-tagline {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .invoice-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        
        .invoice-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #dc2626;
        }
        
        .invoice-number {
            font-size: 18px;
            font-weight: bold;
            color: #dc2626;
            margin-bottom: 10px;
        }
        
        .invoice-date {
            color: #666;
            font-size: 14px;
        }
        
        .client-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
        }
        
        .car-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #10b981;
        }
        
        .car-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .car-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .car-item:last-child {
            border-bottom: none;
        }
        
        .car-label {
            font-weight: bold;
            color: #555;
        }
        
        .car-value {
            color: #333;
        }
        
        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        
        .invoice-table th {
            background: #dc2626;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: bold;
        }
        
        .invoice-table td {
            padding: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .invoice-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .total-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .total-row:last-child {
            border-bottom: none;
            font-weight: bold;
            font-size: 18px;
            color: #dc2626;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-top: 30px;
        }
        
        .footer-title {
            font-weight: bold;
        }
        
        .footer-info {
            color: #666;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 60px;
            color: rgba(220, 38, 38, 0.1);
            z-index: -1;
        }
    </style>
</head>
<body>
    <div class="watermark">TEXAS CAR</div>
    
    <!-- Header -->
    <div class="header">
        <div class="company-logo">TEXAS CAR</div>
        <div class="company-tagline">Location de voitures (toutes catégories) - Depuis 2007</div>
    </div>
    
    <!-- Invoice Information -->
    <div class="invoice-info">
        <div class="invoice-details">
            <div class="invoice-number">Facture #{{ $invoiceData['invoice_number'] }}</div>
            <div class="invoice-date">Date: {{ $invoiceData['invoice_date'] }}</div>
            <div class="invoice-date">Échéance: {{ $invoiceData['due_date'] }}</div>
        </div>
        
        <div class="client-info">
            <div class="section-title">Informations Client</div>
            <div>Nom: {{ $invoiceData['client_name'] }}</div>
            <div>Email: {{ $invoiceData['client_email'] }}</div>
            <div>Téléphone: {{ $invoiceData['client_phone'] }}</div>
            @if($invoiceData['client_id'])
            <div>ID Client: #{{ $invoiceData['client_id'] }}</div>
            @endif
        </div>
    </div>
    
    <!-- Car Details -->
    <div class="car-details">
        <div class="section-title">Détails du Véhicule</div>
        <div class="car-grid">
            <div class="car-item">
                <span class="car-label">Marque:</span>
                <span class="car-value">{{ $invoiceData['car_brand'] }}</span>
            </div>
            <div class="car-item">
                <span class="car-label">Modèle:</span>
                <span class="car-value">{{ $invoiceData['car_model'] }}</span>
            </div>
            <div class="car-item">
                <span class="car-label">Catégorie:</span>
                <span class="car-value">{{ $invoiceData['car_category'] }}</span>
            </div>
            <div class="car-item">
                <span class="car-label">Carburant:</span>
                <span class="car-value">{{ $invoiceData['car_fuel_type'] }}</span>
            </div>
            <div class="car-item">
                <span class="car-label">Boîte:</span>
                <span class="car-value">{{ $invoiceData['car_gearbox'] }}</span>
            </div>
            <div class="car-item">
                <span class="car-label">Prix/jour:</span>
                <span class="car-value">{{ $invoiceData['car_price_per_day'] }} MAD</span>
            </div>
        </div>
    </div>
    
    <!-- Invoice Table -->
    <table class="invoice-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Période</th>
                <th>Prix unitaire</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Location {{ $invoiceData['car_brand'] }} {{ $invoiceData['car_model'] }}</td>
                <td>{{ $invoiceData['rental_date'] }} - {{ $invoiceData['return_date'] }}</td>
                <td>{{ $invoiceData['car_price_per_day'] }} MAD</td>
                <td>{{ $invoiceData['subtotal'] }} MAD</td>
            </tr>
        </tbody>
    </table>
    
    <!-- Totals -->
    <div class="total-section">
        <div class="total-row">
            <span>Sous-total:</span>
            <span>{{ $invoiceData['subtotal'] }} MAD</span>
        </div>
        <div class="total-row">
            <span>TVA ({{ $invoiceData['tax_rate'] }}%):</span>
            <span>{{ $invoiceData['tax_amount'] }} MAD</span>
        </div>
        <div class="total-row">
            <span>Total TTC:</span>
            <span>{{ $invoiceData['total_amount'] }} MAD</span>
        </div>
    </div>
    
    <!-- Terms and Conditions -->
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <div class="section-title">Conditions de Location</div>
        <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>Permis de conduire valide requis</li>
            <li>Âge minimum : 21 ans</li>
            <li>Carte de crédit obligatoire</li>
            <li>Assurance tous risques incluse</li>
            <li>Kilométrage illimité</li>
            <li>Carburant non inclus</li>
        </ul>
    </div>
    
    <!-- Footer -->
    <div class="footer">
        <div class="footer-title">{{ $invoiceData['company_name'] ?? 'TEXAS CAR' }}</div>
        <div class="footer-info">
            {{ $invoiceData['company_address'] ?? '28 bis Immeuble Khalifa, Rue Anatôle France, El Jadida 24000' }}<br>
            Téléphone: {{ $invoiceData['company_phone'] ?? '06 55 58 31 58 / 06 61 11 88 85 / 05 23 34 01 32' }}<br>
            Email: {{ $invoiceData['company_email'] ?? 'contact@texascar.ma' }}<br>
            Site web: {{ $invoiceData['company_website'] ?? 'https://texascar.ma' }}
        </div>
    </div>
</body>
</html> 