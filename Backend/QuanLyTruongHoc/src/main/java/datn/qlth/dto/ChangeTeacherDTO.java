package datn.qlth.dto;

import datn.qlth.validation.classroom.ClassroomCodeExists;
import datn.qlth.validation.teacher.TeacherCodeExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeTeacherDTO {
	
	@TeacherCodeExists
	private String teacherCode;
	
	@ClassroomCodeExists
	private String classRoomCode;
}
