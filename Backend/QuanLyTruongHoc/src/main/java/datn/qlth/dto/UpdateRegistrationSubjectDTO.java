package datn.qlth.dto;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRegistrationSubjectDTO {
	
	@Length(max = 30, message = "The subjectCode length is max 30 characters")
	@Length(min = 6, message = "The subjectCode length is min 6 characters")
	private String subjectCode;
}
