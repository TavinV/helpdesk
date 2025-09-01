import Rating from "../models/rating-model.js";
import ratingSchema from "../validation/validate-rating.js";

import { ConflictError, NotFoundError, ValidationError, UnauthorizedError, AppError } from "../errors/errors.js";

class RatingServices {
    static async createRating(ratingData) {
        try {
            const { error } = ratingSchema.validate(ratingData);
            if (error) throw new ValidationError(error.details[0].message);

            const existingRating = await Rating.findOne({ ticketId: ratingData.ticketId });
            if (existingRating) throw new ConflictError('Avaliação já existe para este chamado.');

            const rating = new Rating(ratingData);
            return await rating.save();

        } catch (error) {
            throw new AppError('Erro ao criar avaliação: ' + error.message);
        }
    }
    static async getRatingByTicketId(ticketId) {
        try {
            const ratings = await Rating.find({ ticketId });
            if (!ratings || ratings.length === 0) throw new NotFoundError('Nenhuma avaliação encontrada para este chamado');
            return ratings;
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            throw new AppError('Erro ao buscar avaliações: ' + error.message);
        }
    }
    static async deleteRating(ratingId, userId) {
        try {
            const rating = await Rating.findById(ratingId);
            if (!rating) throw new NotFoundError('Avaliação não encontrada');

            if (rating.user_id != userId) throw new UnauthorizedError('Você não tem permissão para deletar esta avaliação');

            await Rating.findByIdAndDelete(ratingId);
            return { message: 'Avaliação deletada com sucesso' };
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            if (error instanceof UnauthorizedError) throw error;
            throw new AppError('Erro ao deletar avaliação: ' + error.message);
        }
    }
    static async getRatings(filter = {}) {
        try {
            const ratings = await Rating.find(filter);
            if (!ratings || ratings.length === 0) throw new NotFoundError('Nenhuma avaliação encontrada');
            return ratings;
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            throw new AppError('Erro ao buscar avaliações: ' + error.message);
        }
    }
}

export default RatingServices;