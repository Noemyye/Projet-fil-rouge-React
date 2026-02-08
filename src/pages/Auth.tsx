import { useParams, Navigate } from "react-router-dom";
import CardLogin from "../components/CardLogin";

export default function Auth() {
    const { mode } = useParams<{ mode: string }>();

    if (mode !== "login" && mode !== "signup") {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="top-50 left-1/2 transform -translate-x-1/2 absolute">
            <CardLogin mode={mode} />
        </div>
    );
}