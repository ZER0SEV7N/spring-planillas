/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { useEmpleado } from "./hooks/useEmpleado"
import { DataTable } from "./components/datatable/datatable"
import { getColumns } from "./components/datatable/columns"
import { AddEmpleadoModal } from "./components/addEmpleadoModal"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function EmpleadosPage() {
    const { empleados, cargos, areas, jornadas, isLoading, cambiarEstado, recargarEmpleados } = useEmpleado();
    const [searchTerm, setSearchTerm] = useState("");
    const [cargoFilter, setCargoFilter] = useState("");
    const [estadoFilter, setEstadoFilter] = useState("");

    const estados = [
        { idestado: 1, estado: 'Activo' },
        { idestado: 0, estado: 'Cesado' }
    ];

    if (isLoading) return <div className="p-8 text-slate-500">Cargando directorio de empleados...</div>;

    const data = (Array.isArray(empleados) ? empleados : []).filter((emp: any) => {
        const term = searchTerm.toLowerCase();
        const matchesSearch = 
            (emp.nombre || "").toLowerCase().includes(term) ||
            (emp.apellido || "").toLowerCase().includes(term) ||
            String(emp.documento || "").includes(term);

        const matchesCargo = cargoFilter === "" || String(emp.cargos?.idcargo) === cargoFilter;

        const isActivo = emp.estado === true || emp.estado === 1 || emp.estado === "true";
        const empEstadoStr = isActivo ? "1" : "0";
        
        const matchesEstado = estadoFilter === "" || empEstadoStr === estadoFilter;

        return matchesSearch && matchesCargo && matchesEstado;
    });

    const columns = getColumns(cambiarEstado, cargos, areas, jornadas, recargarEmpleados);

    return (
    <div className="flex flex-col gap-6">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
                placeholder="Buscar por nombre o DNI..." 
                className="pl-9 bg-slate-50 border-slate-200" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>

            {/* Filtro por cargo */}
            <div className="w-[200px]">
            <Select value={cargoFilter} onValueChange={(v) => setCargoFilter(v === "todos" ? "" : v)}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-600">
                <SelectValue placeholder="Filtrar por cargo" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="todos">Todos los cargos</SelectItem>
                {(Array.isArray(cargos) ? cargos : []).map((c: any) => (
                    <SelectItem key={c.idcargo} value={c.idcargo.toString()}>{c.cargo}</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

            {/* Filtro por estado */}
            <div className="w-[200px]">
            <Select value={estadoFilter} onValueChange={(v) => setEstadoFilter(v === "todos" ? "" : v)}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-600">
                <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                {(Array.isArray(estados) ? estados : []).map((e: any) => (
                    <SelectItem key={e.idestado} value={e.idestado.toString()}>{e.estado}</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

            <AddEmpleadoModal cargos={cargos} areas={areas} jornadas={jornadas} onEmpleadoAñadido={recargarEmpleados} />
        </div>

        <DataTable columns={columns} data={data} />
    </div>
  )
}