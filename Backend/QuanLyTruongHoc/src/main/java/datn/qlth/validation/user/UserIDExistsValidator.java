package datn.qlth.validation.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.UserService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UserIDExistsValidator implements ConstraintValidator<UserIDExists, Integer>{

	@Autowired
	private UserService service;
	
	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer ID, ConstraintValidatorContext context) {
		if(StringUtils.isEmpty(ID)) {
			return true;
		}
		
		return service.isUserExistsByID(ID);
	}

}
