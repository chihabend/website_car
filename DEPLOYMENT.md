# Guide de Déploiement

## Déploiement Backend sur Railway

### 1. Préparation
- Assurez-vous que votre code est poussé sur GitHub
- Créez un compte Railway

### 2. Configuration Railway
1. Connectez votre repository GitHub à Railway
2. Sélectionnez le dossier `Backend/` comme racine du projet
3. Railway détectera automatiquement que c'est un projet PHP/Laravel

### 3. Variables d'Environnement
Configurez ces variables dans Railway :

```env
APP_NAME=Laravel
APP_ENV=production
APP_KEY=base64:your_generated_key_here
APP_DEBUG=false
APP_URL=https://your-app.railway.app

DB_CONNECTION=mysql
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=your_railway_db_password

FRONTEND_URL=https://your-frontend.vercel.app

STRIPE_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 4. Base de Données
- Ajoutez un service MySQL dans Railway
- Les variables DB_* seront automatiquement configurées

### 5. Déploiement
- Railway déploiera automatiquement à chaque push
- Vérifiez les logs pour s'assurer que tout fonctionne

## Déploiement Frontend sur Vercel

### 1. Préparation
- Assurez-vous que votre code est poussé sur GitHub
- Créez un compte Vercel

### 2. Configuration Vercel
1. Connectez votre repository GitHub à Vercel
2. Sélectionnez le dossier `Frontend/` comme racine du projet
3. Vercel détectera automatiquement que c'est un projet React

### 3. Variables d'Environnement
Configurez ces variables dans Vercel :

```env
REACT_APP_API_URL=https://your-backend.railway.app/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_public_key
```

### 4. Déploiement
- Vercel déploiera automatiquement à chaque push
- Votre site sera disponible sur `https://your-project.vercel.app`

## Configuration CORS

Le backend est configuré pour accepter les requêtes depuis :
- `http://localhost:3000` (développement)
- `https://*.vercel.app` (production Vercel)
- L'URL spécifiée dans `FRONTEND_URL`

## Vérification du Déploiement

### Backend
- Testez l'endpoint de santé : `https://your-backend.railway.app/api/health`
- Vérifiez que les routes API fonctionnent

### Frontend
- Vérifiez que l'application se charge correctement
- Testez la connexion à l'API
- Vérifiez que les fonctionnalités principales marchent

## Dépannage

### Erreurs communes
1. **CORS errors** : Vérifiez que `FRONTEND_URL` est correctement configuré
2. **Database connection** : Vérifiez les variables DB_*
3. **API not found** : Vérifiez que `REACT_APP_API_URL` pointe vers le bon backend

### Logs
- Railway : Consultez les logs dans le dashboard Railway
- Vercel : Consultez les logs dans le dashboard Vercel
