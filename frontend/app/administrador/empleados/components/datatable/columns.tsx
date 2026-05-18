/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import ViewEmpleadosModal from "../viewEmpleadosModal" // Asegúrate de que el nombre del archivo coincida con la ruta
import { Lock, Edit } from "lucide-react"
import { useState } from "react"

export type Empleado = {
  idusuario: number
  nombre: string
  apellido: string  
  documento: string
  email: string
  estado: boolean
  roles: { rol: string }
  cargos: { cargo: string }
}

//Definición de las columnas para la tabla de empleados
export const getColumns = (
  cambiarEstado: (id: number) => void,
  cargos: any[],
  areas: any[],
  jornadas: any[],
  recargarEmpleados: () => void
): ColumnDef<Empleado>[] => [
  {
    accessorKey: "nombre",
    header: "Empleado",
    cell: ({ row }) => {
      const emp = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.nombre}`} />
            <AvatarFallback>{emp.nombre.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-slate-900">{emp.nombre} {emp.apellido}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "documento",
    header: "DNI / Código",
  },
  {
    accessorKey: "roles.rol",
    header: "Rol",
  },
  {
    accessorKey: "cargos.cargo",
    header: "Cargo",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estado") as boolean
      return (
        <Badge variant={estado ? "outline" : "destructive"} className={estado ? "bg-blue-50 text-blue-700 border-blue-200" : ""}>
          {estado ? "Activo" : "Cesado"}
        </Badge>
      )
    },
  },
  {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => {
          const empleado = row.original;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isModalOpen, setIsModalOpen] = useState(false);

          return (
              <div className="flex items-center gap-3 text-slate-400">
                  {/* Botones de acción */}
                  <button onClick={() => setIsModalOpen(true)} className="hover:text-blue-600 transition-colors" title="Ver / Editar">
                      <Edit className="w-4 h-4" />
                  </button>
                  
                  <button onClick={() => cambiarEstado(empleado.idusuario)} className="hover:text-blue-600 transition-colors" title="Cambiar Estado">
                      <Lock className="w-4 h-4" />
                  </button>

                  {/* El modal se monta aquí, pero solo se ve si isModalOpen es true */}
                    <ViewEmpleadosModal
                      empleado={empleado}
                      isOpen={isModalOpen}
                      setIsOpen={setIsModalOpen}
                      cargos={cargos}
                      areas={areas}
                      jornadas={jornadas}
                      onUpdate={recargarEmpleados}
                    />
              </div>
          );
      },
  }
];