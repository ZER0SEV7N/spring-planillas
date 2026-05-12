drop database if exists planillas;
create database if not exists planillas ;

use planillas;

create table roles(
    idrol int auto_increment primary key,
    rol char(50) not null
);

create table cargos(
    idcargo int auto_increment primary key,
    cargo char(50) not null,
    salario decimal(10,2) not null
);

create table usuarios(
    idusuario int auto_increment primary key,
    nombre char(50) not null,
    apellido char(50) not null,
    email char(50) unique,
    documento char(11) unique,
    password varchar(255) not null,
    idrol int references roles(idrol),
    idcargo int references cargos(idcargo),
    estado boolean not null default true
);

create table planillas(
    idplanilla int auto_increment primary key,
    idusuario int references usuarios(idusuario),
    idcargo int references cargos(idcargo),
    mes char(20) not null,
    year int not null,
    bonificacion decimal(10,2) not null,
    descuento decimal(10,2) not null,
    total decimal(10,2) not null
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

-- Insertar usuarios de ejemplo con contraseñas encriptadas (La contraseña es: 123456)
insert usuarios (nombre, apellido, email, documento, password, idrol, idcargo) values
('Juan', 'Pérez', 'juan.perez@example.com', '12345678901', '$2a$10$/PseeBzOuCTVY4XxnaS1zeAvt7NLNdwd3RuXNbeNRvZEynQuPE0.y', 1, 1),
('María', 'Gómez', 'maria.gomez@example.com', '12345678902', '$2a$10$/PseeBzOuCTVY4XxnaS1zeAvt7NLNdwd3RuXNbeNRvZEynQuPE0.y', 4, 4);