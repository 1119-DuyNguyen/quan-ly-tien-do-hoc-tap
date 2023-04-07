<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DataImportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            // 'files' => 'required',
            // 'files.*' => 'required|mimes:xlx,xlsx,csv'
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'Thiếu ',
            'mk.required' => 'Chưa nhập mật khẩu',
            'mk.min' => 'Password is too short',
        ];
    }

}
