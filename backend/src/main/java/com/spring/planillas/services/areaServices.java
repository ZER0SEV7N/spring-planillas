package com.spring.planillas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.planillas.models.Areas;
import com.spring.planillas.repository.areasRepository;

@Service
public class areaServices {

    @Autowired
    private areasRepository areasRepository;

    //Metodo para obtener todas las areas
    public List<Areas> getAllAreas(){
        return areasRepository.findAll();
    }

    //Metodo para obtener un area por su id
    public Areas getAreaById(Integer id){
        return areasRepository.findById(id).orElse(null);
    }

    //Metodo para crear un nuevo area
    public Areas createArea(Areas area){
        return areasRepository.save(area);
    }

    //Metodo para actualizar un area existente
    public Areas updateArea(Integer id, Areas areaDetails){
        Optional<Areas> areaOptional = areasRepository.findById(id);
        if(areaOptional.isPresent()){
            Areas area = areaOptional.get();
            area.setNombre(areaDetails.getNombre());
            return areasRepository.save(area);
        } else 
            return null;
    }

    //Metodo para eliminar un area por su id
    public boolean deleteArea(Integer id){
        if(areasRepository.existsById(id)){
            areasRepository.deleteById(id);
            return true;
        } else 
            return false;
    }
}
