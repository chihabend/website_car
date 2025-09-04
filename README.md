# Car Rental Application

Une application de location de voitures avec backend Laravel et frontend React.

## Structure du Projet

```
carrent/
├── Backend/          # API Laravel
├── Frontend/         # Application React
└── scripts/          # Scripts utilitaires
```

## Déploiement

### Backend (Railway)

1. Connectez votre repository GitHub à Railway
2. Sélectionnez le dossier `Backend/` comme racine du projet
3. Configurez les variables d'environnement :
   - `APP_KEY` : Générez avec `php artisan key:generate`
   - `DB_*` : Configuration de la base de données Railway
   - `FRONTEND_URL` : URL de votre frontend Vercel
   - `STRIPE_*` : Clés Stripe

### Frontend (Vercel)

1. Connectez votre repository GitHub à Vercel
2. Sélectionnez le dossier `Frontend/` comme racine du projet
3. Configurez les variables d'environnement :
   - `REACT_APP_API_URL` : URL de votre backend Railway

## Variables d'Environnement

### Backend (.env)
```env
APP_NAME=Laravel
APP_ENV=production
APP_KEY=base64:your_generated_key
APP_DEBUG=false
APP_URL=https://your-app.railway.app

DB_CONNECTION=mysql
DB_HOST=your_railway_db_host
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=your_password

FRONTEND_URL=https://your-frontend.vercel.app

STRIPE_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend.railway.app/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_public_key
```

## Installation Locale

### Backend
```bash
cd Backend
composer install
cp env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend
```bash
cd Frontend
npm install
npm start
```

## Fonctionnalités

- Authentification utilisateur et admin
- Gestion des voitures
- Système de location
- Paiement Stripe
- Génération de factures PDF
- Dashboard admin

## Technologies

- **Backend**: Laravel 9, MySQL, Stripe
- **Frontend**: React 18, Chakra UI, Bootstrap
- **Déploiement**: Railway (Backend), Vercel (Frontend)
