package com.rcoem.sms.intefaces;

import com.rcoem.sms.application.dto.UserDetails;
import com.rcoem.sms.application.services.UserService;
import com.rcoem.sms.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> register(@RequestBody UserDetails userDetails) {
        try {
            if (userDetails.getEmail() == null || userDetails.getPassword() == null) {
                return ResponseEntity.badRequest().body("Email and Password are required");
            }

            UserDetails saved = userService.registerUser(userDetails);

            if (saved == null) {
                return ResponseEntity.status(500).body("Registration failed");
            }

            return ResponseEntity
                    .created(URI.create("/users/" + saved.getId()))
                    .body(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(500)
                    .body("Error during registration: " + e.getMessage());
        }
    }
    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody UserDetails userDetails) {

        UserDetails user = userService.signInUser(
                userDetails.getEmail(),
                userDetails.getPassword()
        );

        if (user == null)
            return ResponseEntity.status(401).body("Invalid credentials");

        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", user,
                "type", user.getType()      // <-- add this
        ));
    }



}
