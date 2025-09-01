import { NavLink } from "react-router-dom";

const HeaderNavLink = ({ to, children }) => (
    <NavLink to={to} className="hover:text-blue-600 transition-all text-gray-700 ease-in text-xl font-normal">
        {children}
    </NavLink>
);

const Header = ({ user }) => {
    return (
        <header className="bg-gray-100 sticky top-0 w-full text-blue-600 p-8 px-16 shadow-lg z-10 flex justify-between items-center">
            <NavLink to="/" className="text-3xl font-bold hover:scale-105 transition-all ease-in">
                Helpdesk
            </NavLink>
            <nav className="space-x-8 text-lg ">
                <HeaderNavLink to="/quem-somos">Quem somos</HeaderNavLink>
                {
                    user ? (
                        user.role == "technician" ? (
                            <>
                                <HeaderNavLink to="/chamados">Chamados</HeaderNavLink>
                                <HeaderNavLink to="/logout">Logout</HeaderNavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/abrir-chamado" className="hover:bg-blue-700 transition-all bg-blue-500 p-4 rounded text-white ease-in text-md">Abrir chamado</NavLink>
                                <HeaderNavLink to="/meus-chamados">Meus chamados</HeaderNavLink>
                                <HeaderNavLink to="/logout">Logout</HeaderNavLink>
                            </>
                        )
                    ) : (
                        <>
                            <HeaderNavLink to="/login">Login</HeaderNavLink>
                        </>
                    )
                }

            </nav >
        </header >
    );
};

export default Header;
