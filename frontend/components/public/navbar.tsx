"use client"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/context/context"

export function Navbar() {
    const { user, logout } = useAuth();

    return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-10">

      {/* Acciones de Usuario */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Avatar del Usuario */}
        <Avatar className="w-8 h-8 cursor-pointer border">
          <AvatarImage src={(user as any)?.avatarUrl || "https://github.com/shadcn.png"} alt="Usuario" />
          {/* Fallback con las iniciales si no hay foto */}
          <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-xs">
            {user?.nombre?.charAt(0) || "U"}
            {user?.apellido?.charAt(0) || ""}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}