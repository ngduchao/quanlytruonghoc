package datn.qlth.validation.classroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.ClassRoomService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ClassroomCodeNotExistsValidator implements ConstraintValidator<ClassroomCodeExists, String>{
	
	@Autowired
	private ClassRoomService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String classRoomCode, ConstraintValidatorContext context) {

		if(StringUtils.isEmpty(classRoomCode)) {
			return true;
		}
		
		return !service.isClassRoomExistsByClassRoomCode(classRoomCode);
	}
	
	
}
