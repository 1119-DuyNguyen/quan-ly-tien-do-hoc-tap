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
            'files' => 'required',
            'files.*' => 'required|mimes:xlx,xlsx,csv'
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'Thiếu file upload',
            'file.*' => 'File upload phải có dạng xlx, xlsx, csv',
       ];
    }

}
