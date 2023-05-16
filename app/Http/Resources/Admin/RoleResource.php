<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
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
            'ten' => $this->ten,
            'ten_slug' => $this->ten_slug,
            'ghi_chu' => $this->ten_slug,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
