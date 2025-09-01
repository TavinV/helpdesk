import Joi from 'joi';
import validateCPF from '../util/validate-cpf.js';

// Schema de validação do usuário
const userSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Nome é obrigatório',
            'string.min': 'Nome deve ter pelo menos 2 caracteres',
            'string.max': 'Nome não pode ter mais de 100 caracteres',
            'any.required': 'Nome é obrigatório'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email é obrigatório',
            'string.email': 'Email deve ser um endereço válido',
            'any.required': 'Email é obrigatório'
        }),

    cpf: Joi.string()
        .custom((value, helpers) => {
            if (!validateCPF(value)) {
                return helpers.message('CPF inválido');
            }
            return value;
        })
        .required()
        .messages({
            'string.empty': 'CPF é obrigatório',
            'any.required': 'CPF é obrigatório'
        }),

    role: Joi.string()
        .valid('user', 'technician')
        .default('user')
        .messages({
            'any.only': 'Cargo deve ser "user" ou "technician"'
        }),

    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.empty': 'Senha é obrigatória',
            'string.min': 'Senha deve ter pelo menos 8 caracteres',
            'any.required': 'Senha é obrigatória'
        }),

    phone: Joi.string()
        .required()
        .messages({
            'string.empty': 'Telefone é obrigatório',
            'any.required': 'Telefone é obrigatório',
            'string.pattern.base': 'Telefone deve conter apenas números'
        })
});

// Função para validar usuário
export const validateUser = (userData) => {
    return userSchema.validate(userData, {
        abortEarly: false, // Mostra todos os erros de uma vez
        stripUnknown: true // Remove campos não definidos no schema
    });
};

// Função para validar apenas campos específicos (útil para updates)
export const validateUserUpdate = (userData) => {
    const updateSchema = userSchema.fork(
        ['name', 'email', 'cpf', 'password', 'phone', 'role'],
        (field) => field.optional()
    );

    return updateSchema.validate(userData, {
        abortEarly: false,
        stripUnknown: true
    });
};

export default userSchema;