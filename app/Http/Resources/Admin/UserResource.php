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
            "tai_khoan" => $this->ten_dang_nhap,
            "email" => $this->email,
            "sdt" => $this->sdt,
            "gioi_tinh" => $this->gioi_tinh ? "Nam" : "Nữ",
            "ngay_sinh" => $this->ngay_sinh,
            "khoa" => $this->ten_khoa,
            "quyen" => $this->ten_quyen,
            "updated_at" => $this->updated_at,
            "created_at" => $this->created_at,
        ];
    }
}
