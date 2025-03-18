package com.certihub.auth.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.*;

import java.time.LocalDateTime;

@Transactional
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String fullName;
    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = true)
    private String otpCode;

    @Column(nullable = true)
    private LocalDateTime otpExpiry;

    @Column(nullable = false)
    private boolean isVerified = false;
}
