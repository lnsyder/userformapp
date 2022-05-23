<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname', 'email', 'phone',
    ];
    use softDeletes;

}
