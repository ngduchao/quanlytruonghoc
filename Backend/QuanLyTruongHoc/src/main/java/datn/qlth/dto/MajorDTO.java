package datn.qlth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MajorDTO {
	
	private Integer majorID;
	
	private String majorCode;
	
	private String majorName;
	
	private FacultyDTO faculty;
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public
	static class FacultyDTO{
		
		private Integer facultyID;
		
		private String facultyCode;
		
		private String facultyName;
	}
}
