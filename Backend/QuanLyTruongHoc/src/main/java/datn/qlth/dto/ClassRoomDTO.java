package datn.qlth.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassRoomDTO {
	
	private Integer classRoomID;
	
	private String classRoomCode;
	
	private String classRoomName;
	
	private Integer quantity;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date createdDate;
	
	private Integer course;
	
	private MajorDTO major;
	
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
