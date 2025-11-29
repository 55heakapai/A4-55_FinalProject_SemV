package com.rcoem.sms.application.dto;

import lombok.*;

@AllArgsConstructor @NoArgsConstructor @Getter @Setter @Builder
public class CourseDto {
    private String id;
    private String title;
    private String description;
    private Integer seats;
    private String createdBy;
    private String createdAt; // ISO string, optional
}
