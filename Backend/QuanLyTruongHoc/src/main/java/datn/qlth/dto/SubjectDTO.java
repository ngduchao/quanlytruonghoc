package datn.qlth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDTO {
	
	private Integer subjectID;
	
	private String subjectCode;
	
	private String subjectName;
	
	private Integer numberOfCredit;
	
	private Integer actualQuantity;
	
	private Integer maxQuantity;
	
	private TeacherInfoDTO teacher;
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class TeacherInfoDTO{
		
		private Integer teacherID;
		
		private String teacherCode;
		
		private String teacherName;
	}
}
