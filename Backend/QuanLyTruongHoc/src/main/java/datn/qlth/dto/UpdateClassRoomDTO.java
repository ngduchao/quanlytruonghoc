package datn.qlth.dto;

import org.hibernate.validator.constraints.Length;

import datn.qlth.validation.major.MajorIDExists;
import datn.qlth.validation.teacher.TeacherIDExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateClassRoomDTO {
	
	@Length(max = 30, message = "The classRoomCode length is max 30 characters")
	@Length(min = 6, message = "The classRoomCode length is min 6 characters")
	private String classRoomCode;
	
	@Length(max = 50, message = "The classRoomName length is max 50 characters")
	@Length(min = 6, message = "The classRoomName length is min 6 characters")
	private String classRoomName;
	
	private Integer course;
	
	@MajorIDExists
	private Integer majorID;
	
	@TeacherIDExists
	private Integer teacherID;
}
