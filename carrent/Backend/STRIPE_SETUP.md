# Configuration Stripe pour SY Luxury Rentals

## Étapes de configuration

### 1. Créer un compte Stripe
- Allez sur [stripe.com](https://stripe.com)
- Créez un compte développeur
- Accédez au dashboard Stripe

### 2. Récupérer les clés API
- Dans le dashboard Stripe, allez dans "Developers" > "API keys"
- Copiez la "Publishable key" et la "Secret key"

### 3. Configurer les variables d'environnement
Ajoutez ces lignes dans votre fichier `.env` :

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete
```

### 4. Tester la configuration
- Assurez-vous que votre serveur Laravel est démarré
- Testez une réservation avec paiement en ligne
- Vérifiez les logs Laravel pour d'éventuelles erreurs

## Notes importantes

- Utilisez les clés de test pour le développement
- Les clés de production ne doivent jamais être partagées
- Vérifiez que le package `stripe/stripe-php` est installé
- Assurez-vous que les routes sont protégées par l'authentification

## Dépannage

### Erreur "Configuration Stripe manquante"
- Vérifiez que les variables STRIPE_SECRET_KEY et STRIPE_PUBLISHABLE_KEY sont définies dans .env
- Redémarrez votre serveur Laravel après modification du .env

### Erreur "Non autorisé"
- Vérifiez que l'utilisateur est connecté
- Vérifiez que l'utilisateur est propriétaire de la réservation

### Erreur "Réservation non trouvée"
- Vérifiez que l'ID de réservation est correct
- Vérifiez que la réservation existe en base de données 