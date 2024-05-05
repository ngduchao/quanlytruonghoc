package datn.qlth.validation.faculty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.FacultyService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FacultyNameNotExistsValidator implements ConstraintValidator<FacultyNameNotExists, String>{
	
	@Autowired
	private FacultyService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String facultyName, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(facultyName)) {
			return true;
		}
		
		return !service.isFacultyExistsByFacultyName(facultyName);
	}
}
