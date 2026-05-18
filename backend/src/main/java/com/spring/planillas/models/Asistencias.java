package com.spring.planillas.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "asistencias")
@Data
public class Asistencias {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAsistencia;

    @ManyToOne
    @JoinColumn(name = "idusuario", nullable = false)
    private Usuarios usuario;

    @Column(nullable = false, name = "fecha")
    private LocalDateTime fecha;

    @Column(nullable = false, name = "estado_asistencia", columnDefinition = "ENUM('Presente', 'Ausente', 'Tardanza', 'Vacaciones', 'Permiso') DEFAULT 'Tardanza'")
    private String estadoAsistencia;
}
