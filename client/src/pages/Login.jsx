import Header from '../components/layout/Header.jsx';
import FormContainer from '../components/layout/FormContainer.jsx';
import Footer from '../components/layout/Footer.jsx'
import IconInput from '../components/ui/IconInput.jsx';

import { Lock, User, AlertCircle } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/authContext.jsx';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error, clearError, user } = useAuthContext(); // usar AuthContext
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        clearError();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();

        const result = await login(email, password);
        if (result.success) {
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true }); n
            navigate("/");
        }
    };
    
    if (user) {
        navigate("/");
        return null; // ou um loading spinner
    }

    return (
        <>
            <Header />
            <main className='min-h-screen flex flex-col items-center justify-center'>
                <FormContainer
                    formTitle="Faça o login"
                    submitButtonText={loading ? "Carregando..." : "Entrar"}
                    onSubmit={handleSubmit}
                >
                    <label>Email</label>
                    <IconInput
                        placeholder="seuemail@gmail.com"
                        icon={<User size={16} />}
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Senha</label>
                    <IconInput
                        placeholder="Sua senha"
                        icon={<Lock size={16} />}
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error &&
                    <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 p-3 rounded-md">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                    }

                    <div className="flex mt-8 gap-2">
                        <p className='text-gray-500 font-semibold'>Ainda não tem uma conta?</p>
                        <NavLink className="text-blue-500 font-regular" to="/register">Cadastre-se</NavLink>
                    </div>
                </FormContainer>
            </main>
            <Footer />
        </>
    );
};

export default Login;
