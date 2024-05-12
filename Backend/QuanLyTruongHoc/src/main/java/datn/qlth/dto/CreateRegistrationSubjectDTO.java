
package datn.qlth.dto;

import datn.qlth.validation.subject.SubjectIDExists;
import datn.qlth.validation.user.UserCodeExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRegistrationSubjectDTO {
	
	private Integer registrationSubjectID = null;
	
	@SubjectIDExists
	private Integer subjectID;
	
	@UserCodeExists
	private String userCode;
}
