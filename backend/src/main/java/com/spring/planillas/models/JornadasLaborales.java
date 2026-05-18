package com.spring.planillas.models;

import java.time.LocalTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "jornadas_laborales")
@Data
public class JornadasLaborales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idJornada;

    @Column(nullable = false, name = "nombre")
    private String nombre;

    @Column(nullable = false, name = "horas_semanales")
    private Integer horasSemanales;

    @Column(nullable = true, name = "hora_ingreso")
    private LocalTime horaIngreso;

    @Column(nullable = true, name = "hora_salida")
    private LocalTime horaSalida;

    @Column(nullable = true, name = "rotativo")
    private Boolean rotativo = false;
}
