// src/pages/TechnicianMyTickets.jsx
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

const TechnicianMyTickets = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const {
        tickets,
        loading,
        error,
        fetchTickets,
        resolveTicket,
        setError
    } = useTechnicianTickets();

    const [statusFilter, setStatusFilter] = useState("in_progress");

    // Protege a página - apenas técnicos
    useEffect(() => {
        if (!user) {
            navigate("/login", { state: { from: "/technician/my-tickets" } });
            return;
        }

        if (user.role !== "technician") {
            navigate("/");
            return;
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user?.role === "technician") {
            fetchMyTickets();
        }
    }, [user, statusFilter]);

    const fetchMyTickets = () => {
        const filters = { technician: user.userId };
        if (statusFilter !== "all") {
            filters.status = statusFilter;
        }
        fetchTickets(filters);
    };

    const handleResolveTicket = async (ticketId, solution) => {
        setError(null);

        try {
            await resolveTicket(ticketId, solution);
            // Atualiza a lista após resolver
            fetchMyTickets();
        } catch (err) {
            throw err;
        }
    };

    const handleRefresh = () => {
        fetchMyTickets();
    };

    const filterOptions = [
        { value: "in_progress", label: "Em Andamento" },
        { value: "resolved", label: "Resolvidos" },
        { value: "all", label: "Todos" }
    ];

    if (!user || user.role !== "technician") {
        return null;
    }

    return (
        <PageContainer
            title="Meus Chamados"
            description="Gerencie os chamados que você está atendendo"
        >
            <div className="space-y-6">
                {/* Filtros e Ações */}
                <Card padding="small">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Filter size={20} className="text-gray-500" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                {filterOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                        title={
                            statusFilter === "in_progress"
                                ? "Nenhum chamado em andamento"
                                : statusFilter === "resolved"
                                    ? "Nenhum chamado resolvido"
                                    : "Nenhum chamado encontrado"
                        }
                        description={
                            statusFilter === "in_progress"
                                ? "Você não está atendendo nenhum chamado no momento."
                                : statusFilter === "resolved"
                                    ? "Você ainda não resolveu nenhum chamado."
                                    : "Não há chamados com os filtros selecionados."
                        }
                        actionLabel="Recarregar"
                        onAction={handleRefresh}
                    />
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {statusFilter === "in_progress" ? "Chamados em Andamento" :
                                    statusFilter === "resolved" ? "Chamados Resolvidos" :
                                        "Todos os Meus Chamados"}
                            </h3>
                            <span className="text-sm text-gray-500">
                                {tickets.length} {tickets.length === 1 ? 'chamado' : 'chamados'}
                            </span>
                        </div>

                        {tickets.map(ticket => (
                            <TechnicianTicketCard
                                key={ticket._id}
                                ticket={ticket}
                                onResolve={handleResolveTicket}
                                showAcceptButton={false}
                                showResolveForm={ticket.status === "in_progress"}
                            />
                        ))}
                    </div>
                )}
            </div>
        </PageContainer>
    );
};

export default TechnicianMyTickets;