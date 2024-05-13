package datn.qlth.validation.subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.SubjectService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SubjectNameExistsValidator implements ConstraintValidator<SubjectNameExists, String>{
	
	@Autowired
	private SubjectService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String subjectName, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(subjectName)) {
			return true;
		}
		
		return service.isSubjectExistsBySubjectName(subjectName);
	}
	
	
}
