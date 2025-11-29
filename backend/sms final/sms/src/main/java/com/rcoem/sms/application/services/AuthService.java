package com.rcoem.sms.application.services;

public interface AuthService {
    String generateToken(String email);
    boolean validateToken(String token, String email);
}
