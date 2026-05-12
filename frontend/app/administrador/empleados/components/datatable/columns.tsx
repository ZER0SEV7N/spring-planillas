"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit2, Lock, Unlock, MoreHorizontal } from "lucide-react"


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

export const getColumns = (cambiarEstado: (id: number) => void): ColumnDef<Empleado>[] => [
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
    id: "actions",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => {
      const emp = row.original

      return (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-600">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-slate-400 hover:text-red-600"
            onClick={() => cambiarEstado(emp.idusuario)}
          >
            {emp.estado ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
          </Button>
        </div>
      )
    },
  },
]