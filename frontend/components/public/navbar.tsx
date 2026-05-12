"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, LogOut, User as UserIcon } from "lucide-react"
import { useAuth } from "@/context/context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from "react"

export function Navbar() {
  const { user, logout } = useAuth();

  useEffect(() => { console.log("Usuario actual en Navbar:", user); }, [user]);
  return (
    
    <header className="h-16 border-b bg-white flex items-center justify-end px-8 sticky top-0 z-10">

      <div className="flex items-center gap-4">

        {/* Campana de Notificaciones */}
        <button className="relative p-2 text-muted-foreground hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Dropdown del Usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:bg-slate-50 p-1 pr-3 rounded-full transition-colors outline-none border border-transparent hover:border-slate-200">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src={(user as any)?.avatarUrl || "https://github.com/shadcn.png"} alt="Usuario" />
                <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-xs">
                  {user?.nombre?.charAt(0) || "U"}
                  {user?.apellido?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-sm font-semibold text-slate-700 leading-none">
                  {user?.nombre} {user?.apellido}
                </span>
                <span className="text-xs text-slate-500 mt-1 leading-none">
                  {user?.rol || "Usuario"}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          {/* Contenido del menú desplegable */}
          <DropdownMenuContent align="end" className="w-56 mt-1">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.nombre} {user?.apellido}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
            {/* Botón de Cerrar Sesión conectado a tu función logout */}
            <DropdownMenuItem 
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" 
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}