package datn.qlth.dto;

import org.hibernate.validator.constraints.Length;

import datn.qlth.validation.faculty.FacultyIDExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMajorDTO {
	
	@Length(max = 30, message = "The majorCode length is max 30 characters")
	@Length(min = 4, message = "The majorCode length is min 6 characters")
	private String majorCode;
	
	@Length(max = 100, message = "The majorName length is max 100 characters")
	@Length(min = 6, message = "The majorName length is min 6 characters")
	private String majorName;
	
	@FacultyIDExists
	private Integer facultyID;
}
