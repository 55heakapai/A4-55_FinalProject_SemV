package com.rcoem.sms.intefaces;

import com.rcoem.sms.application.services.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/enrollments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final CourseService courseService;

    // Enroll logged-in student into course
    @PostMapping("/courses/{courseId}/enroll")
    public ResponseEntity<?> enroll(@PathVariable String courseId, @RequestHeader("X-User-Id") String userId) {
        // In production, read userId from JWT principal instead of header.
        boolean ok = courseService.enrollStudent(courseId, userId);
        if (!ok) return ResponseEntity.status(400).body("Unable to enroll (maybe already enrolled or seats full)");
        return ResponseEntity.ok(Map.of("success", true));
    }
}
