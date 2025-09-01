import Joi from "joi";
import mongoose from "mongoose";

// Schema de validação do ticket
const ticketSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(200)
        .required()
        .messages({
            'string.empty': 'Título é obrigatório',
            'string.min': 'Título deve ter pelo menos 3 caracteres',
            'string.max': 'Título não pode ter mais de 200 caracteres',
            'any.required': 'Título é obrigatório'
        }),

    description: Joi.string()
        .min(5)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Descrição é obrigatória',
            'string.min': 'Descrição deve ter pelo menos 5 caracteres',
            'string.max': 'Descrição não pode ter mais de 1000 caracteres',
            'any.required': 'Descrição é obrigatória'
        }),

    status: Joi.string()
        .valid("open", "in_progress", "closed")
        .default("open")
        .messages({
            'any.only': 'Status deve ser "open", "in_progress" ou "closed"'
        }),

    attemptedSolutions: Joi.array()
        .items(Joi.string())
        .messages({
            'array.base': 'Soluções tentadas deve ser um array de strings'
        }),

    additionalInfo: Joi.string()
        .allow("")
        .messages({
            'string.base': 'Informações adicionais deve ser texto'
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

    technician_id: Joi.string()
        .allow(null)
        .custom((value, helpers) => {
            if (value && !mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message('ID do técnico inválido');
            }
            return value;
        }),

    createdAt: Joi.date()
        .default(() => new Date()),

    updatedAt: Joi.date()
        .default(() => new Date()),
});

// Função para validar criação de ticket
export const validateTicket = (ticketData) => {
    return ticketSchema.validate(ticketData, {
        abortEarly: false,
        stripUnknown: true
    });
};

// Função para validar atualização de ticket
export const validateTicketUpdate = (ticketData) => {
    const updateSchema = ticketSchema.fork(
        ['title', 'description', 'status', 'attemptedSolutions', 'additionalInfo', 'user_id', 'technician_id'],
        (field) => field.optional()
    );

    return updateSchema.validate(ticketData, {
        abortEarly: false,
        stripUnknown: true
    });
};

export default ticketSchema;