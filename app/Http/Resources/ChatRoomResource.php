<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatRoomResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'room_name' => $this->room_name,
            'room_description' => $this->room_description,
            'description' => $this?->description ?? '',
            'last_message_timestamp' => $this?->last_message_timestamp?->format('H:i') ?? '',
            'type' => $this->type,
            'participants' => UserResource::collection($this->participants),
            'messages' => MessageResource::collection($this->messages),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
        return $data;
    }
}
