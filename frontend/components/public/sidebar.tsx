"use client"
import Link from "next/link"
import {
 LayoutDashboard, 
  Users, 
  Calculator, 
  FileBarChart, 
  Settings 
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const items = [
  { title: "Dashboard", url: "/administrador/dashboard", icon: LayoutDashboard },
  { title: "Empleados", url: "/administrador/empleados", icon: Users },
  { title: "Procesamiento de Nómina", url: "/administrador/procesos", icon: Calculator },
  { title: "Reportes", url: "/administrador/reportes", icon: FileBarChart },
  { title: "Configuración", url: "/administrador/configuracion", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
    return (
    <Sidebar className="border-r-0 bg-[#0A0A9C] text-white">
      {/* Logo y Título */}
      <SidebarHeader className="px-6 py-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white/20 rounded text-sm flex items-center justify-center font-bold mr-3 text-white">
            HR
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide text-white">Gestor de planillas</span>
            <span className="text-xs text-blue-300">HR ADMIN</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Navegación */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`transition-colors hover:bg-white/10 hover:text-white ${
                        isActive ? "bg-white/15 text-white font-medium" : "text-blue-200"
                      }`}
                    >
                      <Link href={item.url} className="flex items-center gap-3 px-3 py-5 rounded-lg">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}