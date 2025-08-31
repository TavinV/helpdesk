import Ticket from "../models/ticket-model.js";
import ticketSchema from "../validation/validate-ticket.js";
import { validateTicketUpdate } from "../validation/validate-ticket.js";

import { ValidationError, AppError, ConflictError, NotFoundError } from "../errors/errors.js";

class TicketServices {

    /*
    * Cria um novo ticket
    * @param {Object} data - Dados do ticket
    * @returns {Promise<Ticket>} - O ticket criado
    */
    static async createTicket(data) {
        try {
            const { error } = validateTicketUpdate(data);
            if (error) {
                throw new ValidationError(error.details[0].message);
            }

            const existingTicket = await Ticket.findOne({ title: data.title, status: "open" });
            if (existingTicket) {
                throw new ConflictError('Um ticket com esse título já está aberto');
            }

            const ticket = new Ticket(data);
            await ticket.save();

            return ticket;
        } catch (error) {
            throw new AppError(`Erro ao criar chamado: ${error.message}`);
        }
    }

    /*
    * Busca um ticket utilizando o ID
    * @param {String} ticketId - Id do ticket
    * @returns {Promise<Ticket>} - O ticket encontrado
    */
    static async getTicketById(ticketId) {
        try {
            const ticket = await Ticket.findById(ticketId);
            if (!ticket) {
                throw new NotFoundError('chamado não encontrado');
            }
            return ticket;
        } catch (error) {
            if (error.kind === 'ObjectId') {
                throw new NotFoundError('chamado não encontrado');
            }

            throw new AppError(`Erro ao buscar chamado: ${error.message}`);
        }
    }

    /*
    * Busca os tickets utilizando filtros.
    * @param {Object} filters - Filtros para a busca
    * @param {number} limit - Limite de tickets a serem retornados
    * @param {number} skip - Número de tickets a serem pulados
    * @returns {Promise<Array<Ticket>>} - Lista de tickets encontrados
    */
    static async getTickets(filters = {}, limit = 10, skip = 0) {
        try {
            const tickets = await Ticket.find(filters)
                .limit(limit)
                .skip(skip)
                .sort({ createdAt: -1 });
            return tickets;
        } catch (error) {
            throw new AppError(`Erro ao buscar chamados: ${error.message}`);
        }
    }

    /*
    * Atualiza um ticket pelo ID
    * @param {string} ticketId - ID do ticket a ser atualizado
    * @param {Object} updateData - Dados para atualizar o ticket
    * @returns {Promise<Ticket>} - O ticket atualizado
    */
    static async updateTicket(ticketId, updateData) {
        try {
            const { error } = ticketSchema.validate(updateData);
            if (error) {
                throw new ValidationError(error.details[0].message);
            }

            const ticket = await Ticket.findByIdAndUpdate(ticketId, updateData, { new: true });
            if (!ticket) {
                throw new NotFoundError('chamado não encontrado');
            }
            return ticket;
        } catch (error) {
            throw new AppError(`Erro ao atualizar chamado: ${error.message}`);
        }
    }

    /*
    * Deleta um ticket pelo ID
    * @param {string} ticketId - ID do ticket a ser deletado
    * @returns {Promise<Ticket>} - O ticket deletado
    */
    static async deleteTicket(ticketId) {
        try {
            const ticket = await Ticket.findByIdAndDelete(ticketId);
            if (!ticket) {
                throw new NotFoundError('chamado não encontrado');
            }
            return ticket;
        } catch (error) {
            throw new AppError(`Erro ao deletar ticket: ${error.message}`);
        }
    }

    /*
    * Aceita um ticket
    * @param {string} ticketId - ID do ticket a ser aceito
    * @param {string} technicianId - ID do técnico que está aceitando o ticket
    * @returns {Promise<Ticket>} - O ticket atualizado
    */
    static async acceptTicket(ticketId, technicianId) {
        // Buscar o ticket primeiro para verificar o status atual
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            throw new NotFoundError("chamado não encontrado");
        }

        if (ticket.status !== 'open') {
            throw new ConflictError(`chamado não pode ser aceito, pois já está sendo resolvido`);
        }

        // Atualizar apenas os campos necessários
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                technician_id: technicianId,
                status: 'in_progress',
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        );

        return updatedTicket;
    }

    /*
    * Aceita um ticket
    * @param {string} ticketId - ID do ticket a ser aceito
    * @param {string} technicianId - ID do técnico que está aceitando o ticket
    * @returns {Promise<Ticket>} - O ticket atualizado
    */
    static async resolveTicket(ticketId, technicianId, solution) {
        // Buscar o ticket primeiro para verificar o status atual
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            throw new NotFoundError("chamado não encontrado");
        }

        if (ticket.status !== 'in_progress') {
            throw new ConflictError(`chamado não pode ser resolvido, pois não está em andamento`);
        }

        // Atualizar apenas os campos necessários
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                technician_id: technicianId,
                status: 'closed',
                updatedAt: new Date(),
                solution: solution
            },
            { new: true, runValidators: true }
        );

        return updatedTicket;
    }

    static async linkRatingToTicket(ticketId, ratingId) {
        try {
            const ticket = await Ticket.findByIdAndUpdate(
                ticketId,
                { ratingId: ratingId },
                { new: true }
            );
            return ticket;
        } catch (error) {
            throw new AppError(`Erro ao vincular avaliação ao chamado: ${error.message}`);
        }
    }
}

export default TicketServices;