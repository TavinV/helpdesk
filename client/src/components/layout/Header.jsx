import { NavLink } from "react-router-dom";
import { X, Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";

const HeaderNavLink = ({ to, children, onClick, className = "" }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={`hover:text-blue-600 transition-all text-gray-700 ease-in text-lg font-normal py-2 px-4 rounded-md hover:bg-blue-50 ${className}`}
    >
        {children}
    </NavLink>
);

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuthContext();

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className="bg-white sticky top-0 w-full shadow-md z-50 flex justify-between items-center px-4 md:px-16 py-3 md:py-4">
                {/* Logo */}
                <NavLink
                    to="/"
                    className="text-2xl md:text-3xl font-bold text-blue-600 hover:scale-105 transition-all"
                >
                    Helpdesk
                </NavLink>

                {/* Menu principal + perfil/logout */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    {/* Links principais */}
                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                        <HeaderNavLink to="/about">Quem somos</HeaderNavLink>

                        {user && user.role === "user" && (
                            <>
                                <HeaderNavLink to="/open-ticket">Abrir chamado</HeaderNavLink>
                                <HeaderNavLink to="/my-tickets">Meus chamados</HeaderNavLink>
                            </>
                        )}

                        {user && user.role === "technician" && (
                            <>
                                <HeaderNavLink to="/technician-my-tickets" onClick={closeMenu}>
                                    Meus Chamados
                                </HeaderNavLink>
                                <HeaderNavLink to="/technician-open-tickets" onClick={closeMenu}>
                                    Chamados Abertos
                                </HeaderNavLink>
                            </>
                        )}

                        {!user && <HeaderNavLink to="/login">Login</HeaderNavLink>}
                    </nav>

                    {/* Perfil + Logout à direita */}
                    {user && (
                        <div className="hidden md:flex items-center space-x-4 ml-6">
                            <NavLink
                                to="/profile"
                                className="text-gray-700 hover:text-blue-600 transition-all"
                            >
                                <User size={24} />
                            </NavLink>
                            <button
                                onClick={logout}
                                className="text-gray-700 hover:text-red-600 transition-all"
                            >
                                <LogOut size={24} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Botão Mobile */}
                <button className="md:hidden z-50" onClick={toggleMenu}>
                    {menuOpen ? <X className="text-blue-500" size={24} /> : <Menu className="text-blue-500" size={24} />}
                </button>
            </header>

            {/* Menu Mobile */}
            {menuOpen && (
                <nav className="fixed top-0 right-0 w-64 bg-white shadow-2xl z-40 flex flex-col p-6 transform transition-transform duration-300 ease-in-out md:hidden">
                    <div className="flex flex-col mt-16 space-y-4">
                        <HeaderNavLink to="/about" onClick={closeMenu}>
                            Quem somos
                        </HeaderNavLink>

                        {!user && (
                            <HeaderNavLink to="/login" onClick={closeMenu}>
                                Login
                            </HeaderNavLink>
                        )}

                        {user && (
                            <>
                                <HeaderNavLink to="/profile" onClick={closeMenu}>
                                    Perfil
                                </HeaderNavLink>

                                {user.role === "user" && (
                                    <>
                                        <HeaderNavLink to="/open-ticket" onClick={closeMenu}>
                                            Abrir chamado
                                        </HeaderNavLink>
                                        <HeaderNavLink to="/my-tickets" onClick={closeMenu}>
                                            Meus chamados
                                        </HeaderNavLink>
                                    </>
                                )}

                                {user.role === "technician" && (
                                    <>
                                        <HeaderNavLink to="/technician-my-tickets" onClick={closeMenu}>
                                            Meus Chamados
                                        </HeaderNavLink>
                                        <HeaderNavLink to="/technician-open-tickets" onClick={closeMenu}>
                                            Chamados Abertos
                                        </HeaderNavLink>
                                    </>
                                )}

                                <button
                                    onClick={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-all py-2 px-4 rounded-md"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            )}
        </>
    );
};

export default Header;
