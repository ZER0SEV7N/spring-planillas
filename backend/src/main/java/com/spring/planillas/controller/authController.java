package com.spring.planillas.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.planillas.models.Usuarios;
import com.spring.planillas.models.payload.response;
import com.spring.planillas.services.authServices;
import com.spring.planillas.services.jwtservices;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//Controlador para manejar la autenticación
//Endpoints para login y registro de usuarios
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class authController {

    @Autowired
    private authServices authService;
    
    @Autowired
    private jwtservices jwtService;

    //Endpoint para registrar un nuevo usuario
    //Solo el rol "Administrador" puede registrar nuevos usuarios
    @PostMapping("/registrar")
    public ResponseEntity<response<Usuarios>> registrar(@RequestBody Usuarios usuario){
        Usuarios nuevoUsuario = authService.registrar(usuario);

        if(nuevoUsuario == null) 
            return ResponseEntity.status(400).body(new response<>(false, "No se pudo registrar el usuario", null));

        return ResponseEntity.status(201).body(new response<>(true, "Usuario registrado exitosamente", nuevoUsuario));
    }

    //Endpoint para loguear un usuario
    @PostMapping("/login")
    public ResponseEntity<response<Map<String, Object>>> login(@RequestBody Usuarios credenciales){
        Usuarios usuario = authService.login(credenciales.getEmail(), credenciales.getPassword());

        if(usuario == null) 
            return ResponseEntity.status(401).body(new response<>(false, "Credenciales inválidas", null));

        usuario.setIdusuario(null);
        usuario.setPassword(null);

        String token = jwtService.generarToken(usuario.getEmail());

        Map<String, Object> data = new HashMap<>();
        data.put("usuario", usuario);
        data.put("token", token);
        data.put("rol", usuario.getRoles() != null ? usuario.getRoles().getRol() : null);

        return ResponseEntity.status(200).body(new response<>(true, "Login exitoso", data));
    }

    @GetMapping("/perfil")
    public ResponseEntity<response<Usuarios>> getPerfil(){
        Usuarios usuario = authService.getUsuarioActual();

        if(usuario == null) 
            return ResponseEntity.status(401).body(new response<>(false, "No se pudo obtener el perfil", null));

        usuario.setIdusuario(null);
        usuario.setPassword(null);

        return ResponseEntity.status(200).body(new response<>(true, "Perfil obtenido exitosamente", usuario));
    }

}
