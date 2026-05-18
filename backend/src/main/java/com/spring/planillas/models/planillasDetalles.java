package com.spring.planillas.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "planillasdetalles")
@Data
public class planillasDetalles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer iddetalle;

    @ManyToOne
    @JoinColumn(name = "idplanilla", nullable = false)
    private Planillas planilla;

    @Column(nullable = false, name = "tipo_concepto", columnDefinition = "ENUM('INGRESO', 'DESCUENTO', 'APORTE_EMPLEADOR')")
    private String tipoConcepto;

    @Column(nullable = false, name = "concepto", length = 100)
    private String concepto;

    @Column(nullable = false, name = "monto")
    private Double monto;
}
