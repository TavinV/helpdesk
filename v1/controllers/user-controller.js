import UserServices from "../services/user-services.js";
import ApiResponse from "../util/api-response.js";
import userSchema from "../validation/validate-user.js";

// Importando os erros personalizados
import {
    ValidationError,
    NotFoundError,
    ConflictError,
    ForbiddenError,
    AppError
} from "../errors/errors.js";

const userController = {
    async createUser(req, res) {
        const userData = req.body;

        const { error } = userSchema.validate(userData);

        if (!userData) {
            return ApiResponse.BADREQUEST(res, "Dados do usuário são obrigatórios");
        }

        if (error) {
            return ApiResponse.BADREQUEST(res, error.details[0].message);
        }

        try {
            const newUser = await UserServices.createUser(userData);
            return ApiResponse.CREATED(res, newUser);
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

    async updateUser(req, res) {
        const userID = req.params.id;
        const loggedUserID = req.user.userId;
        const updateData = req.body;

        if (loggedUserID !== userID || !loggedUserID) {
            return ApiResponse.FORBIDDEN(res, "Você não tem permissão para atualizar este usuário");
        }

        try {
            const updatedUser = await UserServices.updateUser(userID, updateData);
            return ApiResponse.OK(res, updatedUser);
        } catch (error) {
            if (error instanceof ValidationError) {
                return ApiResponse.BADREQUEST(res, error.message);
            }
            if (error instanceof ConflictError) {
                return ApiResponse.ALREADYEXISTS(res, error.message);
            }
            if (error instanceof NotFoundError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }
            return ApiResponse.ERROR(res, error.message);
        }
    },

    async getUsers(req, res) {
        try {
            const users = await UserServices.getUsers();
            return ApiResponse.OK(res, users);
        } catch (error) {
            return ApiResponse.ERROR(res, error.message);
        }
    },

    async getUser(req, res) {
        const userID = req.params.id;

        try {
            const users = await UserServices.getUsers({ _id: userID });

            if (!users || users.length === 0) {
                return ApiResponse.NOTFOUND(res, "Usuário não encontrado");
            }

            return ApiResponse.OK(res, users[0]);
        } catch (error) {
            if (error instanceof ValidationError) {
                return ApiResponse.BADREQUEST(res, error.message);
            }
            if (error instanceof NotFoundError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }
            return ApiResponse.ERROR(res, error.message);
        }
    },

    async deleteUser(req, res) {
        const loggedUserId = req.user.userId;
        const userId = req.params.id;

        if (userId !== loggedUserId) {
            return ApiResponse.FORBIDDEN(res, "Você não tem permissão para deletar este usuário");
        }

        try {
            await UserServices.deleteUser(userId);
            return ApiResponse.DELETED(res, "Usuário deletado com sucesso");
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError) {
                return ApiResponse.NOTFOUND(res, error.message);
            }

            else if (error instanceof ForbiddenError) {
                return ApiResponse.FORBIDDEN(res, error.message);
            }

            return ApiResponse.ERROR(res, error.message);
        }
    }
};

export default userController;
