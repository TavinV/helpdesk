// src/components/ui/StatusBadge.jsx
import { Clock, Loader2, CheckCircle2, XCircle, ClipboardList } from "lucide-react";

const StatusBadge = ({ status, showIcon = true, size = "medium" }) => {
    const statusConfig = {
        open: {
            text: "Aberto",
            icon: <Clock size={16} className="text-amber-500" />,
            classes: "bg-amber-100 text-amber-800"
        },
        in_progress: {
            text: "Em Andamento",
            icon: <Loader2 size={16} className="text-blue-500 animate-spin" />,
            classes: "bg-blue-100 text-blue-800"
        },
        resolved: {
            text: "Resolvido",
            icon: <CheckCircle2 size={16} className="text-green-500" />,
            classes: "bg-green-100 text-green-800"
        },
        closed: {
            text: "Fechado",
            icon: <XCircle size={16} className="text-gray-500" />,
            classes: "bg-gray-100 text-gray-800"
        },
        default: {
            text: status,
            icon: <ClipboardList size={16} className="text-gray-500" />,
            classes: "bg-gray-100 text-gray-800"
        }
    };

    const sizeClasses = {
        small: "px-2 py-1 text-xs",
        medium: "px-3 py-1 text-sm",
        large: "px-4 py-2 text-base"
    };

    const config = statusConfig[status] || statusConfig.default;

    return (
        <span className={`inline-flex items-center gap-1 rounded-full font-medium ${config.classes} ${sizeClasses[size]}`}>
            {showIcon && config.icon}
            {config.text}
        </span>
    );
};

export default StatusBadge;