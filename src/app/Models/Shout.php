<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shout extends Model
{
    protected $table = 'sakebina_shouts';
    protected $fillable = [
        'text',
        'emotion',
        'font',
        'background',
        'animation'
    ];
}
