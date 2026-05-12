"use client"
import { useEmpleado } from "./hooks/useEmpleado"
import { AddEmpleadoModal } from "./components/addEmpleadoModal"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, Edit2, Lock, Unlock } from "lucide-react"

export default function EmpleadosPage() {
  const { empleados, cargos, isLoading, cambiarEstado, recargarEmpleados } = useEmpleado();

  if (isLoading) return <div className="p-8 text-slate-500">Cargando directorio de empleados...</div>;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Controles de Filtro y Botón */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar nombre, código, área..." className="pl-9 bg-slate-50 border-slate-200" />

            {}

        </div>
        
        <div className="flex items-center gap-3">
          {/* Aquí puedes agregar selects adicionales para filtros en el futuro */}
          <AddEmpleadoModal cargos={cargos} onEmpleadoAñadido={recargarEmpleados} />
        </div>
      </div>

      {/* Tabla Principal */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Empleado</th>
              <th className="px-6 py-4 font-semibold">Código (DNI)</th>
              <th className="px-6 py-4 font-semibold">Rol</th>
              <th className="px-6 py-4 font-semibold">Cargo</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {empleados.map((emp: any) => (
              <tr key={emp.idusuario} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3 flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.nombre}`} />
                    <AvatarFallback>{emp.nombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-slate-900">{emp.nombre} {emp.apellido}</span>
                </td>
                <td className="px-6 py-3 text-slate-500">{emp.documento}</td>
                <td className="px-6 py-3 text-slate-500">{emp.roles?.rol}</td>
                <td className="px-6 py-3 text-slate-500">{emp.cargos?.cargo}</td>
                <td className="px-6 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 w-max
                    ${emp.estado 
                      ? "bg-blue-50 text-blue-700 border-blue-200" 
                      : "bg-red-50 text-red-700 border-red-200"}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${emp.estado ? "bg-blue-600" : "bg-red-600"}`}></span>
                    {emp.estado ? "Activo" : "Cesado"}
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-400">
                    <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                    
                    {/* Botón dinámico para bloquear/desbloquear */}
                    <button 
                      onClick={() => cambiarEstado(emp.idusuario)}
                      className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title={emp.estado ? "Desactivar empleado" : "Activar empleado"}
                    >
                      {emp.estado ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}