import Link from "next/link"
import {
 LayoutDashboard, 
  Users, 
  Calculator, 
  FileBarChart, 
  Settings 
} from "lucide-react"

export function Sidebar() {
    return (
    <aside className="w-64 bg-[#0A0A9C] text-white flex flex-col fixed h-screen top-0 left-0">
      {/* Logo y Título */}
      <div className="h-16 flex items-center px-6 mb-4 mt-2">
        <div className="w-8 h-8 bg-white/20 rounded text-sm flex items-center justify-center font-bold mr-3">
          HR
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-wide">Gestor de planillas</h1>
          <p className="text-xs text-blue-300">HR ADMIN</p>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 bg-white/10 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Link href="/empleados" className="flex items-center gap-3 hover:bg-white/5 px-3 py-2.5 rounded-lg text-sm text-blue-200 hover:text-white transition-colors">
          <Users className="w-4 h-4" />
          Empleados
        </Link>
        <Link href="/procesos" className="flex items-center gap-3 hover:bg-white/5 px-3 py-2.5 rounded-lg text-sm text-blue-200 hover:text-white transition-colors">
          <Calculator className="w-4 h-4" />
          Procesamiento de Nómina
        </Link>
        <Link href="/reportes" className="flex items-center gap-3 hover:bg-white/5 px-3 py-2.5 rounded-lg text-sm text-blue-200 hover:text-white transition-colors">
          <FileBarChart className="w-4 h-4" />
          Reportes
        </Link>
        <Link href="/configuracion" className="flex items-center gap-3 hover:bg-white/5 px-3 py-2.5 rounded-lg text-sm text-blue-200 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
          Configuracion
        </Link>
      </nav>
    </aside>
    )
}