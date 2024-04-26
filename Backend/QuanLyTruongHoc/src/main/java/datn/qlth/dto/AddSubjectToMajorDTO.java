package datn.qlth.dto;

import datn.qlth.validation.major.MajorCodeExists;
import datn.qlth.validation.subject.SubjectCodeExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddSubjectToMajorDTO {
	
	@SubjectCodeExists
	private String subjectCode;
	
	@MajorCodeExists
	private String majorCode;
}
