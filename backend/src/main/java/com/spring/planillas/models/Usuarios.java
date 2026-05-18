package com.spring.planillas.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "usuarios")
@Data
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idusuario;

    @Column(nullable = false, name = "nombre")
    private String nombre;

    @Column(nullable = false, name = "apellido")
    private String apellido;

    @Column(nullable = false, name = "email", unique = true)
    private String email;

    @Column(nullable = false, name = "documento", length = 11, unique = true)
    private String documento;

    @Column(nullable = false, name = "password")
    private String password;

    @ManyToOne
    @JoinColumn(name = "idrol", nullable = false)
    private Roles roles;

    @ManyToOne
    @JoinColumn(name = "idcargo", nullable = false)
    private Cargos cargos;

    @ManyToOne
    @JoinColumn(name = "idarea", nullable = false)
    private Areas areas;

    @ManyToOne
    @JoinColumn(name = "idjornada", nullable = false)
    private JornadasLaborales jornadasLaborales;

    @Column(nullable = false, name = "sistema_pension", columnDefinition = "ENUM('ONP', 'AFP') NOT NULL")
    private String sistemaPension;

    @Column(nullable = true, name = "cuenta_bancaria", length = 30)
    private String cuentaBancaria;

    @Column(nullable = true, name = "avatar_url", length = 255)
    private String avatarUrl;

    @Column(nullable = false, name = "estado")
    private Boolean estado;
   
}
