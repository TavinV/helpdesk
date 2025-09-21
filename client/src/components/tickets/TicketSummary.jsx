// src/components/tickets/TicketSummary.jsx
import { Hash, Calendar, User, ClipboardList } from "lucide-react";
import StatusBadge from "../ui/StatusBadge.jsx";

const TicketSummary = ({ ticket }) => {
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
        <div className="border border-gray-200 rounded-lg p-5">
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
                        <p className="font-medium">{ticket?._id || "Carregando..."}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <Calendar size={16} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Data de Abertura</p>
                        <p className="font-medium">
                            {ticket ? formatDate(ticket.createdAt) : "Carregando..."}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <User size={16} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <StatusBadge status={ticket?.status || "open"} />
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <ClipboardList size={16} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Título</p>
                        <p className="font-medium">{ticket?.title || "Carregando..."}</p>
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-5 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                <p className="text-gray-600">{ticket?.description || "Carregando..."}</p>
            </div>

            {ticket?.attemptedSolutions && ticket.attemptedSolutions.length > 0 && (
                <div className="mt-5 pt-5 border-t border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2">Soluções Tentadas</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {ticket.attemptedSolutions.map((solution, index) => (
                            <li key={index}>{solution}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TicketSummary;