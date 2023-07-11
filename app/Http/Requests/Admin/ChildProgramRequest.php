<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ChildProgramRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'ten' => 'required',
            'tong_tin_chi_ktt_tu_chon' => 'required',
            'muc_luc_id' => 'required',
            'chuong_trinh_dao_tao_id' => 'required',
            'loai_kien_thuc_id' => '',

        ];
    }
    public function messages(): array
    {
        return [
            '*' => 'Lỗi không nhập đúng định dạng',
        ];
    }
}
