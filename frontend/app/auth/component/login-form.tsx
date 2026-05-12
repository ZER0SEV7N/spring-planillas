import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, Lock, Eye } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useLogin } from "../hook/login"

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    error, 
    isLoading, 
    handleLogin 
  } = useLogin();

  return (
    <form onSubmit={handleLogin} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>

        <div className="flex flex-col gap-2 mb-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Bienvenido</h2>
          <p className="text-sm text-muted-foreground">
            Ingrese sus credenciales para acceder al sistema.
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Correo Electrónico o Usuario</FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@empresa.com"
              required
              className="pl-9 bg-background" 
            />
          </div>
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <a
              href="#"
              className="text-xs text-blue-600 font-medium hover:underline"
            >
              Olvidé mi contraseña
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="pl-9 pr-9 bg-background"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </Field>

        <div className="flex items-center space-x-2 py-2">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
          >
            Mantener sesión iniciada
          </label>
        </div>

        <Field>
          <Button 
            className="w-full bg-[#1111A6] hover:bg-[#0B0B8A] text-white flex justify-center items-center gap-2" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </Field>

        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      </FieldGroup>
    </form>
  )
}
