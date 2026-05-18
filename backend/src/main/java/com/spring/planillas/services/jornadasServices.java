package com.spring.planillas.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.planillas.models.JornadasLaborales;
import com.spring.planillas.repository.jornadasLaboralesRepository;

//Services para jornadas laborales
@Service
public class jornadasServices {

    @Autowired
    private jornadasLaboralesRepository jornadasLaboralesRepository;

    public List<JornadasLaborales> getAllJornadas() {
        return jornadasLaboralesRepository.findAll();
    }

    public JornadasLaborales getJornadaById(Integer id) {
        return jornadasLaboralesRepository.findById(id).orElse(null);
    }

    public JornadasLaborales createJornada(JornadasLaborales jornada) {
        return jornadasLaboralesRepository.save(jornada);
    }

}
