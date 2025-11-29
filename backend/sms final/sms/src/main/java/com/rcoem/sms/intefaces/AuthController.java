//package com.rcoem.sms.intefaces;
//
//
//import com.rcoem.sms.application.dto.UserDetails;
//import com.rcoem.sms.application.services.UserService;
//import com.rcoem.sms.security.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private UserService userService;
//    @Autowired
//    JwtUtil jwtUtil;
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody UserDetails userDetails) {
//        UserDetails saved = userService.registerUser(userDetails);
//        return ResponseEntity.ok(saved);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody UserDetails userDetails) {
//        UserDetails user = userService.signInUser(
//                userDetails.getEmail(),
//                userDetails.getPassword()
//        );
//
//        if (user == null)
//            return ResponseEntity.status(401).body("Invalid email or password");
//
//        String token = jwtUtil.generateToken(user.getEmail());
//
//        return ResponseEntity.ok(Map.of(
//                "token", token,
//                "user", user
//        ));
//    }
//}
