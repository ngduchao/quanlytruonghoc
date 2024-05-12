package datn.qlth.dto;

import datn.qlth.validation.faculty.FacultyIDExists;
import datn.qlth.validation.major.MajorIDExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddMajorToFacultyDTO{
	
	@FacultyIDExists
	private Integer facultyID;
	
	@MajorIDExists
	private Integer majorID;
}
