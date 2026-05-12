package com.spring.planillas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.planillas.models.Roles;

@Repository
public interface rolesRepository extends JpaRepository<Roles, Integer> {
    Roles findByRol(String rol);
}
