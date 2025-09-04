# Configuration Email - SY Luxury Rentals

## Configuration pour l'envoi d'emails à l'admin

### 1. Configuration Gmail SMTP

Pour utiliser Gmail comme serveur SMTP, suivez ces étapes :

#### Étape 1 : Activer l'authentification à 2 facteurs
1. Allez sur votre compte Google
2. Activez l'authentification à 2 facteurs
3. Générez un "mot de passe d'application"

#### Étape 2 : Configurer le fichier .env
Modifiez votre fichier `.env` avec ces paramètres :

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=votre-email@gmail.com
MAIL_PASSWORD=votre-mot-de-passe-d-application
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@synluxury.com
MAIL_FROM_NAME="SY Luxury Rentals"
```

### 2. Configuration de l'email admin

Dans le fichier `app/Http/Controllers/RentController.php`, modifiez l'email de l'admin :

```php
private function sendAdminNotification($user, $car, $rental)
{
    $adminEmail = 'admin@synluxury.com'; // Remplacez par l'email de l'admin
    // ... reste du code
}
```

### 3. Test de l'envoi d'email

Pour tester l'envoi d'email, vous pouvez créer une route de test :

```php
// Dans routes/api.php
Route::get('/test-email', function() {
    Mail::raw('Test email', function($message) {
        $message->to('admin@synluxury.com')
                ->subject('Test Email')
                ->from('noreply@synluxury.com', 'SY Luxury Rentals');
    });
    return 'Email envoyé !';
});
```

### 4. Fonctionnalités implémentées

- ✅ Envoi automatique d'email à l'admin lors d'une nouvelle réservation
- ✅ Template d'email professionnel avec tous les détails
- ✅ Informations du client (nom, email, téléphone)
- ✅ Détails du véhicule (marque, modèle)
- ✅ Détails de la réservation (dates, prix)
- ✅ Bouton d'appel direct dans l'email
- ✅ Gestion d'erreurs sans faire échouer la réservation

### 5. Contenu de l'email

L'email contient :
- **Informations du client** : nom, email, téléphone
- **Détails du véhicule** : marque, modèle
- **Détails de la réservation** : dates, prix total
- **Action requise** : appel téléphonique pour confirmation
- **Bouton d'appel direct** : lien tel: pour appeler directement

### 6. Sécurité

- L'email est envoyé de manière asynchrone
- Les erreurs d'envoi sont loggées mais n'affectent pas la réservation
- L'email contient uniquement les informations nécessaires
- Pas de données sensibles dans l'email

### 7. Personnalisation

Pour personnaliser l'email :
1. Modifiez le template : `resources/views/emails/admin-notification.blade.php`
2. Ajustez les couleurs et le style CSS
3. Modifiez le contenu selon vos besoins
4. Changez l'email de l'admin dans le contrôleur 