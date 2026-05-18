package com.spring.planillas.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "cargos")
@Data
public class Cargos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idcargo;

    @Column(nullable = false, name = "cargo")
    private String cargo;
    
    @Column(nullable = false, name = "salario", precision = 10, scale = 2)
    private Double salario;

}
