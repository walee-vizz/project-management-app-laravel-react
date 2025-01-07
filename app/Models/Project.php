<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'image_path',
        'description',
        'due_date',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'due_date' => 'datetime',
    ];


    public function tasks()
    {
        return $this->hasMany(Task::class);
    }


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
