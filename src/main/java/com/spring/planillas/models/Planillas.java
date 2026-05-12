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
    private Integer idusuario;

    @ManyToOne
    @JoinColumn(name = "idcargo", nullable = false)
    private Integer idcargo;

    @ManyToOne
    @JoinColumn(name = "idrol", nullable = false)
    private Integer idrol;

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

    public Integer getIdusuario() {
        return idusuario;
    }

    public void setIdusuario(Integer idusuario) {
        this.idusuario = idusuario;
    }

    public Integer getIdcargo() {
        return idcargo;
    }

    public void setIdcargo(Integer idcargo) {
        this.idcargo = idcargo;
    }

    public Integer getIdrol() {
        return idrol;
    }

    public void setIdrol(Integer idrol) {
        this.idrol = idrol;
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
