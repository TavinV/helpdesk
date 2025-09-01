import JwtServices from "../services/jwt-services.js";
import UserServices from "../services/user-services.js";
import EmailVerificationCodeServices from "../services/email-verification-code-services.js";
import ApiResponse from "../util/api-response.js";
import sendMail from "../util/send-email.js";
import verifyEmailTemplate from "../emails/verify-email-template.js";

import { ValidationError, NotFoundError, ConflictError } from "../errors/errors.js";

const authController = {
    async loginUser(req, res) {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                throw new ValidationError("Email e senha são obrigatórios");
            }

            const user = await UserServices.getUserByEmail(email);
            const isPasswordValid = await UserServices.verifyPassword(user._id, password);

            if (!isPasswordValid) {
                return ApiResponse.UNAUTHORIZED(res, "Senha inválida");
            }

            const token = JwtServices.createToken({ userId: user._id, role: user.role, email: user.email, name: user.name });

            return ApiResponse.OK(res, { token, user });
        } catch (error) {
            if (error instanceof ValidationError) return ApiResponse.BADREQUEST(res, error.message);
            if (error instanceof NotFoundError) return ApiResponse.NOTFOUND(res, error.message);
            return ApiResponse.ERROR(res, error.message);
        }
    },

    async requestEmailVerification(req, res) {
        const userId = req.params.id;
        const { email } = req.body;

        try {
            const user = await UserServices.getUserById(userId);

            const code = await EmailVerificationCodeServices.createCode(userId, email);

            const emailTemplate = verifyEmailTemplate(code);
            await sendMail(email, "Verificação de E-mail", emailTemplate);

            return ApiResponse.OK(res, "E-mail de verificação enviado");
        } catch (error) {
            if (error instanceof ConflictError) return ApiResponse.ALREADYEXISTS(res, error.message);
            if (error instanceof NotFoundError) return ApiResponse.NOTFOUND(res, error.message);
            if (error instanceof ValidationError) return ApiResponse.BADREQUEST(res, error.message);
            return ApiResponse.ERROR(res, error.message);
        }
    },

    async verifyEmail(req, res) {
        const userId = req.params.id;
        const { code, email } = req.body;

        try {
            await EmailVerificationCodeServices.validateCode(userId, email, code);

            await UserServices.updateUser(userId, { emailVerified: true });

            return ApiResponse.OK(res, "E-mail verificado com sucesso");
        } catch (error) {
            if (error instanceof ValidationError) return ApiResponse.BADREQUEST(res, error.message);
            if (error instanceof NotFoundError) return ApiResponse.NOTFOUND(res, error.message);
            return ApiResponse.ERROR(res, error.message);
        }
    }
};

export default authController;
