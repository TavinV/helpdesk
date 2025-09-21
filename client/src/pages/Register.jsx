import Header from '../components/layout/Header';
import FormContainer from '../components/layout/FormContainer';
import Footer from '../components/layout/Footer.jsx';
import IconInput from '../components/ui/IconInput.jsx';

import { Lock, User, IdCard, MailCheck, Phone, AlertCircle } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useAuthContext } from '../context/authContext.jsx';

import api from '../services/api.js';
import maskCPF from '../util/mask-cpf.js';
import maskPhone from '../util/mask-phone.js';

const Register = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {login} = useAuthContext();


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        setLoading(true);
        try {
            const body = {
                name,
                email,
                cpf: cpf.replace(/\D/g, ""),
                password,
                role,
                phone: phone.replace(/\D/g, ""),
            };

            const response = await api.post("/users", body);

            if (response.data.success) {
                // Login automatico
                const loginResult = await login(email, password)

                if (loginResult.success){
                    navigate("/")
                } else {
                    navigate("/login")
                }

            } else {
                setError(response.data.message || "Erro ao cadastrar usuário");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Erro de conexão");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen flex items-center justify-center pt-24 pb-8 px-4 md:px-0 bg-gray-50">
                <FormContainer
                    formTitle="Criar conta"
                    submitButtonText={loading ? "Carregando..." : "Cadastre-se"}
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-4"
                >
                    {/* Tipo de usuário */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Tipo de usuário</label>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="user" className="flex items-center gap-1">
                                <input
                                    id="user"
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={role === "user"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Usuário
                            </label>
                            <label htmlFor="tech" className="flex items-center gap-1">
                                <input
                                    id="tech"
                                    type="radio"
                                    name="role"
                                    value="technician"
                                    checked={role === "technician"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Técnico
                            </label>
                        </div>
                    </div>

                    {/* Inputs */}
                    <label className="font-semibold">Nome completo</label>
                    <IconInput placeholder="Seu nome completo" icon={<User size={16} />} type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label className="font-semibold">E-mail</label>
                    <IconInput placeholder="Seu e-mail" icon={<MailCheck size={16} />} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label className="font-semibold">CPF</label>
                    <IconInput placeholder="123.456.789-00" maxLength={14} icon={<IdCard size={16} />} type="text" value={cpf} onChange={(e) => setCpf(maskCPF(e.target.value))} />

                    <label className="font-semibold">Telefone</label>
                    <IconInput placeholder="(11) 98765-4321" maxLength={15} icon={<Phone size={16} />} type="text" value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} />

                    <label className="font-semibold">Senha</label>
                    <IconInput placeholder="Sua senha" icon={<Lock size={16} />} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label className="font-semibold">Confirme sua senha</label>
                    <IconInput placeholder="Confirme sua senha" icon={<Lock size={16} />} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    {/* Mensagem de erro sofisticada */}
                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 p-3 rounded-md">
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Link para login */}
                    <div className="flex flex-col sm:flex-row justify-center gap-2 mt-6 text-center">
                        <p className="text-gray-500 font-semibold">Já possui uma conta?</p>
                        <NavLink className="text-blue-500" to="/login">
                            Faça login
                        </NavLink>
                    </div>
                </FormContainer>
            </main>
            <Footer />
        </>
    );
};

export default Register;
