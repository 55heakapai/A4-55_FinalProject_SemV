package com.rcoem.sms.domain.repositories;

import com.rcoem.sms.domain.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, String> { }
