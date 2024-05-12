package datn.qlth.validation.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.UserService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UserCodeNotExistsValidator implements ConstraintValidator<UserCodeExists, String>{
	
	@Autowired
	private UserService service;
	
	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String userCode, ConstraintValidatorContext context) {

		if (StringUtils.isEmpty(userCode)) {
			return true;
		}
		
		return !service.isUserExistsByUserCode(userCode);
	}
}
