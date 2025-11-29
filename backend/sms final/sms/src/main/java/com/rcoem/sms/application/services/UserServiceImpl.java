package com.rcoem.sms.application.services;

import com.rcoem.sms.application.dto.UserDetails;
import com.rcoem.sms.application.mapper.UserMapper;
import com.rcoem.sms.domain.entities.UserInfo;
import com.rcoem.sms.domain.repositories.UserRepository;
import com.rcoem.sms.security.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ---------------- REGISTER USER -------------------
    @Override
    public UserDetails registerUser(UserDetails dto) {

        UserInfo user = new UserInfo();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setMobileNumber(dto.getMobileNumber());
        user.setGender(dto.getGender());
        user.setDateOfBirth(dto.getDateOfBirth());
        user.setType(dto.getType());

        // 🔐 Hash password
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        UserInfo saved = userRepository.save(user);

        return UserDetails.builder()
                .id(saved.getId())
                .name(saved.getName())
                .email(saved.getEmail())
                .type(saved.getType())
                .mobileNumber(saved.getMobileNumber())
                .gender(saved.getGender())
                .dateOfBirth(saved.getDateOfBirth())
                .build();
    }

    // ---------------- USER SIGN-IN -------------------
    @Override
    public UserDetails signInUser(String email, String password) {

        UserInfo user = userRepository.findByEmail(email)
                .orElse(null);
        if (user == null) return null;

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            return null;
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        // Return ONLY user details (NO token inside user object)
        UserDetails userDto = UserDetails.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .type(user.getType())
                .mobileNumber(user.getMobileNumber())
                .gender(user.getGender())
                .dateOfBirth(user.getDateOfBirth())
                .build();

        // Put token OUTSIDE user object
        userDto.setToken(token);

        return userDto;
    }



    @Override
    public UserDetails getUserDetails(UserDetails userDetails) {
        return userDetails;
    }

    @Override
    public void updateUserType(UserDetails userDetails) { }
}
