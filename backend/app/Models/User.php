<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'email',
        'displayName',
        'photoURL'
    ];

    public function book() {
        return $this->hasMany(Book::class, 'user_id', 'id');
    }

}
