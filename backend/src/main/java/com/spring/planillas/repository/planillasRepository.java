package com.spring.planillas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.spring.planillas.models.Planillas;

@Repository
public interface planillasRepository extends JpaRepository<Planillas, Integer> {

}
