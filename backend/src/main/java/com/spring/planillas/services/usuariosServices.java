package com.spring.planillas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.planillas.models.Usuarios;
import com.spring.planillas.repository.usuarioRepository;
import com.spring.planillas.repository.rolesRepository;
import com.spring.planillas.repository.cargosRepository;
import com.spring.planillas.repository.areasRepository;
import com.spring.planillas.repository.jornadasLaboralesRepository;

@Service
public class usuariosServices {
    
    @Autowired
    private usuarioRepository usuarioRepository;
    @Autowired
    private rolesRepository rolesRepository;
    @Autowired
    private cargosRepository cargosRepository;
    @Autowired
    private areasRepository areasRepository;
    @Autowired
    private jornadasLaboralesRepository jornadasLaboralesRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //Obtener todos los usuarios de la base de datos
    public List<Usuarios> getAllUsuarios(){
        return usuarioRepository.findAll();
    }

    //Obtener un usuario por su ID
    public Usuarios getUsuarioById(Integer id){
        return usuarioRepository.findById(id).orElse(null);
    }

    //Obtener un usuario por su nombre y apellido
    public Usuarios getUsuarioByNombreApellido(String nombre, String apellido){
        return usuarioRepository.findByNombreAndApellidoIgnoreCase(nombre, apellido);
    }

    //Obtener un usuario por su cargo
    public List<Usuarios> getUsuariosByCargo(Integer idCargo){
        return usuarioRepository.findAll().stream()
                .filter(u -> u.getCargos() != null && u.getCargos().getIdcargo() == idCargo)
                .toList();
    }

    //Actualizar un usuario existente
    public Optional<Usuarios> updateUsuario(Integer id, Usuarios detalles) {
        return usuarioRepository.findById(id).map(usuario -> {
            
            if (detalles.getNombre() != null) usuario.setNombre(detalles.getNombre());
            if (detalles.getApellido() != null) usuario.setApellido(detalles.getApellido());
            if (detalles.getDocumento() != null) usuario.setDocumento(detalles.getDocumento());
            if (detalles.getEmail() != null) usuario.setEmail(detalles.getEmail());
            if (detalles.getSistemaPension() != null) usuario.setSistemaPension(detalles.getSistemaPension());
            if (detalles.getEstado() != null) usuario.setEstado(detalles.getEstado());

            if (detalles.getRoles() != null && detalles.getRoles().getIdrol() != null)
                usuario.setRoles(detalles.getRoles()); 
            
            if (detalles.getCargos() != null && detalles.getCargos().getIdcargo() != null) 
                usuario.setCargos(detalles.getCargos());
            
            if (detalles.getAreas() != null && detalles.getAreas().getIdArea() != null) 
                usuario.setAreas(detalles.getAreas());
            
            if (detalles.getJornadasLaborales() != null && detalles.getJornadasLaborales().getIdJornada() != null) 
                usuario.setJornadasLaborales(detalles.getJornadasLaborales());

            if (detalles.getPassword() != null && !detalles.getPassword().isEmpty()) 
                usuario.setPassword(passwordEncoder.encode(detalles.getPassword()));
            

            return usuarioRepository.save(usuario);
        });
    }

    //Cambiar el estado de un usuario (cambiar su estado a false o true)
    public Usuarios cambiarEstado (Integer id){
        Optional<Usuarios> usuarioOpt = usuarioRepository.findById(id);
        
        if(usuarioOpt.isPresent()){
            Usuarios usuario = usuarioOpt.get();
            usuario.setEstado(false);
            return usuarioRepository.save(usuario);
        }

        return null;
    }


}
