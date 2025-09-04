<?php

namespace App\Models;

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rent extends Model
{
    protected $table = 'rentals';
    public $timestamps = false;
    protected $fillable = [
        'rental_date',
        'return_date',
        'price',
        'user_id',
        'car_id',
        'payment_status',
        'payment_method',
        'stripe_session_id',
        'stripe_payment_intent_id',
        'paid_at',
        'payment_notes'
    ];

    protected $casts = [
        'rental_date' => 'date',
        'return_date' => 'date',
        'paid_at' => 'datetime',
    ];

    use HasFactory;

    public function cars(){
        return $this->belongsTo(Car::class,'car_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
