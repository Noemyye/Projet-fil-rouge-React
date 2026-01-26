import { create } from 'zustand';

interface User {
    name: string;
}

interface AuthState {
    user: User | null;
    login: (pseudo: string) => void;
    logout: () => void;
}

export const useAuthLogin = create<AuthState>((set) => ({
    user: null,

    login: (pseudo: string) => 
        set({ user: { name: pseudo } }),

    logout: () => 
        set({ user: null }),
}));