package com.spring.planillas.models;

import jakarta.persistence.*;

@Entity
@Table(name = "cargos")
public class Cargos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idcargo;

    @Column(nullable = false, name = "cargo")
    private String cargo;
    
    @Column(nullable = false, name = "salario")
    private Double salario;

    public Integer getIdcargo() {
        return idcargo;
    }

    public void setIdcargo(Integer idcargo) {
        this.idcargo = idcargo;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Double getSalario() {
        return salario;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    
}
