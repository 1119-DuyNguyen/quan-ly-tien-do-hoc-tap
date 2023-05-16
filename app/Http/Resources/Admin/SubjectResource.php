<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
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
            'phan_tram_giua_ki' => $this->phan_tram_giua_ki,
            'phan_tram_cuoi_ki' => $this->phan_tram_cuoi_ki,
            // 'trinh_do_dao_tao' => $this->trinh_do_dao_tao,
            'co_tinh_tich_luy' => $this->co_tinh_tich_luy ? 'Có' : 'Không',

        ];
    }
}
