import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 

interface CardLoginProps {
    mode: "login" | "signup";
}

export default function CardLogin({ mode }: CardLoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const isLogin = mode === "login";

    const handleSignUp = async () => {
        setErrorMsg("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            await setDoc(doc(db, "users", uid), {
                email,
                favorites:[],
            });

            navigate("/profil");
        } catch {
            setErrorMsg("Email or password is invalid");
        }
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

    return (
        <div className="w-full max-w-sm h-auto sm:h-120 sm:w-100 rounded-md p-5 flex flex-col items-center justify-center gap-6 sm:gap-8 border border-gray-400 shadow-xl/25">
            <h1 className="text-2xl sm:text-3xl font-semibold">{isLogin ? "Login" : "Sign Up"}</h1>
            {errorMsg && (
                <p className="text-sm bg-red-200 text-red-700 w-full rounded-md p-2 border border-red-700">{errorMsg}</p>
            )}
            <div className="flex flex-col gap-4 w-full">
                <div className="py-2 px-3 w-full bg-stone-200 rounded-md">
                    <p className="text-xs tracking-wide">E-MAIL</p>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-sm" />
                </div>
                <div className="py-2 px-3 w-full bg-stone-200 rounded-md">
                    <p className="text-xs tracking-wide">PASSWORD</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full text-sm" />
                </div>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
                <button
                    className="bg-black hover:bg-stone-800 text-white font-semibold px-3 w-full py-2 rounded-md"
                    onClick={isLogin ? handleSignIn : handleSignUp}
                >
                    {isLogin ? "Login" : "Sign Up"}
                </button>
                <Link
                    to={isLogin ? "/auth/signup" : "/auth/login"}
                    className="text-black-30 px-3 py-1 rounded-md text-sm hover:underline"
                >
                    {isLogin ? "Sign Up" : "Login"}
                </Link>
            </div>
        </div>
    );
}