import { useState, useEffect } from 'react';
import api from '@/lib/config'

export const useEmpleado = () => {
    const [empleados, setEmpleados] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDatos = async () => {
        setIsLoading(true);
        try{
            const [empleadosRes, cargosRes] = await Promise.all([
                api.get('/empleados'),
                api.get('/cargos')
            ]);
            setEmpleados(empleadosRes.data);
            setCargos(cargosRes.data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDatos();
    }, []);

    const cambiarEstado = async (id: number) => {
        try{
            await api.patch(`/empleados/${id}/cambiar-estado`);
            fetchDatos();
        } catch (error) {
            console.error('Error al cambiar el estado del empleado:', error);
        }
    }

    return {
        empleados,
        cargos,
        isLoading,
        cambiarEstado,
        recargarEmpleados: fetchDatos
    };
}