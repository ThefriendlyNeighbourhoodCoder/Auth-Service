package com.certihub.auth.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}") // Sender email from properties
    private String senderEmail;

    public void sendOtpEmail(String recipientEmail, String otpCode) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(senderEmail);
            helper.setTo(recipientEmail);
            helper.setSubject("Your OTP for Email Verification");

            String emailBody = "<p>Hello,</p>"
                    + "<p>Your OTP for verifying your account is: <b>" + otpCode + "</b></p>"
                    + "<p>This OTP is valid for 5 minutes.</p>"
                    + "<p>Thank you!</p>";

            helper.setText(emailBody, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Error sending email: " + e.getMessage());
        }
    }
}
