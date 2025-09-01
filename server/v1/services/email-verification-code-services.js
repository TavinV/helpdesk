import EmailVerificationCode from "../models/email-verification-code-model.js";
import { AppError, ValidationError } from "../errors/errors.js";

class EmailVerificationCodeServices {
    /** 
     * Cria um novo código de verificação de e-mail
     * @param {string} userId - ID do usuário
     * @param {string} email - E-mail do usuário
     */
    static async createCode(userId, email) {
        try {
            const code = Math.floor(100000 + Math.random() * 900000).toString();

            const emailVerificationCode = new EmailVerificationCode({
                userId,
                email,
                verificationCode: code,
            });

            await emailVerificationCode.save();

            return code;
        } catch (error) {
            throw new AppError(`Erro ao criar código de verificação: ${error.message}`);
        }
    }

    /**
     * Deleta o código de verificação de e-mail
     * @param {string} userId - ID do usuário
     * @param {string} email - E-mail do usuário
     */
    static async deleteCode(userId, email) {
        try {
            await EmailVerificationCode.deleteOne({ userId, email });
        } catch (error) {
            throw new AppError(`Erro ao deletar código de verificação: ${error.message}`);
        }
    }

    /**
     * Valida o código de verificação de e-mail
     * @param {string} userId - ID do usuário
     * @param {string} email - E-mail do usuário
     * @param {string} code - Código de verificação
     */
    static async validateCode(userId, email, code) {
        try {
            const emailVerificationCode = await EmailVerificationCode.findOne({
                userId,
                email,
                verificationCode: code,
            });

            if (!emailVerificationCode) {
                throw new ValidationError("Código de verificação inválido");
            }

            await this.deleteCode(userId, email);

            return true;
        } catch (error) {
            if (error instanceof ValidationError) throw error;
            throw new AppError(`Erro ao validar código de verificação: ${error.message}`);
        }
    }
}

export default EmailVerificationCodeServices;
