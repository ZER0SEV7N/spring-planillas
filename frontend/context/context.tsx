"use client";
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/config';
import { Usuario } from '../types/Usuario';

interface AuthContextType {
    user: Usuario | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Usuario | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        validarAuth();
    }, []);

    //Validar si el token es válido y obtener el perfil del usuario
    const validarAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        
        try{
            const res = await api.get('/auth/perfil');
            setUser(res.data.data || res.data.usuario || res.data);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
        } finally {
            setIsLoading(false);
        }
    };

    //Función para refrescar el perfil del usuario después de actualizar su información
    const refrescarPerfil = async () => {
        try {
            const res = await api.get('/auth/perfil');
            setUser(res.data.data);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
        }
    }

    //Función para iniciar sesión, guarda el token y valida la autenticación
    const login = (token: string) => {
        localStorage.setItem('token', token);
        validarAuth();
        router.push('/administrador/dashboard');
    };

    //Función para cerrar sesión, elimina el token y redirige al login
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/auth');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading, refreshProfile: refrescarPerfil }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) 
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    return context;
}
