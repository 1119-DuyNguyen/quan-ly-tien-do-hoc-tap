<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class SubjectRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;

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
            'so_tin_chi' => 'required|numeric',
            'ma_hoc_phan' => 'required',

            'phan_tram_giua_ki' => 'required|numeric',
            'phan_tram_cuoi_ki' => 'required|numeric',
        ];
    }
    public function messages(): array
    {
        return [
            '*' => 'Lỗi không nhập đúng định dạng',
        ];
    }
}
