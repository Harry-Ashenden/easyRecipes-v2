import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../hooks/useAuth";

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        };

        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
