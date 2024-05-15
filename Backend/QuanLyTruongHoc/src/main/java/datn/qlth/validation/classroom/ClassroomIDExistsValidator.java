package datn.qlth.validation.classroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.ClassRoomService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ClassroomIDExistsValidator implements ConstraintValidator<ClassroomIDExists, Integer>{
	
	@Autowired
	private ClassRoomService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer ID, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(ID)) {
			return true;
		}
		
		return service.isClassRoomExistsByClassRoomID(ID);
	}
}
