// src/components/profile/UserProfileHeader.jsx
import { User, CheckCircle, Edit3, Trash2 } from "lucide-react";
import Button from "../ui/Button.jsx";

const UserProfileHeader = ({ user, onEdit, onDelete }) => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                        <User size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.role === "user" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                                {user.role === "user" ? "Usuário" : "Técnico de T.I"}
                            </span>
                            {user.emailVerified && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    <CheckCircle size={12} />
                                    Verificado
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        onClick={onEdit}
                        variant="outline"
                        className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                        icon={<Edit3 size={16} />}
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={onDelete}
                        variant="danger"
                        icon={<Trash2 size={16} />}
                    >
                        Excluir
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileHeader;