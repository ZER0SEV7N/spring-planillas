import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/config";
import { useAuth } from "@/context/context";

export const useLogin = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try{
            const res = await api.post('/auth/login', { email, password });
            const token = res.data.data.token || res.data.token;
            login(token);
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        isLoading,
        handleLogin
    };
};

export const useRegister = () => {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const formData = {
        nombre: "",
        apellido: "",
        documento: "",
        email: "",
        password: "",
        rol: "Empleado",
        cargo: "",
    };

    const handleRegister = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await api.post('/auth/register', formData);
            const token = res.data.data.token || res.data.token;
            login(token);
        } catch (err) {
            setError("Error registering user");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        formData,
        handleRegister
    };
};
