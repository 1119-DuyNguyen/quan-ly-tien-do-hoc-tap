<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "ten" => $this->ten,
            "ten_dang_nhap" => $this->ten_dang_nhap,
            "updated_at" => $this->updated_at,
            "created_at" => $this->created_at,
            "email" => $this->email,
            "sdt" => $this->sdt,
            "ngay_sinh" => $this->ngay_sinh,
            "gioi_tinh" => $this->gioi_tinh ? "Nam" : "Nữ",
            "ten_khoa" => $this->ten_khoa,
            "ten_quyen" => $this->ten_quyen
        ];
    }
}
