package com.rcoem.sms.application.mapper;

import com.rcoem.sms.application.dto.UserDetails;
import com.rcoem.sms.domain.entities.UserInfo;
import org.springframework.stereotype.Component;

@Component

public class UserMapper {

    public UserInfo toEntity(UserDetails dto) {
        if (dto == null) return null;

        return UserInfo.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .mobileNumber(dto.getMobileNumber())
                .gender(dto.getGender())
                .dateOfBirth(dto.getDateOfBirth())
                .type(dto.getType())
                // DO NOT SET passwordHash or salt here
                .build();
    }

    public UserDetails toDto(UserInfo user) {
        if (user == null) return null;

        return UserDetails.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .mobileNumber(user.getMobileNumber())
                .gender(user.getGender())
                .dateOfBirth(user.getDateOfBirth())
                .type(user.getType())
                // DO NOT RETURN password / hash / salt
                .build();
    }
}
