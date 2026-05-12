"use client"

import { LoginForm } from "./component/login-form"
import { Building2, Headphones } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-[#0A0A9C] text-white p-12">
        
        {/* Header Izquierdo */}
        <div className="flex items-center gap-3 font-semibold text-lg">
          <Building2 className="w-6 h-6" />
          <span>Gestor de planillas</span>
        </div>

        {/* Centro Izquierdo */}
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Gestión eficiente para<br />empresas modernas.
          </h1>
          <p className="text-blue-200 text-sm">
            Acceda a su panel de control para administrar nóminas, 
            directorios de empleados y reportes de cumplimiento con 
            precisión y seguridad.
          </p>
        </div>

        {/* Footer Izquierdo */}
        <div className="text-xs text-blue-400 font-medium tracking-wider">
          Todos los derechos reservados a mi ZER0SEV7N. Este producto es una demostracion y no debe ser utilizado en producción sin las adecuadas medidas de seguridad y cumplimiento normativo.
        </div>
      </div>

      {/* Columna Derecha: Contenedor del Formulario */}
      <div className="flex flex-col items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-[400px]">
          <LoginForm />
          
          {/* Footer del Formulario */}
          <div className="mt-8 flex justify-center items-center gap-2 text-xs text-muted-foreground">
            <Headphones className="w-4 h-4" />
            <a href="#" className="hover:underline hover:text-primary">
              ¿Necesita ayuda? Contacte a soporte técnico
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
