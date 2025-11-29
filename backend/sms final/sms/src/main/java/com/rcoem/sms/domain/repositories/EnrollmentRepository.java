package com.rcoem.sms.domain.repositories;

import com.rcoem.sms.domain.entities.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, String> {
    List<Enrollment> findByStudentId(String studentId);
    List<Enrollment> findByCourseId(String courseId);
    Optional<Enrollment> findByCourseIdAndStudentId(String courseId, String studentId);
}
