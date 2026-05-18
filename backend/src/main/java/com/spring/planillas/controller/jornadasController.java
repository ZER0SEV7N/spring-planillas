package com.spring.planillas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.planillas.models.JornadasLaborales;
import com.spring.planillas.models.payload.response;
import com.spring.planillas.services.jornadasServices;

@RestController
@RequestMapping("/api/jornadas")
public class jornadasController {

    @Autowired
    private jornadasServices jornadasServices;

    @GetMapping("")
    public ResponseEntity<response<List<JornadasLaborales>>> obtenerTodasJornadas() {
        List<JornadasLaborales> jornadas = jornadasServices.getAllJornadas();
        return ResponseEntity.status(200).body(new response<>(true, "Jornadas Laborales obtenidas exitosamente", jornadas));
    }

    
}
