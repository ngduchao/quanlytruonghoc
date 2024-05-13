package datn.qlth.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import datn.qlth.service.EmailService;

@Component
public class ResetPasswordViaEmailListener implements ApplicationListener<OnResetPasswordViaEmailEvent>{

	@Autowired
	private EmailService emailService;
	
	@Override
	public void onApplicationEvent(final OnResetPasswordViaEmailEvent event) {
		sendResetPasswordViaEmail(event.getEmail());
	}
	
	private void sendResetPasswordViaEmail(String email) {
		emailService.sendResetPassword(email);
	}

}
