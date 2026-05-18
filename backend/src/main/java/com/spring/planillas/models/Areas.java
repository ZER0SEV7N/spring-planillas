package com.spring.planillas.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "areas")
@Data
public class Areas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idArea;

    @Column(nullable = false, unique = true)
    private String nombre;
}
