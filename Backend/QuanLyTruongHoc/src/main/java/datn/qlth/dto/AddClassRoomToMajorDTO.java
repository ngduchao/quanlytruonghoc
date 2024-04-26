package datn.qlth.dto;

import datn.qlth.validation.classroom.ClassroomCodeExists;
import datn.qlth.validation.major.MajorCodeExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddClassRoomToMajorDTO {
	
	@MajorCodeExists
	private String majorCode;
	
	@ClassroomCodeExists
	private String classRoomCode;
}
