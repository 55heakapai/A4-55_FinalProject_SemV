package com.rcoem.sms.application.dto;

import lombok.*;

@AllArgsConstructor @NoArgsConstructor @Getter @Setter
public class AddPointsRequest {
    private Integer points; // can be negative to remove
    private String reason;
}
