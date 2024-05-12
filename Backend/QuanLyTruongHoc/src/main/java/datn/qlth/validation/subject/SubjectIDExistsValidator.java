package datn.qlth.validation.subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.SubjectService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SubjectIDExistsValidator implements ConstraintValidator<SubjectIDExists, Integer>{
	
	@Autowired
	private SubjectService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer ID, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(ID)) {
			return true;
		}
		
		return service.isSubjectExistsBySubjectID(ID);
	}
}
