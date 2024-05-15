package datn.qlth.dto;

import datn.qlth.validation.subject.SubjectIDExists;
import datn.qlth.validation.user.UserIDExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteRegistrationSubjectDTO {
	
	@UserIDExists
	private Integer userID;
	
	@SubjectIDExists
	private Integer subjectID;
}
