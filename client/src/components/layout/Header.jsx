import { NavLink } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { useState } from "react";

const HeaderNavLink = ({ to, children, onClick }) => (
    <NavLink 
        to={to} 
        onClick={onClick}
        className="hover:text-blue-600 transition-all text-gray-700 ease-in text-lg font-normal py-2 px-4 rounded-md hover:bg-blue-50"
    >
        {children}
    </NavLink>
);

const Header = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <header className="bg-white sticky top-0 w-full text-blue-600 p-4 px-4 md:px-16 shadow-md z-50 flex justify-between items-center">
                <NavLink to="/" className="text-2xl md:text-3xl font-bold hover:scale-105 transition-all ease-in">
                    Helpdesk
                </NavLink>
                
                <button className="md:hidden z-50" onClick={toggleMenu}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                
                {/* Menu para desktop */}
                <nav className="hidden md:flex space-x-4 lg:space-x-8 text-lg items-center">
                    <HeaderNavLink to="/about">Quem somos</HeaderNavLink>
                    {user ? (
                        user.role == "technician" ? (
                            <>
                                <HeaderNavLink to="/chamados">Chamados</HeaderNavLink>
                                <HeaderNavLink to="/logout">Logout</HeaderNavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/abrir-chamado" className="hover:bg-blue-700 transition-all bg-blue-500 py-2 px-4 rounded text-white ease-in text-md">
                                    Abrir chamado
                                </NavLink>
                                <HeaderNavLink to="/meus-chamados">Meus chamados</HeaderNavLink>
                                <HeaderNavLink to="/logout">Logout</HeaderNavLink>
                            </>
                        )
                    ) : (
                        <HeaderNavLink to="/login">Login</HeaderNavLink>
                    )}
                </nav>
            </header>

            {/* Overlay e Menu Mobile */}
            {menuOpen && (
                <>
                    <nav className="fixed top-0 right-0 h-fit w-64 bg-white shadow-2xl z-40 flex flex-col p-6 transform transition-transform duration-300 ease-in-out md:hidden">
                        <div className="flex flex-col h-fit mt-16 space-y-4">
                            <HeaderNavLink to="/about" onClick={closeMenu}>
                                Quem somos
                            </HeaderNavLink>
                            {user ? (
                                user.role == "technician" ? (
                                    <>
                                        <HeaderNavLink to="/chamados" onClick={closeMenu}>
                                            Chamados
                                        </HeaderNavLink>
                                        <HeaderNavLink to="/logout" onClick={closeMenu}>
                                            Logout
                                        </HeaderNavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink 
                                            to="/abrir-chamado" 
                                            onClick={closeMenu}
                                            className="hover:bg-blue-700 transition-all bg-blue-500 p-3 rounded text-white ease-in text-md block text-center"
                                        >
                                            Abrir chamado
                                        </NavLink>
                                        <HeaderNavLink to="/meus-chamados" onClick={closeMenu}>
                                            Meus chamados
                                        </HeaderNavLink>
                                        <HeaderNavLink to="/logout" onClick={closeMenu}>
                                            Logout
                                        </HeaderNavLink>
                                    </>
                                )
                            ) : (
                                <HeaderNavLink to="/login" onClick={closeMenu}>
                                    Login
                                </HeaderNavLink>
                            )}
                        </div>
                    </nav>
                </>
            )}
        </>
    );
};

export default Header;