/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import api from "@/lib/config";

export function AddEmpleadoModal({ cargos, areas, jornadas, onEmpleadoAñadido }: { 
    cargos: any[], areas: any[], jornadas: any[], onEmpleadoAñadido: () => void 
}) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    //Estado inicial actualizado con los nuevos campos
    const initialState = {
        nombre: "",
        apellido: "",
        documento: "",
        email: "",
        password: "",
        roles: { idrol: 4 }, 
        cargos: { idcargo: cargos?.[0]?.idcargo || 1 },
        areas: { idarea: areas?.[0]?.idarea || 1 },
        jornadasLaborales: { idjornada: jornadas?.[0]?.idjornada || 1 },
        sistemaPension: "AFP", 
        estado: true
    };

    const [formData, setFormData] = useState(initialState);

    //Manejador de envío del formulario
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post("/auth/registrar", formData);
            setOpen(false);
            onEmpleadoAñadido();
            setFormData(initialState);   
        } catch (error) {
            console.error("Error al añadir empleado:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1111A6] hover:bg-[#0B0B8A] text-white">+ Añadir Empleado</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Empleado</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          
          {/* Datos Personales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Apellido</Label>
              <Input required value={formData.apellido} onChange={e => setFormData({...formData, apellido: e.target.value})} />
            </div>
          </div>

          {/* Documento y Correo */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>DNI / Documento</Label>
              <Input required maxLength={11} value={formData.documento} onChange={e => setFormData({...formData, documento: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Correo Electrónico</Label>
              <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          {/* Empresa (Cargo y Área) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cargo</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.cargos.idcargo} onChange={e => setFormData({...formData, cargos: { idcargo: Number(e.target.value) }})}>
                {cargos?.map(c => <option key={c.idcargo} value={c.idcargo}>{c.cargo}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Área</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.areas.idarea} onChange={e => setFormData({...formData, areas: { idarea: Number(e.target.value) }})}>
                {areas?.map(a => <option key={a.idarea} value={a.idarea}>{a.nombreArea || a.area}</option>)}
              </select>
            </div>
          </div>

          {/* Planilla y Jornada */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Jornada Laboral</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.jornadasLaborales.idjornada} onChange={e => setFormData({...formData, jornadasLaborales: { idjornada: Number(e.target.value) }})}>
                {jornadas?.map(j => <option key={j.idjornada} value={j.idjornada}>{j.nombre}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Sistema de Pensión</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.sistemaPension} onChange={e => setFormData({...formData, sistemaPension: e.target.value})}>
                <option value="AFP">AFP</option>
                <option value="ONP">ONP</option>
              </select>
            </div>
          </div>

          {/* Rol y Contraseña */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Rol de Sistema</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.roles.idrol} onChange={e => setFormData({...formData, roles: { idrol: Number(e.target.value) }})}>
                <option value={1}>Administrador</option>
                <option value={2}>RRHH</option>
                <option value={3}>Contabilidad</option>
                <option value={4}>Empleado</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Contraseña Inicial</Label>
              <Input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="mt-2 w-full bg-[#1111A6] hover:bg-[#0B0B8A] text-white">
            {isLoading ? "Guardando..." : "Registrar Empleado"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}