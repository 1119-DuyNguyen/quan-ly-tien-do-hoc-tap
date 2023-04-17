<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
{
    /**
     * Indicates whether validation should stop after the first rule failure.
     *
     * @var bool
     */
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
            'tk' => 'alpha_dash',
            'mk' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            // 'tk.required' => 'Vui lòng nhập tài khoản',
            'tk.alpha_dash' => "Tài khoản chỉ gồm các chữ cái (a-z), số (0-9), và dấu chấm (.).",
            'mk.required' => 'Vui lòng nhập mật khẩu',
            'mk.min' => 'Password is too short',

        ];
    }
    //ghi đè custom message json
    // protected function failedValidation(Validator $validator)
    // {
    //     throw new HttpResponseException(response()->json([
    //         'success' => false,
    //         'message' => $validator->errors()->first(),
    //         'data' => null,
    //     ], 422));
    // }
}
