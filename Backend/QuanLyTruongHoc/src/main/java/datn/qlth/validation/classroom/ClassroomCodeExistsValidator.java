package datn.qlth.validation.classroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.ClassRoomService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ClassroomCodeExistsValidator implements ConstraintValidator<ClassroomCodeExists, String>{
	
	@Autowired
	private ClassRoomService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String classroomCode, ConstraintValidatorContext context) {

		if(StringUtils.isEmpty(classroomCode)) {
			return true;
		}
		
		return service.isClassRoomExistsByClassRoomCode(classroomCode);
	}
	
	
}
