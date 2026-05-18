package com.spring.planillas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.planillas.models.Areas;
import com.spring.planillas.models.payload.response;
import com.spring.planillas.services.areaServices;

@RestController
@RequestMapping("/api/areas")
public class areasController {

    @Autowired
    private areaServices areaServices;

    @GetMapping("")
    public ResponseEntity<response<List<Areas>>> obtenerTodasAreas() {
        List<Areas> areas = areaServices.getAllAreas();
        return ResponseEntity.status(200).body(new response<>(true, "Áreas obtenidas exitosamente", areas));
    }
    
}
