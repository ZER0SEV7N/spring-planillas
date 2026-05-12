import { useState, useEffect } from 'react';
import api from '@/lib/config'

export const useEmpleado = () => {
    const [empleados, setEmpleados] = useState<any[]>([]);
    const [cargos, setCargos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    //Carga inicial de empleados y cargos
    const fetchDatos = async () => {
        setIsLoading(true);
        try{
            const [resEmpleados, resCargos] = await Promise.all([
                api.get('/empleados/buscar'),
                api.get('/cargos')
            ]);
            const listaEmpleados = resEmpleados.data.data || resEmpleados.data || [];
            const listaCargos = resCargos.data.data || resCargos.data || [];

            setEmpleados(Array.isArray(listaEmpleados) ? listaEmpleados : []);
            setCargos(Array.isArray(listaCargos) ? listaCargos : []);
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
            await api.patch(`/empleados/cambiar-estado/${id}`);
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