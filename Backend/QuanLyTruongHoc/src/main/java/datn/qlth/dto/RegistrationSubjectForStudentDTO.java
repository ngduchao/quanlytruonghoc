package datn.qlth.dto;

import datn.qlth.validation.subject.SubjectCodeExists;
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
	
	@SubjectCodeExists
	private String subjectCode;
}
