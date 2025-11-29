package com.rcoem.sms.domain.repositories;

import com.rcoem.sms.domain.entities.StudentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<StudentInfo, String> {

    Optional<StudentInfo> findByEmail(String email);
}
