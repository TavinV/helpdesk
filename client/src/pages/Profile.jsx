// src/pages/Profile.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Mail, CreditCard, Phone, AlertCircle, IdCard, Shield, CheckCircle, Clock } from "lucide-react";
import { useAuthContext } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import maskCPF from "../util/mask-cpf.js";
import maskPhone from "../util/mask-phone.js";
import Modal from "../components/ui/Modal.jsx";
import PageContainer from "../components/layout/PageContainer.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import AlertMessage from "../components/ui/AlertMessage.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import UserProfileHeader from "../components/profile/UserProfileHeader.jsx";
import InfoCard from "../components/ui/InfoCard.jsx";
import InfoItem from "../components/ui/InfoItem.jsx";
import FormInput from "../components/form/FormInput.jsx";

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

    const handleDeleteAccount = async () => {
        setLoadingDelete(true);
        try {
            await api.delete(`/users/${user._id}`);
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

            await api.put(`/users/${user._id}`, {
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
            <PageContainer
                showHeader={true}
                showFooter={true}
                className="flex items-center justify-center"
            >
                <LoadingSpinner text="Carregando seus dados..." />
            </PageContainer>
        );
    }

    if (!user) {
        navigate("/login", { state: { from: "/profile" } });
        return null;
    }

    return (
        <PageContainer title="Meu Perfil" description="Gerencie suas informações pessoais">
            <Card className="overflow-hidden" header={
                <UserProfileHeader
                user={user}
                    onEdit={() => setShowEditModal(true)}
                    onDelete={() => setShowDeleteModal(true)}
                />
            }>

                <div className="p-6 md:p-8">
                    {/* Email não verificado */}
                    {!user.emailVerified && (
                        <AlertMessage
                            type="warning"
                            message={
                                <span>
                                    Verifique seu e-mail para acessar todos os recursos.{" "}
                                    <NavLink to="/verify-email" className="underline font-medium">
                                        Verificar agora
                                    </NavLink>
                                </span>
                            }
                            className="mb-6"
                        />
                    )}

                    {/* Informações do usuário */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InfoCard
                            title="Informações Pessoais"
                            icon={<User size={18} className="text-blue-600" />}
                        >
                            <div className="space-y-4">
                                <InfoItem
                                    label="Nome completo"
                                    value={user.name}
                                />
                                <InfoItem
                                    label="E-mail"
                                    value={user.email}
                                    icon={user.emailVerified ? (
                                        <CheckCircle size={16} className="text-green-500" />
                                    ) : (
                                        <Clock size={16} className="text-amber-500" />
                                    )}
                                />
                            </div>
                        </InfoCard>

                        <InfoCard
                            title="Documentos"
                            icon={<IdCard size={18} className="text-indigo-600" />}
                        >
                            <div className="space-y-4">
                                <InfoItem
                                    label="CPF"
                                    value={maskCPF(user.cpf)}
                                />
                                <InfoItem
                                    label="Telefone"
                                    value={maskPhone(user.phone)}
                                />
                            </div>
                        </InfoCard>

                        <InfoCard
                            title="Segurança da Conta"
                            icon={<Shield size={18} className="text-purple-600" />}
                            cols={2}
                        >
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
                        </InfoCard>
                    </div>
                </div>
            </Card>

            {/* Modais */}
            {showDeleteModal && (
                <Modal
                    onClose={() => setShowDeleteModal(false)}
                    title="Confirmar exclusão de conta"
                    confirmProps={{
                        message: "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e todos os seus dados serão permanentemente removidos.",
                        onConfirm: handleDeleteAccount,
                        onCancel: () => setShowDeleteModal(false),
                        confirmText: loadingDelete ? "Excluindo..." : "Excluir conta",
                        cancelText: "Manter conta",
                        confirmVariant: "danger",
                        loading: loadingDelete
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
                        confirmText: loadingUpdate ? "Salvando..." : "Salvar alterações",
                        cancelText: "Cancelar",
                        loading: loadingUpdate
                    }}
                >
                    <div className="space-y-4">
                        <FormInput
                            label="Nome completo"
                            icon={<User size={16} />}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome completo"
                            required
                        />

                        <FormInput
                            label="Endereço de e-mail"
                            icon={<Mail size={16} />}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            required
                        />

                        <FormInput
                            label="CPF"
                            icon={<CreditCard size={16} />}
                            type="text"
                            value={maskCPF(cpf)}
                            onChange={(e) => setCpf(maskCPF(e.target.value))}
                            placeholder="CPF"
                            maxLength={14}
                        />

                        <FormInput
                            label="Telefone"
                            icon={<Phone size={16} />}
                            type="text"
                            value={maskPhone(phone)}
                            onChange={(e) => setPhone(maskPhone(e.target.value))}
                            placeholder="Telefone"
                            maxLength={15}
                        />
                    </div>

                    <AlertMessage
                        type="info"
                        message="Após alterar seu e-mail, você precisará verificá-lo novamente para acessar todos os recursos."
                        className="mt-4"
                    />
                </Modal>
            )}
        </PageContainer>
    );
};

export default Profile;