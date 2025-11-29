package com.rcoem.sms.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "enrollments",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"course_id", "student_id"})})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Enrollment {
    @Id
    private String id;
    @Column(name = "course_id")
    private String courseId;
    @Column(name = "student_id")
    private String studentId;
    private Instant enrolledAt;
}
