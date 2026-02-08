import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";

interface CardLoginProps {
    mode: "login" | "signup";
}

export default function CardLogin({ mode }: CardLoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSignUp = () => {
        setErrorMsg("");
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/profil");
            })
            .catch(() => {
                setErrorMsg(`Email or password is invalid`);
            });
    };

    const handleSignIn = () => {
        setErrorMsg("");
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/profil");
            })
            .catch(() => {
                setErrorMsg('Email or password is invalid');
            });
    };

    const isLogin = mode === "login";

    return (
        <>
            <div className="h-120 w-100 rounded-md p-5 flex flex-col items-center justify-center gap-8 border border-gray-400">
                <h1 className="text-3xl font-semibold">{isLogin ? "Login" : "Sign Up"}</h1>
                {errorMsg && (
                    <p className="text-sm bg-red-200 text-red-700 w-full rounded-md p-2 border border-red-700">{errorMsg}</p>
                )}
                <div className="flex flex-col gap-4 w-full">
                    <div className="py-2 px-3 w-full bg-stone-200 rounded-md">
                        <p className="text-xs tracking-wide">E-MAIL</p>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="py-2 px-3 w-full bg-stone-200 rounded-md">
                        <p className="text-xs tracking-wide">PASSWORD</p>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 w-full">
                    <button
                        className="bg-black text-white font-semibold px-3 w-full py-1 rounded-md hover:bg-stone-700"
                        onClick={isLogin ? handleSignIn : handleSignUp}
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                    <Link
                        to={isLogin ? "/auth/signup" : "/auth/login"}
                        className="text-black-30 px-3 py-1 rounded-md text-sm"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </Link>
                </div>
            </div>
        </>
    );
    }