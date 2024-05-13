package datn.qlth.validation.faculty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.FacultyService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FacultyCodeNotExistsValidator implements ConstraintValidator<FacultyCodeExists, String>{
	
	@Autowired
	private FacultyService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String facultyCode, ConstraintValidatorContext context) {

		if(StringUtils.isEmpty(facultyCode)) {
			return true;
		}
		
		return !service.isFacultyExistsByFacultyCode(facultyCode);
	}
	
	
}
