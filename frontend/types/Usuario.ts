export interface Usuario {
    idUsuario: number;
    nombre: string;
    apellido: string;
    email: string;
    documento: string;
    password: string;
    rol: 'Administrador' | 'RRHH' | 'Contabilidad' | 'Empleado';
    cargo: string;
}