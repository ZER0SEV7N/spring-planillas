/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/config"

export default function viewEmpleadosModal({ empleado, isOpen, setIsOpen, cargos, areas, jornadas, onUpdate }: {
    empleado: any, isOpen: boolean, setIsOpen: (val: boolean) => void,
    cargos: any[], areas: any[], jornadas: any[], onUpdate: () => void 
}) {
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        documento: "",
        email: "",
        password: "",
        roles: { idrol: 4},
        cargos: { idCargo: 1},
        areas: { idArea: 1},
        jornadasLaborales: { idJornada: 1},
        sistemaPension: "AFP",
        estado: true        
    });

    useEffect(() => {
        if(empleado && isOpen){
            setFormData({
                nombre: empleado.nombre || "",
                apellido: empleado.apellido || "",
                documento: empleado.documento || "",
                email: empleado.email || "",
                password: "",
                roles: { idrol: empleado.roles?.idrol || 4 },
                cargos: { idCargo: empleado.cargos?.idcargo || empleado.cargos?.idCargo || 1 },
                areas: { idArea: empleado.areas?.idarea || empleado.areas?.idArea || 1 },
                jornadasLaborales: { idJornada: empleado.jornadasLaborales?.idJornada || empleado.jornadasLaborales?.idjornada || 1 },
                sistemaPension: empleado.sistemaPension || "AFP",
                estado: empleado.estado !== undefined ? empleado.estado : true
            });
        }
    }, [empleado, isOpen]);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const empleadoId = empleado.idUsuario || empleado.idusuario || empleado.id;
            
            if (!empleadoId) {
                console.error("No se encontró el ID del empleado:", empleado);
                alert("Error: No se pudo identificar al empleado.");
                setIsLoading(false);
                return;
            }

            await api.patch(`/empleados/actualizar/${empleadoId}`, formData);
            
            setIsOpen(false);
            onUpdate();
        } catch (error) {
            console.error("Error actualizando empleado:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Detalles y Edición de Empleado</DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Formulario para editar la información del empleado.
                </DialogDescription>
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
                        <Label>Correo Electrónico</Label>
                    <   Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Cargo</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.cargos.idCargo} onChange={e => setFormData({...formData, cargos: { idCargo: Number(e.target.value) }})}>
                            {cargos?.map((c, index) => (
                                <option key={`cargo-${c.idcargo || c.idCargo || index}`} value={c.idcargo || c.idCargo}>
                                    {c.cargo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>Área</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.areas.idArea} onChange={e => setFormData({...formData, areas: { idArea: Number(e.target.value) }})}>
                            {areas?.map((a, index) => (
                                <option key={`area-${a.idArea || a.idarea || index}`} value={a.idArea || a.idarea}>
                                    {a.nombre || a.area}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Jornada Laboral</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.jornadasLaborales.idJornada} onChange={e => setFormData({...formData, jornadasLaborales: { idJornada: Number(e.target.value) }})}>
                            {jornadas?.map((j, index) => (
                                <option key={`jornada-${j.idJornada || index}`} value={j.idJornada || index}>
                                    {j.nombre}
                                </option>
                            ))}
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

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Estado del Empleado</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.estado ? "true" : "false"} onChange={e => setFormData({...formData, estado: e.target.value === "true"})}>
                            <option value="true">Activo</option>
                            <option value="false">Cesado / Inactivo</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>Nueva Contraseña (Opcional)</Label>
                        <Input type="password" placeholder="Dejar en blanco para mantener" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                </div>

                <Button type="submit" disabled={isLoading} className="mt-2 w-full bg-[#1111A6] hover:bg-[#0B0B8A] text-white">
                    {isLoading ? "Guardando Cambios..." : "Actualizar Información"}
                </Button>
            </form>
        </DialogContent>
    </Dialog>
    )
}
