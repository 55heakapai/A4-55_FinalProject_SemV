package com.rcoem.sms.intefaces;

import com.rcoem.sms.application.dto.AddPointsRequest;
import com.rcoem.sms.application.dto.StudentDetails;
import com.rcoem.sms.application.services.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TeacherController {

    private final TeacherService teacherService;

    // ---------------------------------------------------------
    // 1. ADD POINTS TO A STUDENT
    // ---------------------------------------------------------
    @PostMapping("/students/{id}/points")
    public StudentDetails addPoints(
            @PathVariable String id,
            @RequestBody AddPointsRequest request
    ) {
        return teacherService.addPoints(id, request.getPoints());
    }

    // ---------------------------------------------------------
    // 2. GET RANKING LIST (DESC BY POINTS)
    // ---------------------------------------------------------
    @GetMapping("/ranklist")
    public List<StudentDetails> getRankList() {
        return teacherService.getStudentsRanked();
    }

    // ---------------------------------------------------------
    // 3. GET ALL STUDENTS WITHOUT SORTING
    // ---------------------------------------------------------
    @GetMapping("/students")
    public List<StudentDetails> getAllStudents() {
        return teacherService.getAllStudents();
    }

    // ---------------------------------------------------------
    // 4. GET SORTED STUDENTS (DESC BY POINTS)
    // ---------------------------------------------------------
    @GetMapping("/students/sorted")
    public List<StudentDetails> getSortedStudents() {
        return teacherService.listStudentsSortedByPoints();
    }
}
