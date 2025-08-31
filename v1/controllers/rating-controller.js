import RatingServices from "../services/rating-services.js";
import TicketServices from "../services/ticket-services.js";
import ApiResponse from "../util/api-response.js";

import { ValidationError, NotFoundError, ConflictError, UnauthorizedError } from "../errors/errors.js";


// Post User rating, get tech ratings
const ratingController = {
    async createRating(req, res) {
        const ticketId = req.params.id;
        const { score, comment } = req.body;
        const user = req.user;

        try {
            // Buscando o ticket
            const ticket = await TicketServices.getTicketById(ticketId);

            // Verificando se o chamado pode ser avaliado
            if (!ticket) {
                return ApiResponse.NOTFOUND(res, "Chamado não encontrado");
            }
            if (ticket.status !== 'closed') {
                return ApiResponse.BADREQUEST(res, "Chamado não pode ser avaliado, pois ainda não foi encerrado");
            }
            if (ticket.user_id != user.userId) {
                return ApiResponse.FORBIDDEN(res, "Você não tem permissão para avaliar este chamado");
            }

            const newRating = await RatingServices.createRating({
                score,
                comment,
                ticket_id: ticketId,
                user_id: user.userId,
                technician_id: ticket.technician_id.toString(),
                user_name: user.name
            });

            TicketServices.linkRatingToTicket(ticketId, newRating._id);

            return ApiResponse.CREATED(res, newRating);
        } catch (error) {
            if (error instanceof ValidationError) {
                return ApiResponse.BADREQUEST(res, error.message);
            }
            if (error instanceof ConflictError) {
                return ApiResponse.ALREADYEXISTS(res, error.message);
            }
            return ApiResponse.ERROR(res, error.message);
        }
    },

    async getRatingsByTechnicianId(req, res) {
        const technicianId = req.params.id;

        try {
            const ratings = await RatingServices.getRatings({ technician_id: technicianId });
            return ApiResponse.OK(res, ratings);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }
            return ApiResponse.ERROR(res, 'Erro ao buscar avaliações, ' + error.message);
        }
    },

    async deleteRating(req, res) {
        const ratingId = req.params.id;
        const userId = req.user.userId;

        try {
            const result = await RatingServices.deleteRating(ratingId, userId);
            return ApiResponse.OK(res, result);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }
            if (error instanceof UnauthorizedError) {
                return ApiResponse.FORBIDDEN(res, error.message);
            }
            return ApiResponse.ERROR(res, 'Erro ao deletar avaliação, ' + error.message);
        }
    },

    async getRatingById(req, res) {
        const ratingId = req.params.id;

        try {
            const rating = await RatingServices.getRatings({ _id: ratingId });
            return ApiResponse.OK(res, rating);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }
            return ApiResponse.ERROR(res, 'Erro ao buscar avaliação, ' + error.message);
        }
    }
}

export default ratingController;