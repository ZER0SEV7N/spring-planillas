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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false); // Útil para mostrar un mensaje de éxito

    // 1. Ahora formData es un estado de React
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        documento: "",
        email: "",
        password: "",
        rol: "Empleado", // Ojo: Asegúrate de que el backend pueda mapear este string a la Entidad Roles
        cargo: "",
    });

    // Función para actualizar el estado cuando el usuario escribe en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setIsLoading(true);

        try {
            // 2. Corregido el endpoint a /registrar
            const res = await api.post('/auth/registrar', formData);
            
            // 3. Ya no buscamos un token, solo confirmamos el éxito
            if (res.data.status) {
                setSuccess(true);
                // Opcional: Limpiar el formulario después de un registro exitoso
                setFormData({
                    nombre: "", apellido: "", documento: "", 
                    email: "", password: "", rol: "Empleado", cargo: ""
                });
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Error al registrar el usuario");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        formData,
        handleChange, 
        handleRegister,
        isLoading,
        error,
        success
    };
};
