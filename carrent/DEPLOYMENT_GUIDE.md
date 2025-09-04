# 🚀 Guide de Déploiement - Car Rental App

## 📋 Prérequis
- Compte GitHub
- Compte Railway (Backend + Database)
- Compte Vercel (Frontend)
- Repository GitHub : https://github.com/chihabend/website_car.git

## 🎯 Déploiement Backend sur Railway

### 1. Créer le projet Railway
1. Allez sur [railway.app](https://railway.app)
2. Connectez-vous avec GitHub
3. Cliquez sur "New Project"
4. Sélectionnez "Deploy from GitHub repo"
5. Choisissez le repository `website_car`
6. **IMPORTANT** : Sélectionnez le dossier `carrent/Backend`

### 2. Ajouter la base de données MySQL
1. Dans votre projet Railway, cliquez sur "New"
2. Sélectionnez "Database" → "MySQL"
3. Railway créera automatiquement une base de données MySQL

### 3. Configurer les variables d'environnement
Dans Railway, allez dans "Variables" et ajoutez :

```env
# Configuration de l'application
APP_NAME=CarRental
APP_ENV=production
APP_DEBUG=false
APP_URL=https://votre-app.railway.app

# Configuration de la base de données (utilise les variables MySQL automatiques)
DB_CONNECTION=mysql
DB_HOST=${{RAILWAY_PRIVATE_DOMAIN}}
DB_PORT=3306
DB_DATABASE=${{MYSQL_DATABASE}}
DB_USERNAME=root
DB_PASSWORD=${{MYSQL_ROOT_PASSWORD}}

# Configuration des sessions
SESSION_DRIVER=file
SESSION_LIFETIME=120
CACHE_DRIVER=file

# Configuration email
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_FROM_ADDRESS="noreply@carrental.com"
MAIL_FROM_NAME="CarRental"

# Configuration Stripe (remplacez par vos vraies clés)
STRIPE_KEY=pk_live_VOTRE_CLE_PUBLIQUE_STRIPE
STRIPE_SECRET=sk_live_VOTRE_CLE_SECRETE_STRIPE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET

# URL du frontend pour CORS
FRONTEND_URL=https://votre-frontend.vercel.app
```

### 4. Générer la clé d'application Laravel
```bash
# Via Railway CLI
railway run php artisan key:generate --show

# Puis ajouter la clé générée comme APP_KEY dans Railway
```

## 🎯 Déploiement Frontend sur Vercel

### 1. Créer le projet Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Cliquez sur "New Project"
4. Importez le repository `website_car`
5. **IMPORTANT** : Changez le "Root Directory" vers `carrent/Frontend`

### 2. Configurer les variables d'environnement
Dans Vercel, allez dans "Settings" → "Environment Variables" :

```env
# URL de votre API backend (Railway)
REACT_APP_API_URL=https://votre-backend.railway.app/api

# Clé publique Stripe (si vous utilisez Stripe)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE_PUBLIQUE_STRIPE
```

## 🔧 Commandes Railway utiles

```bash
# Installer Railway CLI
npm install -g @railway/cli

# Se connecter
railway login

# Lier le projet
railway link

# Voir les logs
railway logs

# Exécuter les migrations
railway run php artisan migrate

# Exécuter les seeders
railway run php artisan db:seed

# Voir les variables
railway variables
```

## ✅ Vérification du déploiement

### Backend (Railway)
- Testez l'API : `https://votre-app.railway.app/api/health`
- Vérifiez les logs : `railway logs`

### Frontend (Vercel)
- Visitez votre URL Vercel
- Vérifiez que l'application se charge
- Testez la connexion avec le backend

## 🚨 Points importants

1. **URLs** : Remplacez `votre-app.railway.app` et `votre-frontend.vercel.app` par vos vraies URLs
2. **Stripe** : Configurez vos vraies clés Stripe pour la production
3. **CORS** : La configuration CORS est déjà optimisée pour Vercel
4. **Base de données** : Les migrations s'exécutent automatiquement lors du déploiement

## 📞 Support

En cas de problème :
1. Vérifiez les logs Railway : `railway logs`
2. Vérifiez les logs Vercel dans le dashboard
3. Testez les endpoints API individuellement
