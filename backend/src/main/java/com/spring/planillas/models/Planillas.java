package com.spring.planillas.models;

import jakarta.persistence.*;

@Entity
@Table(name = "planillas")
public class Planillas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idplanilla;

    @ManyToOne
    @JoinColumn(name = "idusuario", nullable = false)
    private Usuarios usuario;

    @ManyToOne
    @JoinColumn(name = "idcargo", nullable = false)
    private Cargos cargo;

    @ManyToOne
    @JoinColumn(name = "idrol", nullable = false)
    private Roles rol;

    @Column(nullable = false, name = "mes")
    private String mes;

    @Column(nullable = false, name = "year")
    private Integer year;

    @Column(nullable = false, name = "bonificacion")
    private Double bonificacion;

    @Column(nullable = false, name = "descuento")
    private Double descuento;

    @Column(nullable = false, name = "total")
    private Double total;

    public Integer getIdplanilla() {
        return idplanilla;
    }

    public void setIdplanilla(Integer idplanilla) {
        this.idplanilla = idplanilla;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }

    public Cargos getCargo() {
        return cargo;
    }

    public void setCargo(Cargos cargo) {
        this.cargo = cargo;
    }

    public Roles getRol() {
        return rol;
    }

    public void setRol(Roles rol) {
        this.rol = rol;
    }

    public String getMes() {
        return mes;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Double getBonificacion() {
        return bonificacion;
    }

    public void setBonificacion(Double bonificacion) {
        this.bonificacion = bonificacion;
    }

    public Double getDescuento() {
        return descuento;
    }

    public void setDescuento(Double descuento) {
        this.descuento = descuento;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    
}
