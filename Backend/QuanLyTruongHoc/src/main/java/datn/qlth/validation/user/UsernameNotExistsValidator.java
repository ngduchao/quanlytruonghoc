package datn.qlth.validation.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.UserService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UsernameNotExistsValidator implements ConstraintValidator<UsernameNotExists, String>{

	@Autowired
	private UserService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String username, ConstraintValidatorContext context) {

		if (StringUtils.isEmpty(username)) {
			return true;
		}
		
		return !service.isUserExistsByUsername(username);
	}	
}
