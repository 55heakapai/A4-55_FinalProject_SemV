//package com.rcoem.sms.application.dto;
//
//import lombok.*;
//
//@AllArgsConstructor
//@NoArgsConstructor
//@Getter
//@Setter
//@Builder
//public class UserDetails {
//    private String id;
//    private String name;
//    private String type;          // Student / Teacher / Admin
//    private String email;
//    private String mobileNumber;
//    private String gender;
//    private String dateOfBirth;   // YYYY-MM-DD
//    private String password;
//    private String token;
//}
package com.rcoem.sms.application.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDetails {
    private String id;
    private String name;
    private String type;
    private String email;
    private String mobileNumber;
    private String gender;
    private String dateOfBirth;
    private String token;
    private String password; // only for receiving during login/register
}
