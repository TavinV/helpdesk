import Header from '../components/layout/Header.jsx';
import FormContainer from '../components/layout/FormContainer.jsx';
import Footer from '../components/layout/Footer.jsx'
import IconInput from '../components/layout/IconInput.jsx';

import { Lock, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import useAuth from '../hooks/useAuth.jsx';
import { useEffect, useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, loading, error, clearError } = useAuth()

    useEffect(() => {
        clearError()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();   
        const result = await login(email, password);
        if (result.success) {
            // Redirecionar ou realizar alguma ação após o login bem-sucedido
            console.log(result)
        }
    };

    return (
        <>
            <Header />
            <main className='min-h-screen flex flex-col items-center justify-center'>
                <FormContainer formTitle="Faça o login" submitButtonText={loading ? "Carregando..." : "Entrar"} onSubmit={handleSubmit}>
                    <label>Email</label>
                    <IconInput placeholder="seuemail@gmail.com" icon={<User size={16} />} label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Senha</label>
                    <IconInput placeholder="Sua senha" icon={<Lock size={16} />} label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                   
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    
                    <div className="flex mt-8 gap-2">
                        <p className='text-gray-500 font-semibold'>Ainda não tem uma conta?</p>
                        <NavLink className="text-blue-500 font-regular" to="/register">Cadastre-se</NavLink>
                    </div>
                </FormContainer>
            </main>
            <Footer/>
        </>
    );
};

export default Login;