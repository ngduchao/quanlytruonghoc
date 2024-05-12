package datn.qlth.dto;

import org.hibernate.validator.constraints.Length;

import datn.qlth.validation.faculty.FacultyCodeNotExists;
import datn.qlth.validation.faculty.FacultyNameNotExists;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateFacultyDTO {
	
	private Integer facultyID;

	@NotBlank(message = "The facultyCode mustn't be null value")
	@Length(max = 30, message = "The facultyCode length is max 30 characters")
	@Length(min = 6, message = "The facultyCode length is min 6 characters")
	@FacultyCodeNotExists
	private String facultyCode;
	
	@NotBlank(message = "The facultyName mustn't be null value")
	@Length(max = 100, message = "The facultyName length is max 100 characters")
	@Length(min = 6, message = "The facultyName length is min 6 characters")
	@FacultyNameNotExists
	private String facultyName;
}
