import { useAuthLogin } from "../stores/useAuthLogin";

export default function Profil() {
    const user = useAuthLogin((state) => state.user);

    if (!user) {
        return <div>Personne de connecté.</div>;
    }

    return (
        <div>
            <h1>Bienvenue, {user.name}!</h1>
        </div>
    );
};