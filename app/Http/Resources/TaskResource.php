<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'image_path' => $this->image_path,
            'priority' => $this->priority,
            'created_at' => $this->created_at->format('d-m-Y H:i:s'),
            'updated_at' => $this->updated_at->format('d-m-Y H:i:s'),
            'project' => new ProjectResource($this->project),
            'assigned_user' => $this->assignedTo ? new UserResource($this->assignedTo) : null,
            'created_by' => $this->createdBy ? new UserResource($this->createdBy) : null,
            'updated_by' => $this->updatedBy ? new UserResource($this->updatedBy) : null,
            // 'comments' => CommentResource::collection($this->comments),
        ];
        return parent::toArray($request);
    }
}
