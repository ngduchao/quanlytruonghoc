package datn.qlth.dto;

import datn.qlth.validation.subject.SubjectIDExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDeleteRegistrationSubject {
	
	@SubjectIDExists
	private Integer subjectID;
}
