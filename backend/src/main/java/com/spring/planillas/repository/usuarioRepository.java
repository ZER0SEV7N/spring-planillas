package com.spring.planillas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.planillas.models.Usuarios;

@Repository
public interface usuarioRepository extends JpaRepository<Usuarios, Integer> {
    Usuarios findByEmail(String email);
    Usuarios findByDocumento(String documento);
    Usuarios findByNombreAndApellidoIgnoreCase(String nombre, String apellido);
}
