// src/components/tickets/TechnicianTicketCard.jsx
import { useState } from "react";
import { User, Calendar, CheckCircle, X, Loader2 } from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import StatusBadge from "../ui/StatusBadge.jsx";
import AlertMessage from "../ui/AlertMessage.jsx";
import FormTextarea from "../form/FormTextArea.jsx";

const TechnicianTicketCard = ({
    ticket,
    onAccept,
    onResolve,
    loading,
    showAcceptButton = true,
    showResolveForm = false
}) => {
    const [isResolveFormOpen, setIsResolveFormOpen] = useState(showResolveForm);
    const [solution, setSolution] = useState("");
    const [resolveError, setResolveError] = useState(null);
    const [resolving, setResolving] = useState(false);

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

    const handleResolve = async () => {
        if (!solution.trim()) {
            setResolveError("Por favor, informe a solução aplicada.");
            return;
        }

        setResolving(true);
        setResolveError(null);

        try {
            await onResolve(ticket._id, solution);
            setIsResolveFormOpen(false);
            setSolution("");
        } catch (err) {
            setResolveError(err.message);
        } finally {
            setResolving(false);
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800 flex-1">
                                {ticket.title}
                            </h3>
                            <StatusBadge status={ticket.status} />
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>Criado em: {formatDate(ticket.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <User size={14} />
                                <span>Ticket ID: {ticket._id.slice(-8)}</span>
                            </div>
                        </div>

                        <p className="text-gray-700">
                            {ticket.description}
                        </p>
                    </div>
                </div>

                {ticket.attemptedSolutions && ticket.attemptedSolutions.length > 0 && (
                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2 text-sm">Soluções Tentadas pelo Usuário:</h4>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                            {ticket.attemptedSolutions.map((solution, index) => (
                                <li key={index}>{solution}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {ticket.additionalInfo && (
                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2 text-sm">Informações Adicionais:</h4>
                        <p className="text-gray-600 text-sm">{ticket.additionalInfo}</p>
                    </div>
                )}

                {showAcceptButton && !isResolveFormOpen && (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                            onClick={() => onAccept(ticket._id)}
                            loading={loading}
                            variant="primary"
                            size="small"
                            className="flex-1"
                            icon={<CheckCircle size={16} />}
                        >
                            Aceitar Chamado
                        </Button>
                    </div>
                )}

                {isResolveFormOpen && (
                    <div className="space-y-3">
                        <FormTextarea
                            label="Solução Aplicada"
                            value={solution}
                            onChange={(e) => setSolution(e.target.value)}
                            placeholder="Descreva detalhadamente a solução aplicada para resolver o problema..."
                            rows={3}
                            required
                        />

                        {resolveError && (
                            <AlertMessage type="error" message={resolveError} />
                        )}

                        <div className="flex gap-2">
                            <Button
                                onClick={handleResolve}
                                loading={resolving}
                                variant="primary"
                                size="small"
                                className="flex-1"
                                icon={<CheckCircle size={16} />}
                            >
                                {resolving ? "Marcando como resolvido..." : "Marcar como Resolvido"}
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsResolveFormOpen(false);
                                    setResolveError(null);
                                }}
                                variant="outline"
                                size="small"
                                icon={<X size={16} />}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                )}

                {!showAcceptButton && !isResolveFormOpen && ticket.status === "in_progress" && (
                    <Button
                        onClick={() => setIsResolveFormOpen(true)}
                        variant="primary"
                        size="small"
                        icon={<CheckCircle size={16} />}
                    >
                        Registrar Solução
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default TechnicianTicketCard;