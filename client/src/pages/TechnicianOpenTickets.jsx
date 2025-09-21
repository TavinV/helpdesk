// src/pages/TechnicianOpenTickets.jsx
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Filter, RefreshCw } from "lucide-react";
import PageContainer from "../components/layout/PageContainer.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import AlertMessage from "../components/ui/AlertMessage.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import TechnicianTicketCard from "../components/tickets/TechnicianTicketCard.jsx";
import useTechnicianTickets from "../hooks/useTechnicianTickets.jsx";

const TechnicianOpenTickets = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const {
        tickets,
        loading,
        error,
        fetchTickets,
        acceptTicket,
        setError,
        setTickets
    } = useTechnicianTickets();
    
    const [acceptingTicketId, setAcceptingTicketId] = useState(null);

    // Protege a página - apenas técnicos
    useEffect(() => {
        if (!user) {
            navigate("/login", { state: { from: "/technician/open-tickets" } });
            return;
        }

        if (user.role !== "technician") {
            navigate("/");
            return;
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user?.role === "technician") {
            fetchOpenTickets();
        }
    }, [user]);

    const fetchOpenTickets = () => {
        fetchTickets({ status: "open" });
    };

    const handleAcceptTicket = async (ticketId) => {
        setAcceptingTicketId(ticketId);
        setError(null);

        try {
            await acceptTicket(ticketId);
            // Remove o ticket aceito da lista
            setTickets(prev => prev.filter(ticket => ticket._id !== ticketId));
        } catch (err) {
            setError(err.message);
        } finally {
            setAcceptingTicketId(null);
        }
    };

    const handleRefresh = () => {
        fetchOpenTickets();
    };

    if (!user || user.role !== "technician") {
        return null;
    }

    return (
        <PageContainer
            title="Chamados em Aberto"
            description="Atenda novos chamados de suporte técnico"
        >
            <div className="space-y-6">
                {/* Ações */}
                <Card padding="small">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <p className="text-gray-600 text-sm">
                            Visualizando chamados disponíveis para atendimento
                        </p>
                        <Button
                            onClick={handleRefresh}
                            variant="outline"
                            size="small"
                            icon={<RefreshCw size={16} />}
                        >
                            Atualizar
                        </Button>
                    </div>
                </Card>

                {error && (
                    <AlertMessage
                        type="error"
                        message={error}
                        onClose={() => setError(null)}
                    />
                )}

                {loading ? (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner text="Carregando chamados..." />
                    </div>
                ) : tickets.length === 0 ? (
                    <EmptyState
                        icon={<ClipboardList size={48} />}
                        title="Nenhum chamado em aberto"
                        description="Todos os chamados estão sendo atendidos ou já foram resolvidos."
                        actionLabel="Recarregar"
                        onAction={handleRefresh}
                    />
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Chamados Disponíveis
                            </h3>
                            <span className="text-sm text-gray-500">
                                {tickets.length} {tickets.length === 1 ? 'chamado' : 'chamados'} disponíveis
                            </span>
                        </div>

                        {tickets.map(ticket => (
                            <TechnicianTicketCard
                                key={ticket._id}
                                ticket={ticket}
                                onAccept={handleAcceptTicket}
                                loading={acceptingTicketId === ticket._id}
                                showAcceptButton={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </PageContainer>
    );
};

export default TechnicianOpenTickets;