package com.rcoem.sms.application.services;

import com.rcoem.sms.application.dto.StudentDetails;
import java.util.List;

public interface TeacherService {

    // Add or remove points
    StudentDetails addPoints(String studentId, Integer points);

    // Ranking list (descending by points)
    List<StudentDetails> getStudentsRanked();

    // All students (unordered)
    List<StudentDetails> getAllStudents();

    // Required by controller (same as ranking)
    List<StudentDetails> listStudentsSortedByPoints();
}
