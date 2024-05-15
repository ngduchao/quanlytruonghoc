package datn.qlth.validation.subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.SubjectService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SubjectCodeNotExistsValidator implements ConstraintValidator<SubjectCodeExists, String>{
	
	@Autowired
	private SubjectService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String subjectCode, ConstraintValidatorContext context) {

		if(StringUtils.isEmpty(subjectCode)) {
			return true;
		}
		
		return !service.isSubjectExistsBySubjectCode(subjectCode);
	}
	
	
}
