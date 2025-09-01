// services/userService.js
import mongoose from 'mongoose';
import User from '../models/user-model.js';
import bcrypt from 'bcryptjs';
import validateCPF from '../util/validate-cpf.js';

// Importando os erros possíveis
import { AppError, NotFoundError, ValidationError, ConflictError } from '../errors/errors.js';

/**
 * Serviço para gerenciamento de usuários
 */
class UserServices {
    /**
     * Cria um novo usuário
     */
    static async createUser(userData) {
        try {
            const existingUser = await User.findOne({
                $or: [
                    { email: userData.email },
                    { cpf: userData.cpf }
                ]
            });

            if (existingUser) {
                throw new ConflictError(
                    existingUser.email === userData.email
                        ? 'Email já cadastrado'
                        : 'CPF já cadastrado'
                );
            }

            const hashedPassword = await bcrypt.hash(userData.password, 12);

            const newUser = new User({
                ...userData,
                password: hashedPassword
            });

            const savedUser = await newUser.save();

            return this._removeSensitiveData(savedUser.toObject());
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(`Erro ao criar usuário: ${error.message}`);
        }
    }

    /**
     * Busca um usuário por ID
     */
    static async getUserById(userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new ValidationError('ID do usuário inválido');
            }

            const user = await User.findById(userId);

            if (!user) {
                throw new NotFoundError('Usuário não encontrado');
            }

            return this._removeSensitiveData(user.toObject());
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(`Erro ao buscar usuário: ${error.message}`);
        }
    }

    /**
     * Busca usuários
     */
    static async getUsers(filters = {}, limit = 10, skip = 0) {
        try {
            const users = await User.find(filters)
                .limit(limit)
                .skip(skip)
                .sort({ createdAt: -1 });

            return users.map(user => this._removeSensitiveData(user.toObject()));
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(`Erro ao buscar usuários: ${error.message}`);
        }
    }

    /**
     * Busca usuário por email
     */
    static async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                throw new NotFoundError('Usuário não encontrado');
            }

            return user;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(`Erro ao buscar usuário por email: ${error.message}`);
        }
    }

    /**
     * Atualiza um usuário
     */
    static async updateUser(userId, updateData) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new ValidationError('ID do usuário inválido');
            }

            if (updateData.password) {
                const hashedPassword = await bcrypt.hash(updateData.password, 12);
                updateData.password = hashedPassword;
            }

            if (updateData.cpf) {
                const isValid = validateCPF(updateData.cpf);
                if (!isValid) {
                    throw new ValidationError('CPF inválido');
                }
            }

            if (updateData.email || updateData.cpf) {
                const existingUser = await User.findOne({
                    $and: [
                        { _id: { $ne: userId } },
                        {
                            $or: [
                                ...(updateData.email ? [{ email: updateData.email }] : []),
                                ...(updateData.cpf ? [{ cpf: updateData.cpf }] : [])
                            ]
                        }
                    ]
                });

                if (existingUser) {
                    throw new ConflictError(
                        existingUser.email === updateData.email
                            ? 'Email já cadastrado'
                            : 'CPF já cadastrado'
                    );
                }
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                throw new NotFoundError('Usuário não encontrado');
            }

            return this._removeSensitiveData(updatedUser.toObject());
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(`Erro ao atualizar usuário: ${error.message}`);
        }
    }

    /**
     * Deleta um usuário
     */
    static async deleteUser(userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new ValidationError('ID do usuário inválido');
            }

            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                throw new NotFoundError('Usuário não encontrado');
            }

            return { message: 'Usuário deletado com sucesso' };
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(`Erro ao deletar usuário: ${error.message}`);
        }
    }

    /**
     * Verifica senha
     */
    static async verifyPassword(userId, password) {
        try {
            const user = await User.findById(userId);

            if (!user) {
                throw new NotFoundError('Usuário não encontrado');
            }

            return await bcrypt.compare(password, user.password);
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(`Erro ao verificar senha: ${error.message}`);
        }
    }

    /**
     * Remove dados sensíveis
     */
    static _removeSensitiveData(user) {
        const { password, salt, ...userWithoutSensitiveData } = user;
        return userWithoutSensitiveData;
    }
}

export default UserServices;
