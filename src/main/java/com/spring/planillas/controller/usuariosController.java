package com.spring.planillas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.planillas.models.Usuarios;
import com.spring.planillas.models.payload.response;
import com.spring.planillas.services.usuariosServices;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/empleados")
public class usuariosController {
    
    @Autowired
    private usuariosServices usuariosServices;

    @GetMapping("/buscar")
    public ResponseEntity<response<List<Usuarios>>> obtenerTodos(){
        List<Usuarios> usuarios = usuariosServices.getAllUsuarios();
        return ResponseEntity.ok(new response<>(true, "Usuarios obtenidos exitosamente", usuarios));
    }

    @GetMapping(value = "/buscar", params = "id")
    public ResponseEntity<response<Usuarios>> obtenerPorId(@RequestParam Integer id){
        Usuarios usuario = usuariosServices.getUsuarioById(id);

        if(usuario == null)
            return ResponseEntity.status(404).body(new response<>(false, "Usuario no encontrado", null));

        return ResponseEntity.status(200).body(new response<>(true, "Usuario obtenido exitosamente", usuario));
    }

    @GetMapping("/buscar/nombre")
    public ResponseEntity<response<Usuarios>> obtenerPorNombreCompleto(@RequestParam String nombreCompleto){
        if(nombreCompleto == null || nombreCompleto.trim().isEmpty())
            return ResponseEntity.status(404).body(new response<>(false, "Parámetro nombreCompleto es requerido", null));

        String[] partes = nombreCompleto.trim().split("\\s+", 2);
        if(partes.length < 2)
            return ResponseEntity.status(404).body(new response<>(false, "Proporcione nombre y apellido separados por espacio", null));

        String nombre = partes[0];
        String apellido = partes[1];

        Usuarios usuario = usuariosServices.getUsuarioByNombreApellido(nombre, apellido);
        if(usuario == null)
            return ResponseEntity.status(404).body(new response<>(false, "Usuario no encontrado", null));

        return ResponseEntity.ok(new response<>(true, "Usuario obtenido exitosamente", usuario));
    }

    @PatchMapping("/cambiar-estado/{id}")
    public ResponseEntity<response<Usuarios>> cambiarEstado(@PathVariable Integer id){
        Usuarios usuario = usuariosServices.cambiarEstado(id);

        if(usuario == null)
            return ResponseEntity.status(404).body(new response<>(false, "Usuario no encontrado", null));

        String mensaje = usuario.getEstado() ? "Usuario desactivado exitosamente" : "Usuario activado exitosamente";
        
        return ResponseEntity.status(200).body(new response<>(true, mensaje, usuario));
    }

    @PatchMapping("/actualizar/{id}")
    public ResponseEntity<response<Usuarios>> actualizarUsuario(@PathVariable Integer id, @RequestBody Usuarios detalles){
        return usuariosServices.updateUsuario(id, detalles)
                .map(usuario -> ResponseEntity.status(200).body(new response<>(true, "Usuario actualizado exitosamente", usuario)))
                .orElseGet(() -> ResponseEntity.status(404).body(new response<>(false, "Usuario no encontrado", null)));
    }
}
