package datn.qlth.validation.major;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.MajorService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MajorIDExistsValidator implements ConstraintValidator<MajorIDExists, Integer>{
	
	@Autowired
	private MajorService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer ID, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(ID)) {
			return true;
		}
		
		return service.isMajorExistsByMajorID(ID);
	}
}
