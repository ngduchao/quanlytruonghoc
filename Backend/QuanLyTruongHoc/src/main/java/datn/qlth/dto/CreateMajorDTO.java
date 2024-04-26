package datn.qlth.dto;

import org.hibernate.validator.constraints.Length;

import datn.qlth.validation.faculty.FacultyIDExists;
import datn.qlth.validation.major.MajorCodeNotExists;
import datn.qlth.validation.major.MajorNameNotExists;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMajorDTO {
	
	@NotBlank(message = "The majorCode mustn't be null value")
	@Length(max = 30, message = "The majorCode length is max 30 characters")
	@Length(min = 6, message = "The majorCode length is min 6 characters")
	@MajorCodeNotExists
	private String majorCode;
	
	@NotBlank(message = "The majorName mustn't be null value")
	@Length(max = 100, message = "The majorName length is max 100 characters")
	@Length(min = 6, message = "The majorName length is min 6 characters")
	@MajorNameNotExists
	private String majorName;
	
	@FacultyIDExists
	private Integer facultyID;
	
}
