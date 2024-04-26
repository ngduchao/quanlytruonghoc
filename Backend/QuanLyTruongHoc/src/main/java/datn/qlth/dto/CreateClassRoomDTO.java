package datn.qlth.dto;

import org.hibernate.validator.constraints.Length;

import datn.qlth.validation.classroom.ClassroomCodeNotExists;
import datn.qlth.validation.classroom.ClassroomNameNotExists;
import datn.qlth.validation.major.MajorCodeExists;
import datn.qlth.validation.teacher.TeacherIDExists;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateClassRoomDTO {
	
	@NotBlank(message = "The classRoomCode mustn't be null value")
	@Length(max = 30, message = "The classRoomCode length is max 30 characters")
	@Length(min = 6, message = "The classRoomCode length is min 6 characters")
	@ClassroomCodeNotExists
	private String classRoomCode;
	
	@NotBlank(message = "The classRoomName mustn't be null value")
	@Length(max = 50, message = "The classRoomName length is max 50 characters")
	@Length(min = 6, message = "The classRoomName length is min 6 characters")
	@ClassroomNameNotExists
	private String classRoomName;
	
	private Integer course;

	@MajorCodeExists
	private String majorCode;
	
	@TeacherIDExists
	private String teacherCode;
}
