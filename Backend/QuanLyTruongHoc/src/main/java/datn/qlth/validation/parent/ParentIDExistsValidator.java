package datn.qlth.validation.parent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import datn.qlth.service.ParentService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ParentIDExistsValidator implements ConstraintValidator<ParentIDExists, Integer>{
	
	@Autowired
	private ParentService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer ID, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(ID)) {
			return true;
		}
		
		return service.isParentExistsByParentID(ID);
	}
}
