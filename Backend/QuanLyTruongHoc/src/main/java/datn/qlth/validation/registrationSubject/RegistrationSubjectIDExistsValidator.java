package datn.qlth.validation.registrationSubject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.RegistrationSubjectService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class RegistrationSubjectIDExistsValidator implements ConstraintValidator<RegistrationSubjectIDExists, Integer>{
	
	@Autowired
	private RegistrationSubjectService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer ID, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(ID)) {
			return true;
		}
		
		return service.isExistsRegistrationSubjectByID(ID);
	}
}
