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

export function AddEmpleadoModal({ cargos, onEmpleadoAñadido }: { cargos: any[], onEmpleadoAñadido: () => void }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        documento: "",
        email: "",
        password: "",
        roles: { idrol: 4 }, 
        cargos: { idcargo: 1 } 
    });

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            await api.post("/auth/registrar", formData);
            setOpen(false);
            onEmpleadoAñadido();
            setFormData({ ...formData, nombre: "", apellido: "", documento: "", email: "", password: "" });   
        } catch (error) {
            console.error("Error al añadir empleado:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1111A6] hover:bg-[#0B0B8A] text-white">
          + Añadir Empleado
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Empleado</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>DNI / Documento</Label>
              <Input required maxLength={11} value={formData.documento} onChange={e => setFormData({...formData, documento: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Contraseña Inicial</Label>
              <Input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Correo Electrónico</Label>
            <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Rol en el Sistema</Label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.roles.idrol}
                onChange={e => setFormData({...formData, roles: { idrol: Number(e.target.value) }})}
              >
                <option value={1}>Administrador</option>
                <option value={2}>RRHH</option>
                <option value={3}>Contabilidad</option>
                <option value={4}>Empleado</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Cargo</Label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.cargos.idcargo}
                onChange={e => setFormData({...formData, cargos: { idcargo: Number(e.target.value) }})}
              >
                {cargos.map(cargo => (
                  <option key={cargo.idcargo} value={cargo.idcargo}>{cargo.cargo}</option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="mt-4 w-full bg-[#1111A6] hover:bg-[#0B0B8A] text-white">
            {isLoading ? "Guardando..." : "Registrar Empleado"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}