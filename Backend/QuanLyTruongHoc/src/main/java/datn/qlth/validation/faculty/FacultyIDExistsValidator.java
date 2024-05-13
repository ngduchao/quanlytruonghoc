package datn.qlth.validation.faculty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.FacultyService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FacultyIDExistsValidator implements ConstraintValidator<FacultyIDExists, Integer>{
	
	@Autowired
	private FacultyService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer ID, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(ID)) {
			return true;
		}
		
		return service.isFacultyExistsByID(ID);
	}
}
