import TicketServices from "../services/ticket-services.js";
import { ValidationError, ConflictError, NotFoundError, SendEmailError } from "../errors/errors.js";
import ApiResponse from "../util/api-response.js";
import sendMail from "../util/send-email.js";

import ticketConfirmationEmailTemplate from "../emails/ticket-confirmation-email-template.js"
import ticketInProgressEmailTemplate from "../emails/ticket-in-progress-email-template.js";
import ticketClosedEmailTemplate from "../emails/ticket-closed-email-template.js";
import UserServices from "../services/user-services.js";

const ticketController = {
    async createTicket(req, res) {
        const userId = req.user.userId;
        const userEmail = req.user.email;
        try {
            const ticket = await TicketServices.createTicket({ ...req.body, user_id: userId });

            // Enviar o e-mail de confirmação
            const emailTemplate = ticketConfirmationEmailTemplate(ticket);
            await sendMail(userEmail, "Confirmação de Chamado", emailTemplate);

            return ApiResponse.CREATED(res, ticket);

        } catch (error) {
            if (error instanceof ValidationError) {
                return ApiResponse.BADREQUEST(res, error.message);
            }
            if (error instanceof ConflictError) {
                return ApiResponse.ALREADYEXISTS(res, error.message);
            }
            if (error instanceof SendEmailError) {
                return ApiResponse.ACCEPTED(res, "O chamado foi criado com sucesso, mas não foi possível enviar o e-mail de confirmação.", ticket);
            }
            return ApiResponse.ERROR(res, 'Erro ao criar chamado, ' + error.message);
        }

    },

    async getTickets(req, res) {
        try {
            const {user, status} = req.query;
            let tickets;
            
            const filters = {};

            if (user) {
                filters.user_id = user;
            }
            if (status) {
                filters.status = status;
            }

            tickets = await TicketServices.getTickets(filters);

            return ApiResponse.OK(res, tickets);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }
            return ApiResponse.ERROR(res, 'Erro ao buscar chamados, ' + error.message);
        }
    },

    async deleteTicket(req, res) {
        const id = req.params.id;
        const userId = req.user.userId;

        try {

            const ticket = await TicketServices.getTicketById(id);

            if (ticket.user_id != userId) {
                return ApiResponse.FORBIDDEN(res, "Você não tem permissão para deletar este chamado.");
            }

            await TicketServices.deleteTicket(id);
            return ApiResponse.DELETED(res);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }
            if (error instanceof ValidationError) {
                return ApiResponse.BADREQUEST(res, error.message);
            }
            return ApiResponse.ERROR(res, 'Erro ao deletar chamado, ' + error.message);
        }
    },

    async getTicketById(req, res) {
        const id = req.params.id;

        try {
            const ticket = await TicketServices.getTicketById(id);
            return ApiResponse.OK(res, ticket);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }
            if (error instanceof ValidationError) {
                return ApiResponse.BADREQUEST(res, error.message);
            }
            return ApiResponse.ERROR(res, 'Erro ao buscar chamado, ' + error.message);
        }
    },

    async acceptTicket(req, res) {
        const id = req.params.id;
        const userId = req.user.userId;

        try {
            const ticket = await TicketServices.getTicketById(id);

            if (ticket.status !== 'open') {
                return ApiResponse.ALREADYEXISTS(res, "Este chamado já foi aceito por outro técnico ou está fechado.");
            }

            await TicketServices.acceptTicket(id, userId);

            // Enviar o e-mail informando o usuario
            const userWhoRequestedATicket = await UserServices.getUserById(ticket.user_id);
            const userEmail = userWhoRequestedATicket.email;

            await sendMail(userEmail, "Chamado em Andamento", ticketInProgressEmailTemplate(ticket, req.user));

            return ApiResponse.OK(res, "O chamado foi aceito com sucesso.");
        } catch (error) {
            if (error instanceof NotFoundError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }
            if (error instanceof ValidationError) {
                return ApiResponse.BADREQUEST(res, error.message);
            }
            if (error instanceof SendEmailError) {
                return ApiResponse.ACCEPTED(res, "O chamado foi aceito com sucesso, mas não foi possível enviar o e-mail de notificação.", ticket);
            }
            return ApiResponse.ERROR(res, 'Erro ao aceitar chamado, ' + error.message);
        }
    },

    async resolveTicket(req, res) {
        const id = req.params.id;
        const userId = req.user.userId;
        const solution = req.body.solution;

        if (!solution) {
            return ApiResponse.BADREQUEST(res, "A solução é obrigatória para resolver o ticket.");
        }

        try {
            const ticket = await TicketServices.getTicketById(id);

            if (!userId == ticket.technician_id) {
                return ApiResponse.FORBIDDEN(res, "Você não tem permissão para resolver este ticket.");
            }
            if (ticket.status != 'in_progress') {
                return ApiResponse.ALREADYEXISTS(res, "Este ticket não pode ser resolvido.");
            }

            await TicketServices.resolveTicket(id, userId, solution);

            // Enviar o e-mail informando o usuario
            const userWhoRequestedATicket = await UserServices.getUserById(ticket.user_id);
            const userEmail = userWhoRequestedATicket.email;

            await sendMail(userEmail, "Chamado em Andamento", ticketClosedEmailTemplate(ticket, req.user, solution));

            return ApiResponse.OK(res, "O chamado foi resolvido com sucesso.");
        } catch (error) {
            if (error instanceof NotFoundError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }
            if (error instanceof ValidationError) {
                return ApiResponse.BADREQUEST(res, error.message);
            }
            return ApiResponse.ERROR(res, 'Erro ao resolver ticket, ' + error.message);
        }
    }
};

export default ticketController;