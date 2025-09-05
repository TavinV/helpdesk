import Header from '../components/layout/Header';
import FormContainer from '../components/layout/FormContainer';
import Footer from '../components/layout/Footer.jsx'
import IconInput from '../components/layout/IconInput.jsx';

import { Lock, User, IdCard, MailCheck } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { useState } from 'react';

import maskCPF from '../util/mask-cpf.js';

const Register = () => {

    const [email, setEmail] = useState("")
    const [role, setRole] = useState("user")
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();  
        alert(role, name, cpf, confirmPassword)
    };

    return (
        <>
            <Header />
            <main className='min-h-screen flex flex-col items-center justify-center'>
                <FormContainer formTitle="Criar conta" submitButtonText={"Cadastre-se"} onSubmit={handleSubmit}>
                    
                    <div className='flex flex-col gap-2 mb-4'>
                        <label className="font-semibold">Tipo de usuário</label>
                        <span className='flex gap-4 items-center'>
                            <label htmlFor="user" className='flex items-center gap-1'>
                                <input 
                                    id="user" 
                                    type="radio" 
                                    name="role" 
                                    value="user"
                                    checked={role === "user"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Usuário
                            </label>

                            <label htmlFor="tech" className='flex items-center gap-1'>
                                <input 
                                    id="tech" 
                                    type="radio" 
                                    name="role" 
                                    value="technician"
                                    checked={role === "technician"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Técnico
                            </label>
                        </span>
                    </div>

                    <span>
                        <label className="font-semibold">Nome completo</label>
                        <IconInput placeholder="Seu nome completo" icon={<User size={16} />} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </span>

                    <span>
                        <label className="font-semibold">E-mail</label>
                        <IconInput placeholder="Seu e-mail" icon={<MailCheck size={16} />} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </span>
    
                    <span>
                        <label className="font-semibold mb-1">CPF</label>
                        <IconInput placeholder="123.456.789-00" maxLength={14} icon={<IdCard size={16} />} type="text" value={cpf} onChange={(e) => setCpf(maskCPF(e.target.value))} /> 
                    </span>
                    
                    <span>
                        <label className="font-semibold mb-1">Senha</label>
                        <IconInput placeholder="Sua senha" icon={<Lock size={16} />} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </span>

                    <span>
                        <label className="font-semibold mb-1">Confirme sua senha</label>
                        <IconInput placeholder="Sua senha" icon={<Lock size={16} />} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </span>

                    <div className="flex mt-8 gap-2">
                        <p className='text-gray-500 font-semibold'>Já possui uma conta?</p>
                        <NavLink className="text-blue-500 font-regular" to="/login">Faça login</NavLink>
                    </div>
                </FormContainer>
            </main>
            <Footer/>
        </>
    );
};

export default Register;