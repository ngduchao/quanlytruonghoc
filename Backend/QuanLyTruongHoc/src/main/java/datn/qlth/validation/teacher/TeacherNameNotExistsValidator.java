package datn.qlth.validation.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.TeacherService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TeacherNameNotExistsValidator implements ConstraintValidator<TeacherNameNotExists, String>{

	@Autowired
	private TeacherService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String teacherName, ConstraintValidatorContext context) {

		if (StringUtils.isEmpty(teacherName)) {
			return true;
		}
		
		return !service.isExistsByTeacherName(teacherName);
	}	
}
