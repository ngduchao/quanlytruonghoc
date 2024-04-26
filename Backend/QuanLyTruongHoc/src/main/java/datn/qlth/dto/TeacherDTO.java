package datn.qlth.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import datn.qlth.entity.Enum.SpecializeLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherDTO {
	
	private Integer teacherID;
	
	private String teacherCode;
	
	private String teacherName;
	
	private String email;
	
	private String phoneNumber;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date birthDay;
	
	private String homeTown;
	
    private SpecializeLevel specializeLevel;
    
    private List<ClassRoomDTO> classrooms;
    
    private List<SubjectDTO> subjects;
    
    @Data
	@NoArgsConstructor
	@AllArgsConstructor
	private static class ClassRoomDTO{
		
		private Integer classRoomID;
		
		private String classRoomCode;
		
		private String classRoomName;
	}
    
    @Data
	@NoArgsConstructor
	@AllArgsConstructor
	private static class SubjectDTO{
		
		private Integer subjectID;
		
		private String subjectCode;
		
		private String subjectName;
	}
}
