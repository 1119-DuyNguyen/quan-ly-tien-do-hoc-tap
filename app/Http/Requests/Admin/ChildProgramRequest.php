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
            // 'ten' => 'required',
            // 'tong_tin_chi' => 'required|numeric',
            // 'thoi_gian_dao_tao' => 'required|numeric',
            // 'nganh_id' => 'required|numeric',
            // 'chu_ky_id' => 'required|numeric'
        ];
    }
    public function messages(): array
    {
        return [
            '*' => 'Lỗi không nhập đúng định dạng',
        ];
    }
}
