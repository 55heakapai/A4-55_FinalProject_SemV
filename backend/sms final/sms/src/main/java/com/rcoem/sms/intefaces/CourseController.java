package com.rcoem.sms.intefaces;

import com.rcoem.sms.application.dto.CourseDto;
import com.rcoem.sms.application.services.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    // Admin: create course (requires auth)
    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody CourseDto dto) {
        CourseDto saved = courseService.createCourse(dto);
        return ResponseEntity.ok(saved);
    }

    // Public: list courses
    @GetMapping
    public ResponseEntity<List<CourseDto>> listCourses() {
        return ResponseEntity.ok(courseService.listCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCourse(@PathVariable String id) {
        CourseDto c = courseService.getCourse(id);
        if (c == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(c);
    }
}
