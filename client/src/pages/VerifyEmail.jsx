// src/pages/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Mail, Hash, AlertCircle, CheckCircle2, Loader2, ArrowLeft, Shield } from "lucide-react";
import api from "../services/api.js";
import PageContainer from "../components/layout/PageContainer.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import AlertMessage from "../components/ui/AlertMessage.jsx";
import FormInput from "../components/form/FormInput.jsx";

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
            const res = await api.post(`/auth/verify-email/request/${user?._id}`, { email });
            if (res.data.success) {
                setStep("confirm");
                setMessage("Um código de verificação foi enviado para o seu e-mail.");
                setCountdown(60);
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
            const res = await api.post(`/auth/verify-email/request/${user?._id}`, { email });
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
            const res = await api.post(`/auth/verify-email/confirm/${user?._id}`, { email, code });
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
        <PageContainer
            title="Verificação de E-mail"
            description="Proteja sua conta com verificação em duas etapas"
            className="flex items-center justify-center"
        >
            <div className="w-full max-w-md mx-auto">
                <Card
                    header={
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
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
                    }
                    className="w-full"
                >
                    <div className="p-6">

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
                                    <FormInput
                                        label="Endereço de e-mail"
                                        icon={<Mail size={18} />}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="seuemail@exemplo.com"
                                        required
                                    />
                                </>
                            )}

                            {step === "confirm" && (
                                <>
                                    <p className="text-gray-600 text-sm mb-5 text-center">
                                        Insira o código de 6 dígitos que enviamos para <span className="font-semibold">{email}</span>
                                    </p>
                                    <FormInput
                                        label="Código de verificação"
                                        icon={<Hash size={18} />}
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="Ex: 123456"
                                        required
                                        className="text-center tracking-widest font-semibold text-lg"
                                        maxLength="6"
                                    />
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
                                <AlertMessage
                                    type="error"
                                    message={error}
                                    className="mt-4"
                                />
                            )}

                            {message && step !== "success" && (
                                <AlertMessage
                                    type="success"
                                    message={message}
                                    className="mt-4"
                                />
                            )}

                            <Button
                                type="submit"
                                loading={loading}
                                variant="primary"
                                className="w-full mt-6"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        Processando...
                                    </span>
                                ) : step === "request" ? (
                                    "Enviar código de verificação"
                                ) : step === "confirm" ? (
                                    "Verificar código"
                                ) : (
                                    "Ir para o perfil"
                                )}
                            </Button>
                        </form>

                        {step === "success" && (
                            <Button
                                onClick={() => navigate("/profile")}
                                variant="outline"
                                className="w-full mt-4"
                            >
                                Ou voltar para a página inicial
                            </Button>
                        )}
                    </div>
                </Card>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Problemas com a verificação?{" "}
                        <a href="/support" className="text-blue-600 hover:underline font-medium">
                            Contate o suporte
                        </a>
                    </p>
                </div>
            </div>
        </PageContainer>
    );
};

export default VerifyEmail;