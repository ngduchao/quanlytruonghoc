package datn.qlth.dto;

import java.util.Date;
import java.util.List;

import datn.qlth.entity.Enum.Gender;
import datn.qlth.entity.Enum.UserStatus;
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
		
		private String userCode;
		
		private String firstName;
		
		private String lastName;
		
		private Date birthDay;
		
		private Gender gender;
		
		private String email;
		
		private String phoneNumber;
		
		private String homeTown;
		
		private UserStatus status;
	}
}
