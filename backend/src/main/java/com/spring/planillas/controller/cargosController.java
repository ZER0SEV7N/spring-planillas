package com.spring.planillas.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.spring.planillas.models.Cargos;
import com.spring.planillas.models.payload.response;
import com.spring.planillas.services.cargosServices;

@RestController
@RequestMapping("/api/cargos")
public class cargosController {

    @Autowired
    private cargosServices cargosServices;

    //Obtener todos los cargos de la base de datos
    @GetMapping("")
    public ResponseEntity<response<List<Cargos>>> obtenerTodos(){
        List<Cargos> cargos = cargosServices.getAllCargos();
        return ResponseEntity.status(200).body(new response<>(true, "Cargos obtenidos exitosamente", cargos));
    }

    //Obtener un cargo por su ID
    @GetMapping("/{id}")
    public ResponseEntity<response<Cargos>> obtenerPorId(@PathVariable Integer id){
        Cargos cargo = cargosServices.getCargosById(id);

        if(cargo == null)
            return ResponseEntity.status(404).body(new response<>(false, "Cargo no encontrado", null));

        return ResponseEntity.status(200).body(new response<>(true, "Cargo obtenido exitosamente", cargo));
    }

    //Crear un nuevo cargo
    @PostMapping("/crear")
    public ResponseEntity<response<Cargos>> crearCargo(@RequestBody Cargos cargo){
        Cargos nuevoCargo = cargosServices.createCargo(cargo);
        
        if(nuevoCargo == null)
            return ResponseEntity.status(400).body(new response<>(false, "No se pudo crear el cargo", null));

        return ResponseEntity.status(201).body(new response<>(true, "Cargo creado exitosamente", nuevoCargo));
    }

    //Actualizar un cargo existente
    @PatchMapping("/actualizar/{id}")
    public ResponseEntity<response<Cargos>> actualizarCargo(@PathVariable Integer id, @RequestBody Cargos detalles){
        Cargos cargoActualizado = cargosServices.updateCargo(id, detalles);
        
        if(cargoActualizado == null)
            return ResponseEntity.status(404).body(new response<>(false, "Cargo no encontrado", null));

        return ResponseEntity.status(200).body(new response<>(true, "Cargo actualizado exitosamente", cargoActualizado));
    }
    
}
