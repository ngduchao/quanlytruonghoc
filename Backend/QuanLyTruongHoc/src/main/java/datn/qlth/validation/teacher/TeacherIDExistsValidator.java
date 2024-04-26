package datn.qlth.validation.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.TeacherService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TeacherIDExistsValidator implements ConstraintValidator<TeacherIDExists, Integer>{

	@Autowired
	private TeacherService service;
	
	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer ID, ConstraintValidatorContext context) {
		if(StringUtils.isEmpty(ID)) {
			return true;
		}
		
		return service.isExistsByTeacherID(ID);
	}

}
