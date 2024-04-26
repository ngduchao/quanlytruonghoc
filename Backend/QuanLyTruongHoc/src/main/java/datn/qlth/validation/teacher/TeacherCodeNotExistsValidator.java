package datn.qlth.validation.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.TeacherService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TeacherCodeNotExistsValidator implements ConstraintValidator<TeacherCodeExists, String>{
	
	@Autowired
	private TeacherService service;
	
	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String teacherCode, ConstraintValidatorContext context) {

		if (StringUtils.isEmpty(teacherCode)) {
			return true;
		}
		
		return !service.isExistsByTeacherCode(teacherCode);
	}
}
