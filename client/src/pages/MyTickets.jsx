import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Modal from "../components/ui/Modal.jsx";
import { toast, Toaster } from "react-hot-toast";

import {
    ClipboardList,
    Search,
    Filter,
    Calendar,
    User,
    Trash2,
    Loader2,
    AlertCircle,
    Clock,
    CheckCircle,
    XCircle,
    Plus,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { useTickets } from "../hooks/useTickets.jsx";

const MyTickets = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const {
        tickets, loading, error,
        fetchTickets, deleteTicket
    } = useTickets(user?.userId);


    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [expandedTickets, setExpandedTickets] = useState({});

    // Protege a página
    useEffect(() => {
        if (!user) {
            navigate("/login", { state: { from: "/my-tickets" } });
        } else if (user.role === "technician") {
            navigate("/");
        } else {
            fetchTickets({user: user.userId});
        }
    }, [user, navigate, fetchTickets]);

    const handleDeleteTicket = async () => {
        if (!selectedTicket) return;
        setDeleting(true);
        try {
            await deleteTicket(selectedTicket._id);
            setShowDeleteModal(false);
            setSelectedTicket(null);
        } catch (err) {
            console.error(err);
        } finally {
            setDeleting(false);
        }
    };

    const toggleExpandTicket = (ticketId) => {
        setExpandedTickets(prev => ({
            ...prev,
            [ticketId]: !prev[ticketId]
        }));
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

    const getStatusIcon = (status) => {
        switch (status) {
            case 'open':
                return <Clock size={16} className="text-amber-500" />;
            case 'in_progress':
                return <Loader2 size={16} className="text-blue-500 animate-spin" />;
            case 'closed':
                return <CheckCircle size={16} className="text-green-500" />;
            default:
                return <ClipboardList size={16} className="text-gray-500" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'open':
                return "Aberto";
            case 'in_progress':
                return "Em Andamento";
            case 'closed':
                return "Resolvido";
            default:
                return status;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'open':
                return "bg-amber-100 text-amber-800";
            case 'in_progress':
                return "bg-blue-100 text-blue-800";
            case 'resolved':
                return "bg-green-100 text-green-800";
            case 'closed':
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Filtrar e ordenar tickets
    const filteredTickets = tickets
        .filter(ticket => {
            const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
        });

    if (!user) return null;

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <Header />
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Meus Tickets</h1>
                            <p className="text-gray-600">
                                Gerencie todos os seus chamados de suporte técnico
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/open-ticket")}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus size={18} />
                            Novo Ticket
                        </button>
                    </div>

                    {/* Filtros e Busca */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar tickets..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter size={18} className="text-gray-400" />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
                                >
                                    <option value="all">Todos os status</option>
                                    <option value="open">Aberto</option>
                                    <option value="in_progress">Em Andamento</option>
                                    <option value="resolved">Resolvido</option>
                                </select>
                            </div>

                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
                                >
                                    <option value="newest">Mais recentes</option>
                                    <option value="oldest">Mais antigos</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-600">Carregando seus tickets...</p>
                        </div>
                    ) : filteredTickets.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
                            <ClipboardList size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                {searchTerm || statusFilter !== "all" ? "Nenhum ticket encontrado" : "Você ainda não tem tickets"}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm || statusFilter !== "all"
                                    ? "Tente ajustar os filtros de busca"
                                    : "Crie seu primeiro ticket para obter suporte técnico"
                                }
                            </p>
                            {(searchTerm || statusFilter !== "all") ? (
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setStatusFilter("all");
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Limpar filtros
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate("/open-ticket")}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                                >
                                    <Plus size={18} />
                                    Criar Primeiro Ticket
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredTickets.map(ticket => (
                                <div key={ticket._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                                    <div className="p-5">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-start gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-800 flex-1">
                                                        {ticket.title}
                                                    </h3>
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                                        {getStatusIcon(ticket.status)}
                                                        {getStatusText(ticket.status)}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        <span>Criado em: {formatDate(ticket.createdAt)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 cursor-pointer" onClick={() =>{
                                                        navigator.clipboard.writeText(ticket._id);
                                                        toast.success("ID do ticket copiado para a área de transferência");
                                                    }}>
                                                        <User size={14} />
                                                        <span>ID: {ticket._id.slice(-8)}</span>
                                                    </div>
                                                </div>

                                                <p className="text-gray-700 line-clamp-2">
                                                    {ticket.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleExpandTicket(ticket._id)}
                                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title={expandedTickets[ticket._id] ? "Recolher detalhes" : "Expandir detalhes"}
                                                >
                                                    {expandedTickets[ticket._id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedTicket(ticket);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Excluir ticket"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {expandedTickets[ticket._id] && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <h4 className="font-medium text-gray-700 mb-2">Descrição Completa</h4>
                                                <p className="text-gray-600 mb-4">{ticket.description}</p>

                                                {ticket.attemptedSolutions && ticket.attemptedSolutions.length > 0 && (
                                                    <>
                                                        <h4 className="font-medium text-gray-700 mb-2">Soluções Tentadas</h4>
                                                        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                                                            {ticket.attemptedSolutions.map((solution, index) => (
                                                                <li key={index}>{solution}</li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}

                                                {ticket.additionalInfo && (
                                                    <>
                                                        <h4 className="font-medium text-gray-700 mb-2">Informações Adicionais</h4>
                                                        <p className="text-gray-600">{ticket.additionalInfo}</p>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Modal de Confirmação de Exclusão */}
                {showDeleteModal && selectedTicket && (
                    <Modal
                        onClose={() => {
                            setShowDeleteModal(false);
                            setSelectedTicket(null);
                        }}
                        title="Confirmar exclusão"
                        confirmProps={{
                            message: `Tem certeza que deseja excluir o ticket "${selectedTicket.title}"? Esta ação não pode ser desfeita.`,
                            onConfirm: handleDeleteTicket,
                            onCancel: () => {
                                setShowDeleteModal(false);
                                setSelectedTicket(null);
                            },
                            confirmText: deleting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin" />
                                    Excluindo...
                                </span>
                            ) : "Excluir Ticket",
                            cancelText: "Cancelar",
                            confirmVariant: "danger"
                        }}
                    />
                )}
            </main>
            <Footer />
        </>
    );
};

export default MyTickets;
