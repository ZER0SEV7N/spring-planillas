drop database if exists planillas;
create database if not exists planillas;

use planillas;

CREATE TABLE areas (
    idarea INT AUTO_INCREMENT PRIMARY KEY,
    area char(50) NOT NULL
);

CREATE TABLE roles (
    idrol INT AUTO_INCREMENT PRIMARY KEY,
    rol char(50) NOT NULL
);

CREATE TABLE cargos (
    idcargo INT AUTO_INCREMENT PRIMARY KEY,
    cargo char(50) NOT NULL,
    salario DECIMAL(10,2) NOT NULL
);

CREATE TABLE jornadas_laborales (
    idjornada INT AUTO_INCREMENT PRIMARY KEY,
    nombre char(100) NOT NULL,
    horas_semanales INT NOT NULL,
    hora_ingreso TIME,
    hora_salida TIME,
    rotativo BOOLEAN DEFAULT FALSE
);

CREATE TABLE usuarios (
    idusuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre char(50) NOT NULL,
    apellido char(50) NOT NULL,
    email char(100) UNIQUE,
    documento char(11) UNIQUE,
    password varchar(255) NOT NULL,
    idrol INT NOT NULL references roles(idrol),
    idcargo INT NOT NULL references cargos(idcargo),
    idarea INT references areas(idarea),
    idjornada INT references jornadas_laborales(idjornada),
    sistema_pension Enum('ONP', 'AFP') NOT NULL, 
    cuenta_bancaria char(30),
    avatar_url varchar(255),
    estado BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE asistencias (
    idasistencia INT AUTO_INCREMENT PRIMARY KEY,
    idusuario INT NOT NULL references usuarios(idusuario),
    fecha DATE NOT NULL,
    estado_asistencia Enum('Presente', 'Ausente', 'Tardanza', 'Vacaciones', 'Permiso') NOT NULL default 'Tardanza'
);

CREATE TABLE planillas (
    idplanilla INT AUTO_INCREMENT PRIMARY KEY,
    idusuario INT NOT NULL references usuarios(idusuario),
    mes char(2) NOT NULL, 
    year char(4) NOT NULL,
    salario_base DECIMAL(10,2) NOT NULL, 
    total_ingresos DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_descuentos DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    monto_neto DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Create table planillasdetalles (
    iddetalle INT AUTO_INCREMENT PRIMARY KEY,
    idplanilla INT NOT NULL references planillas(idplanilla),
    tipo_concepto ENUM('INGRESO', 'DESCUENTO', 'APORTE_EMPLEADOR') NOT NULL,
    concepto char(100) NOT NULL,
    monto DECIMAL(10,2) NOT NULL
);

-- Insertar datos de ejemplo
insert roles values
(null, 'Administrador'),
(null, 'RRHH'),
(null, 'Contabilidad'),
(null, 'Empleado');

-- Insertar cargos de ejemplo
insert cargos values
(null, 'Gerente', 5000.00),
(null, 'Analista', 3000.00),
(null, 'Asistente', 2000.00),
(null, 'Oficinista', 1500.00);

-- Insertar áreas de ejemplo
insert areas values
(null, 'Recursos Humanos'),
(null, 'Contabilidad'),
(null, 'Ventas'),
(null, 'Operaciones'),
(null, 'TI'),
(null, 'Finanzas'),
(null, 'Marketing');

-- Insertar jornadas laborales de ejemplo
insert jornadas_laborales values
(null, 'Lunes a Viernes 9am-6pm', 40, '09:00:00', '18:00:00', false),
(null, 'Lunes a Viernes 8am-5pm', 40, '08:00:00', '17:00:00', false),
(null, 'Lunes a Viernes 10am-7pm', 40, '10:00:00', '19:00:00', false),
(null, 'Rotativo 6am-2pm / 2pm-10pm', 40, '06:00:00', '14:00:00', true),
(null, 'Rotativo 7am-3pm / 3pm-11pm', 40, '07:00:00', '15:00:00', true);


-- Insertar usuarios de ejemplo con contraseñas encriptadas (La contraseña es: 123456)
insert usuarios (nombre, apellido, email, documento, password, idrol, idcargo) values
('Juan', 'Pérez', 'juan.perez@example.com', '12345678901', '$2a$10$/PseeBzOuCTVY4XxnaS1zeAvt7NLNdwd3RuXNbeNRvZEynQuPE0.y', 1, 1),
('María', 'Gómez', 'maria.gomez@example.com', '12345678902', '$2a$10$/PseeBzOuCTVY4XxnaS1zeAvt7NLNdwd3RuXNbeNRvZEynQuPE0.y', 4, 4);