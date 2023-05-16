<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
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
            'tong_tin_chi' => $this->tong_tin_chi,
            'thoi_gian_dao_tao' => $this->thoi_gian_dao_tao,
            // 'trinh_do_dao_tao' => $this->trinh_do_dao_tao,
            'ten_nganh' => $this->ten_nganh,
            'ten_chu_ky' => $this->ten_chu_ky,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
