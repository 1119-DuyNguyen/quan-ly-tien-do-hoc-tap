<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProgramKnowledgeBlockSubjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'hoc_phan_id' => 'required',
            'loai_hoc_phan' => 'required',
        ];
    }
    public function messages(): array
    {
        return [
            '*' => 'Lỗi không nhập đúng định dạng',
        ];
    }
}
