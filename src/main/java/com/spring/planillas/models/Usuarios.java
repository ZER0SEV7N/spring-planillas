package com.spring.planillas.models;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
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

    @Column(nullable = false, name = "password")
    private String password;

    @Column(nullable = false, name = "documento", length = 11, unique = true)
    private String documento;

    @ManyToOne
    @JoinColumn(name = "idrol", nullable = false)
    private Roles roles;

    @ManyToOne
    @JoinColumn(name = "idcargo", nullable = false)
    private Cargos cargos;

    @Column(nullable = false, name = "estado")
    private Boolean estado;

    public Integer getIdusuario() {
        return idusuario;
    }

    public void setIdusuario(Integer idusuario) {
        this.idusuario = idusuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }


    public Roles getRoles() {
        return roles;
    }

    public void setRoles(Roles roles) {
        this.roles = roles;
    }

    public Cargos getCargos() {
        return cargos;
    }

    public void setCargos(Cargos cargos) {
        this.cargos = cargos;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    
}
