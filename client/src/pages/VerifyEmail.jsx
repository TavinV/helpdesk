// src/pages/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import FormContainer from "../components/layout/FormContainer.jsx";
import IconInput from "../components/ui/IconInput.jsx";

import { Mail, Hash, AlertCircle, CheckCircle2, Loader2, ArrowLeft, Shield } from "lucide-react";
import api from "../services/api.js";

const VerifyEmail = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState(user?.email || "");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("request"); // request | confirm | success
    const [countdown, setCountdown] = useState(0);

    // Efeito para contagem regressiva de reenvio
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Protege a página
    useEffect(() => {
        if (!user) {
            navigate("/login", { state: { from: "/verify-email" } });
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        try {
            const res = await api.post(`/auth/verify-email/request/${user.userId}`, { email });
            if (res.data.success) {
                setStep("confirm");
                setMessage("Um código de verificação foi enviado para o seu e-mail.");
                setCountdown(60); // Inicia contagem regressiva de 60 segundos
            }
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao solicitar código. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (countdown > 0) return;

        setError(null);
        setMessage(null);
        setLoading(true);

        try {
            const res = await api.post(`/auth/verify-email/request/${user.userId}`, { email });
            if (res.data.success) {
                setMessage("Novo código enviado para o seu e-mail.");
                setCountdown(60);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao reenviar código. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmCode = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        try {
            const res = await api.post(`/auth/verify-email/confirm/${user.userId}`, { email, code });
            if (res.data.success) {
                setStep("success");
                setMessage("E-mail verificado com sucesso!");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Código inválido ou expirado. Solicite um novo código.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white text-center">
                            <div className="flex justify-center mb-3">
                                <div className="p-3 bg-white/20 rounded-full">
                                    <Shield size={30} className="text-white" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold">Verificação de E-mail</h1>
                            <p className="text-blue-100 text-sm mt-2">
                                {step === "request"
                                    ? "Proteja sua conta com verificação em duas etapas"
                                    : step === "confirm"
                                        ? "Digite o código que enviamos para seu e-mail"
                                        : "Verificação concluída com sucesso!"}
                            </p>
                        </div>

                        <div className="p-6">
                            {step !== "request" && (
                                <button
                                    onClick={() => setStep("request")}
                                    className="flex items-center text-sm text-gray-600 mb-4 hover:text-blue-600 transition-colors"
                                >
                                    <ArrowLeft size={16} className="mr-1" />
                                    Voltar
                                </button>
                            )}

                            <form onSubmit={
                                step === "request"
                                    ? handleRequestCode
                                    : step === "confirm"
                                        ? handleConfirmCode
                                        : () => navigate("/profile")
                            }>
                                {step === "request" && (
                                    <>
                                        <p className="text-gray-600 text-sm mb-5 text-center">
                                            Para sua segurança, enviamos um código de verificação para o e-mail associado à sua conta.
                                        </p>
                                        <div className="mb-5">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Endereço de e-mail
                                            </label>
                                            <IconInput
                                                placeholder="seuemail@exemplo.com"
                                                icon={<Mail size={18} />}
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full"
                                            />
                                        </div>
                                    </>
                                )}

                                {step === "confirm" && (
                                    <>
                                        <p className="text-gray-600 text-sm mb-5 text-center">
                                            Insira o código de 6 dígitos que enviamos para <span className="font-semibold">{email}</span>
                                        </p>
                                        <div className="mb-5">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Código de verificação
                                            </label>
                                            <IconInput
                                                placeholder="Ex: 123456"
                                                icon={<Hash size={18} />}
                                                type="text"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                required
                                                className="w-full text-center tracking-widest font-semibold text-lg"
                                                maxLength="6"
                                            />
                                        </div>
                                        <div className="text-center mb-5">
                                            <button
                                                type="button"
                                                onClick={handleResendCode}
                                                disabled={countdown > 0}
                                                className={`text-sm ${countdown > 0 ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800 hover:underline'}`}
                                            >
                                                {countdown > 0
                                                    ? `Reenviar código em ${countdown}s`
                                                    : 'Não recebeu o código? Reenviar'
                                                }
                                            </button>
                                        </div>
                                    </>
                                )}

                                {step === "success" && (
                                    <div className="flex flex-col items-center gap-4 py-4">
                                        <div className="rounded-full bg-green-100 p-4">
                                            <CheckCircle2 className="text-green-600" size={40} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800">Verificação concluída!</h3>
                                        <p className="text-green-600 text-center font-medium">
                                            Seu e-mail foi verificado com sucesso.
                                        </p>
                                    </div>
                                )}

                                {error && (
                                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mt-4 text-sm">
                                        <AlertCircle size={20} />
                                        <span>{error}</span>
                                    </div>
                                )}

                                {message && step !== "success" && (
                                    <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg mt-4 text-sm">
                                        <CheckCircle2 size={20} />
                                        <span>{message}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 px-4 rounded-lg text-white font-medium mt-6 transition-all
                                        ${loading
                                            ? 'bg-blue-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="animate-spin" size={18} />
                                            Processando...
                                        </span>
                                    ) : step === "request" ? (
                                        "Enviar código de verificação"
                                    ) : step === "confirm" ? (
                                        "Verificar código"
                                    ) : (
                                        "Ir para o perfil"
                                    )}
                                </button>
                            </form>

                            {step === "success" && (
                                <button
                                    onClick={() => navigate("/profile")}
                                    className="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium mt-4 hover:bg-gray-50 transition-colors"
                                >
                                    Ou voltar para a página inicial
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Problemas com a verificação?{" "}
                            <a href="/support" className="text-blue-600 hover:underline font-medium">
                                Contate o suporte
                            </a>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default VerifyEmail;