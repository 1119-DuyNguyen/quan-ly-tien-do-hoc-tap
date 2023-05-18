<?php

namespace App\Models\Users\Students\TrainingProgram\Subjects;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MucLuc extends Model
{
	protected $table = 'muc_luc';

    protected $casts = [
        'id' => 'int'
    ];

    protected $fillable = [
        'ten',
    ];
}
