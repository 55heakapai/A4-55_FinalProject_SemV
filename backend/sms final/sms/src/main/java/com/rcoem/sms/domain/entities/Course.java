package com.rcoem.sms.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "courses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Course {
    @Id
    private String id;                  // UUID string
    private String title;
    @Column(length = 2000)
    private String description;
    private Integer seats;              // null => unlimited
    private String createdBy;           // admin/teacher id
    private Instant createdAt;
}
