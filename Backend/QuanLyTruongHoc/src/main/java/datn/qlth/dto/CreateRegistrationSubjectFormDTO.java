package datn.qlth.dto;

import datn.qlth.validation.subject.SubjectCodeExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRegistrationSubjectFormDTO {
	
	@SubjectCodeExists
	private String subjectCode;
}
