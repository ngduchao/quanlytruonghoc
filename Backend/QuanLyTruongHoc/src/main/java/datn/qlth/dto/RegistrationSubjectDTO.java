package datn.qlth.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationSubjectDTO{
	
	private UserDTO user;
	
	private SubjectDTO subject;
	
	private Integer RegistrationSubjectID;
	
	private Float regularPoint1;
	
	private Float regularPoint2;
	
	private Float midtermScore;
	
	private Float finalScore;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date createdDate;
	
//	private Integer userID;
	
//	private Integer subjectID;
	
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class UserDTO{
		
		private Integer userID;
		
		private String userCode;
		
		private String fullName;
		
		private ClassRoomDTO classroom;
	}
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class SubjectDTO{
		
		private Integer subjectID;
		
		private String subjectCode;
		
		private String subjectName;
		
		private Integer numberOfCredit;
		
		private TeacherDTO teacher; 
	}
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class TeacherDTO{
		
		private Integer teacherID;
		
		private String teacherCode;
		
		private String teacherName;
		
		private String phoneNumber;
	}
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ClassRoomDTO{
		
		private Integer classRoomID;
		
		private String classRoomCode;
		
		private String classRoomName;
		
	}
}
