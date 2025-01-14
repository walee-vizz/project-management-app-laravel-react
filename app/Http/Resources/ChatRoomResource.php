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
            'description' => $this->description,
            'participants' => UserResource::collection($this->participants),
            'messages' => MessageResource::collection($this->messages),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
        return $data;
    }
}