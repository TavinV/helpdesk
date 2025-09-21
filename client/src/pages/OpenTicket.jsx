import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";

import PageContainer from "../components/layout/PageContainer.jsx";
import Card from "../components/ui/Card.jsx";
import AlertMessage from "../components/ui/AlertMessage.jsx";
import Button from "../components/ui/Button.jsx";
import FormInput from "../components/form/FormInput.jsx";
import FormTextarea from "../components/form/FormTextArea.jsx";
import DynamicInputList from "../components/form/DynamicInputList.jsx";
import SuccessCard from "../components/ui/SuccessCard.jsx";
import TicketSummary from "../components/tickets/TicketSummary.jsx";

import { useTickets } from "../hooks/useTickets.jsx";

const CreateTicket = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const { createTicket } = useTickets(user?.userId);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        attemptedSolutions: [""],
        additionalInfo: ""
    });
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSolutionsChange = (solutions) => {
        setFormData(prev => ({
            ...prev,
            attemptedSolutions: solutions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
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

            const res = await createTicket(payload);

            if (res.success) {
                setCreatedTicket(res.data);
                setStep("success");
            } else {
                setError(res.message || "Erro ao abrir chamado. Tente novamente.");
            }
        } catch (err) {
            setError(err.message || "Erro ao abrir chamado. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (!user || user.role === "technician") {
        return null;
    }

    return (
        <PageContainer
            title="Abrir Chamado"
            description="Descreva detalhadamente o problema que você está enfrentando"
        >
            {step === "form" ? (
                <Card header={
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white text-center">
                        <div className="flex items-center justify-center gap-3">
                            <ClipboardList size={24} />
                            <h2 className="text-xl font-semibold">Formulário de Abertura de Chamado</h2>
                        </div>
                    </div>
                }>
                    

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-6">
                            <FormInput
                                label="Título do Problema"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Ex: Computador não liga"
                                required
                                helpText="Seja claro e objetivo no título do problema"
                            />

                            <FormTextarea
                                label="Descrição Detalhada"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Descreva com detalhes o problema, incluindo mensagens de erro, quando começou a acontecer, etc."
                                rows={5}
                                required
                            />

                            <DynamicInputList
                                items={formData.attemptedSolutions}
                                onItemsChange={handleSolutionsChange}
                                placeholder="Descreva uma solução que você já tentou"
                                addButtonText="Adicionar outra solução tentada"
                                minItems={1}
                                maxItems={10}
                            />

                            <FormTextarea
                                label="Informações Adicionais"
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleInputChange}
                                placeholder="Qualquer outra informação que possa ser útil para nossa equipe"
                                rows={3}
                            />
                        </div>

                        {error && (
                            <AlertMessage
                                type="error"
                                message={error}
                                className="mt-6"
                            />
                        )}

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Button
                                type="button"
                                onClick={() => navigate("/")}
                                variant="outline"
                                className="flex-1"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                loading={loading}
                                variant="primary"
                                className="flex-1"
                            >
                                {loading ? "Enviando..." : "Abrir Chamado"}
                            </Button>
                        </div>
                    </form>
                </Card>
            ) : (
                <SuccessCard
                    title="Chamado Aberto com Sucesso!"
                    message="Seu chamado foi registrado em nosso sistema e em breve será atendido por um de nossos técnicos."
                    primaryAction={() => navigate("/my-tickets")}
                    secondaryAction={() => setStep("form")}
                    primaryLabel="Ver Meus Tickets"
                    secondaryLabel="Abrir Novo Chamado"
                >
                    {createdTicket && <TicketSummary ticket={createdTicket} />}
                </SuccessCard>
            )}
        </PageContainer>
    );
};

export default CreateTicket;
