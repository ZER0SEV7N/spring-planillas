package com.spring.planillas.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "planillas")
@Data
public class Planillas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idplanilla;

    @ManyToOne
    @JoinColumn(name = "idusuario", nullable = false)
    private Usuarios usuario;

    @Column(nullable = false, name = "mes", length = 2)
    private String mes;

    @Column(nullable = false, name = "year", length = 4)
    private String year;

    @Column(nullable = false, name = "salario_base", precision = 10, scale = 2)
    private Double salarioBase;

    @Column(nullable = false, name = "total_ingresos", precision = 10, scale = 2)
    private Double totalIngresos;

    @Column(nullable = false, name = "total_descuentos", precision = 10, scale = 2)
    private Double totalDescuentos;

    @Column(nullable = false, name = "monto_neto", precision = 10, scale = 2)
    private Double montoNeto;

    @Column(name = "fecha_emision", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private String fechaEmision;
    
}
