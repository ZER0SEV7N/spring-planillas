package com.spring.planillas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.planillas.models.Areas;

@Repository
public interface areasRepository extends JpaRepository<Areas, Integer> {
    
}
