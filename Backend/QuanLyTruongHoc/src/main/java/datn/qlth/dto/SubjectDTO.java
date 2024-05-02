package datn.qlth.dto;

import datn.qlth.entity.Enum.SubjectStatus;
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
	
	private SubjectStatus subjectStatus;
	
	private TeacherInfoDTO teacher;
	
	private MajorDTO major;
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class TeacherInfoDTO{
		
		private Integer teacherID;
		
		private String teacherCode;
		
		private String teacherName;
		
		private String phoneNumber;
	}
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class MajorDTO{
		
		private Integer majorID;
		
		private String majorCode;
		
		private String majorName;
		
	}
}
