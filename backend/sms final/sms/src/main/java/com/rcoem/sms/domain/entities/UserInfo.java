package com.rcoem.sms.domain.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @Column(unique = true)
    private String email;

    private String mobileNumber;
    private String gender;
    private String dateOfBirth;
    private String type;

    private String passwordHash;   // Only BCrypt hash
}
