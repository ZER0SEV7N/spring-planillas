package com.spring.planillas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.planillas.models.Cargos;
import com.spring.planillas.repository.cargosRepository;

@Service
public class cargosServices {

    @Autowired
    private cargosRepository cargosRepository;

    //Obtener todos los cargos de la base de datos
    public List<Cargos> getAllCargos() {
        return cargosRepository.findAll();
    }

    //Obtener un cargo por su ID
    public Cargos getCargosById(Integer id) {
        return cargosRepository.findById(id).orElse(null);
    }

    //Crear un nuevo cargo
    public Cargos createCargo(Cargos cargo) {
        return cargosRepository.save(cargo);
    }

    //Actualizar un cargo existente
    public Cargos updateCargo(Integer id, Cargos detalles) {
        Optional<Cargos> cargoOpt = cargosRepository.findById(id);
        
        if(cargoOpt.isPresent()){
            Cargos cargo = cargoOpt.get();
            cargo.setCargo(detalles.getCargo());
            cargo.setSalario(detalles.getSalario());
            return cargosRepository.save(cargo);
        }

        return null;
    }

}
