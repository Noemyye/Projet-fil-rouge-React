import { useParams, Navigate } from "react-router-dom";
import CardLogin from "../components/CardLogin";

export default function Auth() {
    const { mode } = useParams<{ mode: string }>();

    if (mode !== "login" && mode !== "signup") {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="min-h-[calc(100vh-60px)] flex items-center sm:justify-center px-4 py-10 sm:block sm:relative sm:min-h-0 sm:px-0 sm:py-0">
            <div className="w-full sm:w-auto sm:absolute sm:top-50 sm:left-1/2 sm:-translate-x-1/2">
                <CardLogin mode={mode} />
            </div>
        </div>
    );
}