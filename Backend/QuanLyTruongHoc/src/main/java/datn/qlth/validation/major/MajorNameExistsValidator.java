package datn.qlth.validation.major;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.MajorService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MajorNameExistsValidator implements ConstraintValidator<MajorNameExists, String>{
	
	@Autowired
	private MajorService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String majorName, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(majorName)) {
			return true;
		}
		
		return service.isMajorExistsByMajorName(majorName);
	}
	
	
}
