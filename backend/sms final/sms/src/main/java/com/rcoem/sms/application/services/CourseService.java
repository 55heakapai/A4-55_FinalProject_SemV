package com.rcoem.sms.application.services;

import com.rcoem.sms.application.dto.CourseDto;
import java.util.List;

public interface CourseService {
    CourseDto createCourse(CourseDto dto);
    List<CourseDto> listCourses();
    CourseDto getCourse(String id);
    boolean enrollStudent(String courseId, String studentId);
}
