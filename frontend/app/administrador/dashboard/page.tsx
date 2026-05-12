import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Users, Clock, FileText } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Cabecera */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-sm text-slate-500">Estado actual de la nómina y procesos</p>
      </div>

      {/* Tarjetas de Métricas (Grid de 4 columnas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Tarjeta 1 */}
        <Card className="shadow-sm border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Total Nómina</CardTitle>
            <Calculator className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">S/ 125,400.00</div>
            <p className="text-xs text-emerald-500 font-medium mt-1 bg-emerald-50 w-max px-2 py-0.5 rounded">
              +2.4% <span className="text-slate-400 font-normal">vs ultimo periodo</span>
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta 2 */}
        <Card className="shadow-sm border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Total Empleados</CardTitle>
            <Users className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">458</div>
            <p className="text-xs text-slate-400 mt-1">Empleados activos</p>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
      </div>
    </div>
  )
}