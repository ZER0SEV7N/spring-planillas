package com.spring.planillas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.planillas.models.Usuarios;
import com.spring.planillas.repository.usuarioRepository;

@Service
public class usuariosServices {
    
    @Autowired
    private usuarioRepository usuarioRepository;

    //Obtener todos los usuarios de la base de datos
    public List<Usuarios> getAllUsuarios(){
        return usuarioRepository.findAllByEstadoTrue();
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
    public Optional<Usuarios> updateUsuario(Integer id, Usuarios detalles){
        Optional<Usuarios> usuarioOpt = usuarioRepository.findById(id);
        
        if(usuarioOpt.isPresent()){
            Usuarios usuario = usuarioOpt.get();
            usuario.setNombre(detalles.getNombre());
            usuario.setApellido(detalles.getApellido());
            usuario.setEmail(detalles.getEmail());
            usuario.setDocumento(detalles.getDocumento());
            usuario.setRoles(detalles.getRoles());
            usuario.setCargos(detalles.getCargos());
            usuarioRepository.save(usuario);
        }
        return usuarioOpt;
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
