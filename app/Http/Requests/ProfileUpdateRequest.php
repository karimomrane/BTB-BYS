<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'adresse' => ['nullable', 'string', 'max:255'], // Address is optional
            'tel' => ['nullable', 'string'], // Phone number format validation
            'siteweb' => ['nullable', 'string', 'url', 'max:255'], // Website must be a valid URL
            'role' => ['required', 'string'], // Role must match specific allowed values
        ];
    }
}
