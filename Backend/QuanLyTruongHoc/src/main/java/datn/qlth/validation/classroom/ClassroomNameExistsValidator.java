package datn.qlth.validation.classroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.ClassRoomService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ClassroomNameExistsValidator implements ConstraintValidator<ClassroomNameExists, String>{
	
	@Autowired
	private ClassRoomService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String classRoomName, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(classRoomName)) {
			return true;
		}
		
		return service.isClassRoomExistsByClassRoomName(classRoomName);
	}
	
	
}
