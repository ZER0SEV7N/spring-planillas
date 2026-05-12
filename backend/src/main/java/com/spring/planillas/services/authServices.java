package com.spring.planillas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.planillas.models.Usuarios;
import com.spring.planillas.models.Roles;
import com.spring.planillas.repository.usuarioRepository;
import com.spring.planillas.repository.rolesRepository;

//Service para manejar la autenticación
@Service
public class authServices {
    
    @Autowired
    private usuarioRepository usuarioRepository;
    @Autowired
    private rolesRepository rolesRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //Loguear un usuario
    public Usuarios login (String email, String password){
        Usuarios usuario = usuarioRepository.findByEmail(email);

        if(usuario != null && passwordEncoder.matches(password, usuario.getPassword()))
            return usuario;

        return null;
    }

    //Registrar un usuario nuevo (Solamente rol "Administrador" puede registrar nuevos usuarios)
    public Usuarios registrar (Usuarios usuario){
        //Obtener el usuario autenticado actual
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        //Validar que el usuario esté autenticado
        if(authentication == null || !authentication.isAuthenticated()) 
            return null;

        //Obtener el usuario actual de la BD
        String emailActual = authentication.getName(); 
        Usuarios usuarioActual = usuarioRepository.findByEmail(emailActual);

        if(usuarioActual == null) 
            return null;

        //Validar que el usuario actual sea Administrador (ID 1 = Administrador)
        if(usuarioActual.getRoles() == null || usuarioActual.getRoles().getIdrol() != 1) 
            return null;

        //Validar que el nuevo usuario tenga un rol válido
        if(usuario.getRoles() == null || usuario.getRoles().getIdrol() == null || usuario.getRoles().getIdrol() <= 0) 
            return null;

        //Obtener la entidad Roles del nuevo usuario
        Roles rol = rolesRepository.findById(usuario.getRoles().getIdrol()).orElse(null);
        if(rol == null)
            return null;

        usuario.setRoles(rol);

        //Validar que el email es único
        if(usuarioRepository.findByEmail(usuario.getEmail()) != null) 
            return null;

        //Validar que el documento es único
        if(usuarioRepository.findByDocumento(usuario.getDocumento()) != null)
            return null;

        // Encriptar la contraseña y guardar
        String HashPassword = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(HashPassword);

        return usuarioRepository.save(usuario);
    }

    //Obtener el usuario autenticado actual
    public Usuarios getUsuarioActual(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if(authentication == null || !authentication.isAuthenticated()) 
            return null;

        String emailActual = authentication.getName(); 
        return usuarioRepository.findByEmail(emailActual);
    }
}
