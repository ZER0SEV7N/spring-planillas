package com.spring.planillas.config;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.spring.planillas.services.jwtservices;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;

@Component
public class jwtFilter extends OncePerRequestFilter{

    @Autowired
    private jwtservices jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
        throws IOException, ServletException {

        final String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer")){
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);

        if(!jwtService.validarToken(token)){
            filterChain.doFilter(request, response);
            return;
        }

        final String email = jwtService.extraerEmail(token);

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            email, null, new ArrayList<>());
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }
}
