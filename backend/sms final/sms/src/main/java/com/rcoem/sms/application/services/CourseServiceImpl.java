package com.rcoem.sms.application.services;

import com.rcoem.sms.application.dto.CourseDto;
import com.rcoem.sms.domain.entities.Course;
import com.rcoem.sms.domain.entities.Enrollment;
import com.rcoem.sms.domain.entities.UserInfo;
import com.rcoem.sms.domain.repositories.CourseRepository;
import com.rcoem.sms.domain.repositories.EnrollmentRepository;
import com.rcoem.sms.domain.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;

    @Override
    public CourseDto createCourse(CourseDto dto) {
        Course course = Course.builder()
                .id(UUID.randomUUID().toString())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .seats(dto.getSeats())
                .createdBy(dto.getCreatedBy())
                .createdAt(Instant.now())
                .build();
        Course saved = courseRepository.save(course);
        return toDto(saved);
    }

    @Override
    public List<CourseDto> listCourses() {
        return courseRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public CourseDto getCourse(String id) {
        return courseRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public boolean enrollStudent(String courseId, String studentId) {
        // check exists
        if (enrollmentRepository.findByCourseIdAndStudentId(courseId, studentId).isPresent()) return false;

        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) return false;

        // check seats if any
        if (course.getSeats() != null) {
            long enrolled = enrollmentRepository.findByCourseId(courseId).size();
            if (enrolled >= course.getSeats()) return false;
        }

        // persist enrollment
        Enrollment e = Enrollment.builder()
                .id(UUID.randomUUID().toString())
                .courseId(courseId)
                .studentId(studentId)
                .enrolledAt(Instant.now())
                .build();

        enrollmentRepository.save(e);
        return true;
    }

    private CourseDto toDto(Course c) {
        return CourseDto.builder()
                .id(c.getId())
                .title(c.getTitle())
                .description(c.getDescription())
                .seats(c.getSeats())
                .createdBy(c.getCreatedBy())
                .createdAt(c.getCreatedAt() != null ? c.getCreatedAt().toString() : null)
                .build();
    }
}
