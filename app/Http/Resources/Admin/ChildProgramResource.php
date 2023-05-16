<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChildProgramResource extends JsonResource
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
            'tong_tin_chi_ktt_tu_chon' => $this->tong_tin_chi_ktt_tu_chon,
            'tong_tin_chi_ktt_bat_buoc' => $this->tong_tin_chi_ktt_bat_buoc,
            // 'trinh_do_dao_tao' => $this->trinh_do_dao_tao,
            'tong_tin_chi' => $this->tong_tin_chi,
            'ten_lkt' => $this->ten_loai_kien_thuc,

            'ten_ctdt' => $this->ten_chuong_trinh_dao_tao,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
