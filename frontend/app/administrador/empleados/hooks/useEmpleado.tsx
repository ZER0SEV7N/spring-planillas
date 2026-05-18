/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import api from '@/lib/config'

export const useEmpleado = () => {
    const [empleados, setEmpleados] = useState<any[]>([]);
    const [cargos, setCargos] = useState<any[]>([]);
    const [areas, setAreas] = useState<any[]>([]);
    const [jornadas, setJornadas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    //Carga inicial de empleados y cargos
    const fetchDatos = async () => {
        setIsLoading(true);
        try{
            const [resEmpleados, resCargos, resAreas, resJornadas] = await Promise.all([
                api.get('/empleados/buscar'),
                api.get('/cargos'),
                api.get('/areas'),
                api.get('/jornadas')
            ]);

            setEmpleados(resEmpleados.data.data);
            setCargos(resCargos.data.data);
            setAreas(resAreas.data.data);       
            setJornadas(resJornadas.data.data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
        areas,
        jornadas,
        isLoading,
        cambiarEstado,
        recargarEmpleados: fetchDatos
    };
}