import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Mail, CreditCard, Phone, AlertCircle, IdCard, Edit3, Trash2, Shield, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useAuthContext } from "../context/authContext.jsx";
import api from "../services/api.js";
import maskCPF from "../util/mask-cpf.js";
import maskPhone from "../util/mask-phone.js";
import Modal from "../components/ui/Modal.jsx";

const Profile = () => {
    const { user, logout, loading } = useAuthContext();
    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [cpf, setCpf] = useState(user?.cpf || "");
    const [phone, setPhone] = useState(user?.phone || "");

    // Protege a página
    if (!user) {
        navigate("/login", { state: { from: "/profile" } });
        return null;
    }

    const handleDeleteAccount = async () => {
        setLoadingDelete(true);
        try {
            await api.delete(`/users/${user.userId}`);
            logout();
            navigate("/register");
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingDelete(false);
            setShowDeleteModal(false);
        }
    };

    const handleUpdate = async () => {
        setLoadingUpdate(true);
        try {
            const emailChanged = email !== user.email;

            await api.put(`/users/${user.userId}`, {
                name,
                email,
                cpf,
                phone,
                emailVerified: emailChanged ? false : user.emailVerified,
            });

            // Atualiza o objeto user no contexto/localStorage
            user.name = name;
            user.email = email;
            user.cpf = cpf;
            user.phone = phone;
            if (emailChanged) {
                user.emailVerified = false;
            }

            localStorage.setItem("userData", JSON.stringify(user));

            setShowEditModal(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingUpdate(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">Carregando seus dados...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        {/* Header com gradiente */}
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
                                    <button
                                        onClick={() => setShowEditModal(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all border border-white/30"
                                    >
                                        <Edit3 size={16} />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                                    >
                                        <Trash2 size={16} />
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Email não verificado */}
                            {!user.emailVerified && (
                                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-lg mb-6">
                                    <AlertCircle size={20} />
                                    <div>
                                        <p className="font-medium">E-mail não verificado</p>
                                        <p className="text-sm">
                                            Verifique seu e-mail para acessar todos os recursos.{" "}
                                            <NavLink to="/verify-email" className="underline font-medium text-amber-800">
                                                Verificar agora
                                            </NavLink>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Informações do usuário */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <User size={18} className="text-blue-600" />
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-800">Informações Pessoais</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Nome completo</p>
                                            <p className="text-gray-800">{user.name}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">E-mail</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-gray-800">{user.email}</p>
                                                {user.emailVerified ? (
                                                    <CheckCircle size={16} className="text-green-500" />
                                                ) : (
                                                    <Clock size={16} className="text-amber-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-indigo-100 rounded-full">
                                            <IdCard size={18} className="text-indigo-600" />
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-800">Documentos</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">CPF</p>
                                            <p className="text-gray-800">{maskCPF(user.cpf)}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Telefone</p>
                                            <p className="text-gray-800">{maskPhone(user.phone)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 md:col-span-2">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-purple-100 rounded-full">
                                            <Shield size={18} className="text-purple-600" />
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-800">Segurança da Conta</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">Verificação de E-mail</p>
                                                <p className="text-xs text-gray-500">Status da verificação</p>
                                            </div>
                                            {user.emailVerified ? (
                                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                    Verificado
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                                                    Pendente
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">Tipo de Conta</p>
                                                <p className="text-xs text-gray-500">Privilégios de acesso</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === "user" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                                                {user.role === "user" ? "Usuário" : "Técnico"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <NavLink
                                            to="/verify-email"
                                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            <Shield size={16} />
                                            Gerenciar verificação de e-mail
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modais */}
                {showDeleteModal && (
                    <Modal
                        onClose={() => setShowDeleteModal(false)}
                        title="Confirmar exclusão de conta"
                        confirmProps={{
                            message: "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e todos os seus dados serão permanentemente removidos.",
                            onConfirm: handleDeleteAccount,
                            onCancel: () => setShowDeleteModal(false),
                            confirmText: loadingDelete ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin" />
                                    Excluindo...
                                </span>
                            ) : "Excluir conta",
                            cancelText: "Manter conta",
                            confirmVariant: "danger"
                        }}
                    />
                )}

                {showEditModal && (
                    <Modal
                        title="Editar perfil"
                        onClose={() => setShowEditModal(false)}
                        confirmProps={{
                            onConfirm: handleUpdate,
                            onCancel: () => setShowEditModal(false),
                            confirmText: loadingUpdate ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin" />
                                    Salvando...
                                </span>
                            ) : "Salvar alterações",
                            cancelText: "Cancelar",
                        }}
                        inputs={[
                            {
                                icon: <User size={16} />,
                                placeholder: "Nome completo",
                                type: "text",
                                value: name,
                                onChange: (e) => setName(e.target.value),
                                label: "Nome completo"
                            },
                            {
                                icon: <Mail size={16} />,
                                placeholder: "E-mail",
                                type: "email",
                                value: email,
                                onChange: (e) => setEmail(e.target.value),
                                label: "Endereço de e-mail"
                            },
                            {
                                icon: <CreditCard size={16} />,
                                placeholder: "CPF",
                                type: "text",
                                value: maskCPF(cpf),
                                onChange: (e) => setCpf(maskCPF(e.target.value)),
                                label: "CPF",
                                maxLength: 14
                            },
                            {
                                icon: <Phone size={16} />,
                                placeholder: "Telefone",
                                type: "text",
                                value: maskPhone(phone),
                                onChange: (e) => setPhone(maskPhone(e.target.value)),
                                label: "Telefone",
                                maxLength: 15
                            },
                        ]}
                    >
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                            <p className="text-blue-700 text-sm flex items-start gap-2">
                                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                <span>Após alterar seu e-mail, você precisará verificá-lo novamente para acessar todos os recursos.</span>
                            </p>
                        </div>
                    </Modal>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Profile;