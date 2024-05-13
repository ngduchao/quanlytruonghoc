package datn.qlth.dto;

import datn.qlth.validation.classroom.ClassroomCodeExists;
import datn.qlth.validation.user.UsernameExists;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddUserToClassDTO {
	
	@UsernameExists
	private String username;
	
	@ClassroomCodeExists
	private String classRoomCode;
}
