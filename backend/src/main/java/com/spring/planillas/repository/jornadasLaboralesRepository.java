package com.spring.planillas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.planillas.models.JornadasLaborales;

@Repository
public interface jornadasLaboralesRepository extends JpaRepository<JornadasLaborales, Integer> {


}
