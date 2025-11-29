// src/main/java/com/rcoem/sms/domain/repositories/UserRepository.java
package com.rcoem.sms.domain.repositories;

import com.rcoem.sms.domain.entities.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserInfo, String> {
    Optional<UserInfo> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByMobileNumber(String mobileNumber);
}
