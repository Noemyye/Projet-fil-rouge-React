import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profil() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                navigate("/login");
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>Bienvenue, {user?.email}!</h1>
        </div>
    );
};