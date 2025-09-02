// Criando uma página simples de login, usando lucide icons
import Header from '../components/layout/Header';
import MainSection from '../components/layout/MainSection';
import FormContainer from '../components/layout/FormContainer';
import Footer from '../components/layout/Footer.jsx'
import IconInput from '../components/layout/IconInput.jsx';

import { Lock, User } from 'lucide-react';

import useAuth from '../hooks/useAuth.jsx';
import { useEffect, useState } from 'react';

const LoginPage = () => {

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
            <MainSection>
                <FormContainer formTitle="Faça o login" submitButtonText={loading ? "Carregando..." : "Entrar"} onSubmit={handleSubmit}>

                    <label>Email</label>
                    <IconInput icon={<User size={16} />} label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Senha</label>
                    <IconInput icon={<Lock size={16} />} label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </FormContainer>
            </MainSection>
            <Footer/>
        </>
    );
};

export default LoginPage;