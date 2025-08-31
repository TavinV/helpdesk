import Joi from "joi";
import mongoose from "mongoose";

// Schema de validação do rating
const ratingSchema = Joi.object({
    ticket_id: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message('ID do ticket inválido');
            }
            return value;
        })
        .required()
        .messages({
            'string.empty': 'ID do ticket é obrigatório',
            'any.required': 'ID do ticket é obrigatório'
        }),

    user_id: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message('ID do usuário inválido');
            }
            return value;
        })
        .required()
        .messages({
            'string.empty': 'ID do usuário é obrigatório',
            'any.required': 'ID do usuário é obrigatório'
        }),

    user_name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Nome do usuário é obrigatório',
            'string.min': 'Nome do usuário deve ter pelo menos 2 caracteres',
            'string.max': 'Nome do usuário não pode ter mais de 100 caracteres',
            'any.required': 'Nome do usuário é obrigatório'
        }),

    score: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages({
            'number.base': 'A avaliação deve ser um número',
            'number.integer': 'A avaliação deve ser um número inteiro',
            'number.min': 'A avaliação deve ser no mínimo 1',
            'number.max': 'A avaliação deve ser no máximo 5',
            'any.required': 'A avaliação é obrigatória'
        }),

    comment: Joi.string()
        .max(500)
        .allow('', null)
        .messages({
            'string.max': 'O comentário não pode ter mais de 500 caracteres'
        }),

    technician_id: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message('ID do técnico inválido');
            }
            return value;
        })
        .required()
        .messages({
            'string.empty': 'ID do técnico é obrigatório',
            'any.required': 'ID do técnico é obrigatório'
        })
});

export default ratingSchema;