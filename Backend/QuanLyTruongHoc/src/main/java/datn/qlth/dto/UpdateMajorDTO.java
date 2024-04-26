package datn.qlth.dto;

import datn.qlth.validation.faculty.FacultyIDExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMajorDTO {
	
	private String majorCode;
	
	private String majorName;
	
	@FacultyIDExists
	private Integer facultyID;
}
