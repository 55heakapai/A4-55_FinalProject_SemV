//package com.rcoem.sms.application.services;
//
//import com.rcoem.sms.application.dto.StudentDetails;
//import com.rcoem.sms.domain.entities.StudentInfo;
//import com.rcoem.sms.domain.repositories.StudentRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class TeacherServiceImpl implements TeacherService {
//
//    private final StudentRepository studentRepository;
//
//    // ---------------------------------------------------------
//    // 1. ADD POINTS
//    // ---------------------------------------------------------
//    @Override
//    public StudentDetails addPoints(String studentId, Integer points) {
//        StudentInfo student = studentRepository.findById(studentId)
//                .orElseThrow(() -> new RuntimeException("Student not found"));
//
//        student.setPoints(student.getPoints() + points);
//        studentRepository.save(student);
//
//        return mapToDto(student);
//    }
//
//    // ---------------------------------------------------------
//    // 2. RETURN STUDENTS SORTED BY POINTS (RANKING)
//    // ---------------------------------------------------------
//    @Override
//    public List<StudentDetails> getStudentsRanked() {
//        return listStudentsSortedByPoints();
//    }
//
//    // ---------------------------------------------------------
//    // 3. ALL STUDENTS (NO SORTING)
//    // ---------------------------------------------------------
//    @Override
//    public List<StudentDetails> getAllStudents() {
//        return studentRepository.findAll()
//                .stream()
//                .map(this::mapToDto)
//                .collect(Collectors.toList());
//    }
//
//    // ---------------------------------------------------------
//    // 4. MAIN SORTING FUNCTION (DESC BY POINTS)
//    // ---------------------------------------------------------
//    @Override
//    public List<StudentDetails> listStudentsSortedByPoints() {
//        return studentRepository.findAll()
//                .stream()
//                .sorted((a, b) -> b.getPoints() - a.getPoints()) // DESC
//                .map(this::mapToDto)
//                .collect(Collectors.toList());
//    }
//
//    // ---------------------------------------------------------
//    // DTO MAPPER
//    // ---------------------------------------------------------
//    private StudentDetails mapToDto(StudentInfo info) {
//        return StudentDetails.builder()
//                .id(info.getId())
//                .rollNo(info.getRollNo())
//                .name(info.getName())
//                .course(info.getCourse())
//                .email(info.getEmail())
//                .mobileNumber(info.getMobileNumber())
//                .department(info.getDepartment())
//                .gender(info.getGender())
//                .dateOfBirth(info.getDateOfBirth())
//                .points(info.getPoints())
//                .build();
//    }
//}
package com.rcoem.sms.application.services;

import com.rcoem.sms.application.dto.StudentDetails;
import com.rcoem.sms.application.mapper.StudentMapper;
import com.rcoem.sms.domain.entities.StudentInfo;
import com.rcoem.sms.domain.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    @Override
    public StudentDetails addPoints(String studentId, Integer points) {
        Optional<StudentInfo> opt = studentRepository.findById(studentId);
        if (opt.isEmpty()) return null;

        StudentInfo student = opt.get();
        if (student.getPoints() == null) student.setPoints(0);
        student.setPoints(student.getPoints() + (points == null ? 0 : points));
        StudentInfo saved = studentRepository.save(student);
        return studentMapper.toDto(saved);
    }

    @Override
    public List<StudentDetails> getStudentsRanked() {
        return studentRepository.findAll()
                .stream()
                .sorted(Comparator.comparingInt(s -> - (s.getPoints() == null ? 0 : s.getPoints())))
                .map(studentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<StudentDetails> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(studentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<StudentDetails> listStudentsSortedByPoints() {
        // alias of getStudentsRanked
        return getStudentsRanked();
    }
}
