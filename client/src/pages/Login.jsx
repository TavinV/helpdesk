import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, AlertCircle, LogIn } from 'lucide-react';
import { useAuthContext } from '../context/authContext.jsx';
import PageContainer from '../components/layout/PageContainer.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import AlertMessage from '../components/ui/AlertMessage.jsx';
import FormInput from '../components/form/FormInput.jsx';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error, clearError, user } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        clearError();
    }, []);

    useEffect(() => {
        if (user) {
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();

        const result = await login(email, password);
        if (result.success) {
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        }
    };

    if (user) {
        return null;
    }

    return (
        <PageContainer
            showHeader={false}
            showFooter={false}
            className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50"
        >
            <div className="w-full max-w-md mx-4">
                <Card className="overflow-hidden" header={
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                                <LogIn size={24} className="text-white" />
                            </div>
                            <h1 className="text-2xl font-bold">Faça o login</h1>
                        </div>
                        <p className="text-blue-100 text-sm">
                            Acesse sua conta para gerenciar seus chamados
                        </p>
                    </div>
                }>                   

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-4">
                            <FormInput
                                label="Email"
                                icon={<User size={16} />}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seuemail@gmail.com"
                                required
                                disabled={loading}
                            />

                            <FormInput
                                label="Senha"
                                icon={<Lock size={16} />}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Sua senha"
                                required
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <AlertMessage
                                type="error"
                                message={error}
                                className="mt-4"
                            />
                        )}

                        <Button
                            type="submit"
                            loading={loading}
                            variant="primary"
                            className="w-full mt-6"
                            icon={<LogIn size={18} />}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-center text-gray-600">
                                Ainda não tem uma conta?{" "}
                                <NavLink
                                    to="/register"
                                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                    Cadastre-se
                                </NavLink>
                            </p>
                        </div>
                    </form>
                </Card>

            </div>
        </PageContainer>
    );
};

export default Login;