<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{

    protected $fillable = [
        'name',
        'description',
    ];

    public function participants()
    {
        return $this->belongsToMany(User::class, 'chat_room_users', 'chat_room_id');
    }
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
