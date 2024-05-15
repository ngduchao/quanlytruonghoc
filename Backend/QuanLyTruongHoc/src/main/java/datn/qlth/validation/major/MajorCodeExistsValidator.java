package datn.qlth.validation.major;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.MajorService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MajorCodeExistsValidator implements ConstraintValidator<MajorCodeExists, String>{
	
	@Autowired
	private MajorService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String majorCode, ConstraintValidatorContext context) {

		if(StringUtils.isEmpty(majorCode)) {
			return true;
		}
		
		return service.isMajorExistsByMajorCode(majorCode);
	}
	
	
}
