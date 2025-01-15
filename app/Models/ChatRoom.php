<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{

    protected $fillable = [
        'name',
        'description',
        'type'
    ];

    public function getRoomNameAttribute()
    {
        if ($this->type == 'individual') {
            $participant = $this->participants()->where('users.id', '!=', Auth::id())->first();
            return $participant->name ?? $this->name;
        } else {
            return $this->name;
        }
    }
    public function getRoomDescriptionAttribute()
    {
        if ($this->type == 'individual') {
            $participant = $this->participants()->where('users.id', '!=', Auth::id())->first();
            return $participant->email ?? $this->description;
        } else {
            return $this->description;
        }
    }
    public function getLastMessageTimestampAttribute()
    {
        $lastMessage = $this->messages()->latest()->first();
        return $lastMessage ? $lastMessage->created_at : $this->created_at;
    }
    public function participants()
    {
        return $this->belongsToMany(User::class, 'chat_room_users', 'chat_room_id');
    }
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
