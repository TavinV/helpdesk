import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuthContext();
    const location = useLocation();

    if (loading) return <div>Carregando...</div>; // evita expulsão no refresh

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
