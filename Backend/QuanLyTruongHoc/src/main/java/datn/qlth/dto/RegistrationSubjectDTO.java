package datn.qlth.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationSubjectDTO {
	
	private Integer ID;
	
	private UserDTO user;
	
	private SubjectDTO subject;
	
	private Float regularPoint1;
	
	private Float regularPoint2;
	
	private Float midtermScore;
	
	private Float finalScore;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date createdDate;
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class UserDTO{
		
		private Long userID;
		
		private String userCode;
		
		private String fullName;
	}
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class SubjectDTO{
		
		private Integer subjectID;
		
		private String subjectCode;
		
		private String subjectName;
		
		private TeacherDTO teacher; 
	}
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class TeacherDTO{
		
		private Integer teacherID;
		
		private String teacherCode;
		
		private String teacherName;
	}
}
