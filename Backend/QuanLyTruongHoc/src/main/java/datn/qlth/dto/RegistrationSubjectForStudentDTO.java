package datn.qlth.dto;

import datn.qlth.validation.subject.SubjectIDExists;
import datn.qlth.validation.user.UserCodeExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationSubjectForStudentDTO {
	
	@UserCodeExists
	private String userCode;
	
	@SubjectIDExists
	private Integer subjectID;
}
