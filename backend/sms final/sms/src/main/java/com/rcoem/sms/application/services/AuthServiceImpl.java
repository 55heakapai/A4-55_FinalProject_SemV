package com.rcoem.sms.application.services;

import com.rcoem.sms.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public String generateToken(String email) {
        return jwtUtil.generateToken(email);
    }

    @Override
    public boolean validateToken(String token, String email) {
        String extractedEmail = jwtUtil.extractUsername(token);
        return extractedEmail.equals(email) && !jwtUtil.isTokenExpired(token);
    }
}
