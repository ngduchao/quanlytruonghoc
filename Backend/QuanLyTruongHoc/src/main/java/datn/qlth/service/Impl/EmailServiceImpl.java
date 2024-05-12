package datn.qlth.service.Impl;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import datn.qlth.entity.User;
import datn.qlth.service.EmailService;
import datn.qlth.service.UserService;

@Component
public class EmailServiceImpl implements EmailService{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JavaMailSender mailSender;
	
	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public static String generateRandomString(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }

	@Override
	public void sendResetPassword(String email) {
		
//		User user = userService.getUserByEmail(email);
		
		String password = generateRandomString(6);
		
		userService.resetPassword(email, password);
		
		String subject = "Lấy lại mật khẩu";
		String content = "Mật khẩu của bạn là: " + password;
		
		sendEmail(email, subject, content);
		
	}
	
	private void sendEmail(final String recipientEmail, final String subject, final String content) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(recipientEmail);
		message.setSubject(subject);
		message.setText(content);
		
		mailSender.send(message);
	}
	
}
