import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, IdCard, Mail, Phone, AlertCircle, UserPlus, Shield, Briefcase } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext.jsx';
import PageContainer from '../components/layout/PageContainer.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import AlertMessage from '../components/ui/AlertMessage.jsx';
import FormInput from '../components/form/FormInput.jsx';
import RadioGroup from '../components/form/RadioGroup.jsx';

import api from '../services/api.js';
import maskCPF from '../util/mask-cpf.js';
import maskPhone from '../util/mask-phone.js';

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        role: "user",
        name: "",
        cpf: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login, user } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        if (formData.password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setLoading(true);
        try {
            const body = {
                name: formData.name,
                email: formData.email,
                cpf: formData.cpf.replace(/\D/g, ""),
                password: formData.password,
                role: formData.role,
                phone: formData.phone.replace(/\D/g, ""),
            };

            const response = await api.post("/users", body);

            if (response.data.success) {
                // Login automático
                const loginResult = await login(formData.email, formData.password);

                if (loginResult.success) {
                    const from = location.state?.from?.pathname || "/";
                    navigate(from, { replace: true });
                } else {
                    navigate("/login");
                }
            } else {
                setError(response.data.message || "Erro ao cadastrar usuário");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Erro de conexão. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        return null;
    }

    const roleOptions = [
        {
            value: "user",
            label: "Usuário",
            description: "Criar e acompanhar chamados de suporte",
            icon: <User size={16} />
        },
        {
            value: "technician",
            label: "Técnico",
            description: "Atender e resolver chamados técnicos",
            icon: <Shield size={16} />
        }
    ];

    return (
        <PageContainer
            showHeader={false}
            showFooter={false}
            className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8"
        >
            <div className="w-full max-w-4xl mx-4"> {/* Aumentado para max-w-4xl */}
                <Card
                    className="overflow-hidden shadow-xl"
                    header={
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                        <UserPlus size={32} className="text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold">Criar Conta</h1>
                                        <p className="text-emerald-100 text-lg mt-1">
                                            Junte-se à nossa plataforma de suporte técnico
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden lg:block text-right">
                                    <p className="text-emerald-200 text-sm">Rápido • Seguro • Gratuito</p>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Seção de Tipo de Usuário - Agora lado a lado */}
                        <div className="grid lg:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="block text-lg font-semibold text-gray-800 mb-4">
                                    Selecione o tipo de conta:
                                </label>
                                <p className="text-gray-600 text-sm mb-4">
                                    Escolha o perfil que melhor se adequa às suas necessidades
                                </p>
                            </div>
                            <RadioGroup
                                options={roleOptions}
                                value={formData.role}
                                onChange={(value) => handleInputChange('role', value)}
                                className="space-y-3"
                            />
                        </div>

                        {/* Informações Pessoais - Grid mais compacto */}
                        <div className="space-y-6">
                            <div className="grid lg:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                        Informações Pessoais
                                    </h3>
                                    <div className="space-y-4">
                                        <FormInput
                                            label="Nome Completo"
                                            icon={<User size={18} />}
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            placeholder="Digite seu nome completo"
                                            required
                                            disabled={loading}
                                            className="text-base"
                                        />

                                        <FormInput
                                            label="CPF"
                                            icon={<IdCard size={18} />}
                                            type="text"
                                            value={formData.cpf}
                                            onChange={(e) => handleInputChange('cpf', maskCPF(e.target.value))}
                                            placeholder="123.456.789-00"
                                            maxLength={14}
                                            required
                                            disabled={loading}
                                            className="text-base"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                        Informações de Contato
                                    </h3>
                                    <div className="space-y-4">
                                        <FormInput
                                            label="Email"
                                            icon={<Mail size={18} />}
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="seuemail@gmail.com"
                                            required
                                            disabled={loading}
                                            className="text-base"
                                        />

                                        <FormInput
                                            label="Telefone"
                                            icon={<Phone size={18} />}
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', maskPhone(e.target.value))}
                                            placeholder="(11) 98765-4321"
                                            maxLength={15}
                                            required
                                            disabled={loading}
                                            className="text-base"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Senhas - Agora lado a lado com título */}
                            <div className="grid lg:grid-cols-1 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                        Segurança da Conta
                                    </h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-4">
                                    <FormInput
                                        label="Senha"
                                        icon={<Lock size={18} />}
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        placeholder="Mínimo 6 caracteres"
                                        required
                                        disabled={loading}
                                        className="text-base"
                                    />

                                    <FormInput
                                        label="Confirmar Senha"
                                        icon={<Lock size={18} />}
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        placeholder="Digite novamente"
                                        required
                                        disabled={loading}
                                        className="text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <AlertMessage
                                type="error"
                                message={error}
                                className="mt-6"
                                icon={<AlertCircle size={18} />}
                            />
                        )}

                        {/* Botão de Submit e Links */}
                        <div className="grid lg:grid-cols-1 gap-8 items-center mt-8 pt-6 border-t border-gray-200">
                            <div>
                                <p className="text-gray-600">
                                    Ao criar uma conta, você concorda com nossos{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium underline">
                                        Termos de Uso
                                    </a>{' '}
                                    e{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium underline">
                                        Política de Privacidade
                                    </a>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    type="submit"
                                    loading={loading}
                                    variant="primary"
                                    className="w-full py-4 text-lg font-semibold"
                                    icon={<UserPlus size={20} />}
                                >
                                    {loading ? "Criando conta..." : "Criar Minha Conta"}
                                </Button>

                                <p className="text-center text-gray-600">
                                    Já possui uma conta?{" "}
                                    <NavLink
                                        to="/login"
                                        state={location.state}
                                        className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
                                    >
                                        Faça login aqui
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </PageContainer>
    );
};

export default Register;