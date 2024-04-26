package datn.qlth.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NumberOfStudentsInClass extends ClassRoomDTO{

	private List<UsersDTO> users;
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class UsersDTO{
		
		private Integer userID;
		
		private String username;
		
		private String fullName;
	}
}
