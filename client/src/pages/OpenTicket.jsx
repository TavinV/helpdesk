import { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import { AlertCircle, CheckCircle2, Loader2, Plus, X, ClipboardList, User, Calendar, Hash } from "lucide-react";
import api from "../services/api.js";

const CreateTicket = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        attemptedSolutions: [""],
        additionalInfo: ""
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [createdTicket, setCreatedTicket] = useState(null);
    const [step, setStep] = useState("form"); // form | success

    // Protege a página - apenas usuários com role 'user'
    useEffect(() => {
        if (!user) {
            navigate("/login", { state: { from: "/create-ticket" } });
            return;
        }

        if (user.role === "technician") {
            navigate("/");
            return;
        }
    }, [user, navigate]);

    if (!user || user.role === "technician") {
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSolutionChange = (index, value) => {
        const newSolutions = [...formData.attemptedSolutions];
        newSolutions[index] = value;
        setFormData(prev => ({
            ...prev,
            attemptedSolutions: newSolutions
        }));
    };

    const addSolutionField = () => {
        setFormData(prev => ({
            ...prev,
            attemptedSolutions: [...prev.attemptedSolutions, ""]
        }));
    };

    const removeSolutionField = (index) => {
        if (formData.attemptedSolutions.length <= 1) return;

        const newSolutions = [...formData.attemptedSolutions];
        newSolutions.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            attemptedSolutions: newSolutions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        // Validação básica
        if (!formData.title.trim()) {
            setError("Por favor, informe um título para o chamado.");
            setLoading(false);
            return;
        }

        if (!formData.description.trim()) {
            setError("Por favor, forneça uma descrição detalhada do problema.");
            setLoading(false);
            return;
        }

        // Filtrar soluções tentadas vazias
        const filteredSolutions = formData.attemptedSolutions.filter(s => s.trim() !== "");

        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                attemptedSolutions: filteredSolutions,
                additionalInfo: formData.additionalInfo
            };

            const res = await api.post("/tickets", payload);

            if (res.data.success) {
                setCreatedTicket(res.data.data);
                setStep("success");
                setMessage("Chamado aberto com sucesso!");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao abrir chamado. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Abrir Chamado</h1>
                        <p className="text-gray-600">
                            Descreva detalhadamente o problema que você está enfrentando
                        </p>
                    </div>

                    {step === "form" ? (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white">
                                <div className="flex items-center justify-center gap-3">
                                    <ClipboardList size={24} />
                                    <h2 className="text-xl font-semibold">Formulário de Abertura de Chamado</h2>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                            Título do Problema *
                                        </label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Computador não liga"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Seja claro e objetivo no título do problema
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                            Descrição Detalhada *
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={5}
                                            placeholder="Descreva com detalhes o problema, incluindo mensagens de erro, quando começou a acontecer, etc."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Soluções já Tentadas
                                        </label>
                                        <div className="space-y-3">
                                            {formData.attemptedSolutions.map((solution, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={solution}
                                                        onChange={(e) => handleSolutionChange(index, e.target.value)}
                                                        placeholder="Descreva uma solução que você já tentou"
                                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSolutionField(index)}
                                                        className="p-3 text-red-500 hover:bg-red-50 rounded-full transition"
                                                        disabled={formData.attemptedSolutions.length <= 1}
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addSolutionField}
                                            className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            <Plus size={16} />
                                            Adicionar outra solução tentada
                                        </button>
                                    </div>

                                    <div>
                                        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                                            Informações Adicionais
                                        </label>
                                        <textarea
                                            id="additionalInfo"
                                            name="additionalInfo"
                                            value={formData.additionalInfo}
                                            onChange={handleInputChange}
                                            rows={3}
                                            placeholder="Qualquer outra informação que possa ser útil para nossa equipe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mt-6">
                                        <AlertCircle size={20} />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/dashboard")}
                                        className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`flex-1 py-3 px-4 rounded-lg text-white font-medium transition-all
                                            ${loading
                                                ? 'bg-blue-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Loader2 className="animate-spin" size={18} />
                                                Enviando...
                                            </span>
                                        ) : (
                                            "Abrir Chamado"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-5 text-white">
                                <div className="flex items-center justify-center gap-3">
                                    <CheckCircle2 size={24} />
                                    <h2 className="text-xl font-semibold">Chamado Aberto com Sucesso!</h2>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex flex-col items-center mb-6">
                                    <div className="rounded-full bg-green-100 p-4 mb-4">
                                        <CheckCircle2 className="text-green-600" size={40} />
                                    </div>
                                    <p className="text-green-700 font-medium text-center">
                                        Seu chamado foi registrado em nosso sistema e em breve será atendido por um de nossos técnicos.
                                    </p>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-5 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <ClipboardList size={20} />
                                        Resumo do Chamado
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <Hash size={16} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Número do Chamado</p>
                                                <p className="font-medium">{createdTicket?._id || "Carregando..."}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <Calendar size={16} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Data de Abertura</p>
                                                <p className="font-medium">
                                                    {createdTicket ? formatDate(createdTicket.createdAt) : "Carregando..."}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <User size={16} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Status</p>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize">
                                                    {createdTicket?.status || "open"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <ClipboardList size={16} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Título</p>
                                                <p className="font-medium">{createdTicket?.title || "Carregando..."}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 pt-5 border-t border-gray-200">
                                        <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                                        <p className="text-gray-600">{createdTicket?.description || "Carregando..."}</p>
                                    </div>

                                    {createdTicket?.attemptedSolutions && createdTicket.attemptedSolutions.length > 0 && (
                                        <div className="mt-5 pt-5 border-t border-gray-200">
                                            <h4 className="font-medium text-gray-700 mb-2">Soluções Tentadas</h4>
                                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                                {createdTicket.attemptedSolutions.map((solution, index) => (
                                                    <li key={index}>{solution}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => navigate("/")}
                                        className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Voltar para a home
                                    </button>
                                    <button
                                        onClick={() => setStep("form")}
                                        className="flex-1 py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Abrir Novo Chamado
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CreateTicket;