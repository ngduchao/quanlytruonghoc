package datn.qlth.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import datn.qlth.entity.Enum.Gender;
import datn.qlth.entity.Enum.Role;
import datn.qlth.entity.Enum.UserStatus;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserDTO {
	
	private Long userID;
	
	private String userCode;
	
	private String username;
	
	private String password;
	
	private String email;
	
	private String firstName;
	
	private String lastName;
	
	private String phoneNumber;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date birthDay;
	
	private String homeTown;
	
	private Gender gender;
	
    private Role role;
	
	private UserStatus status;
	
	private ClassRoomDTO classroom;
	
	@Data
	@RequiredArgsConstructor
	public static class ClassRoomDTO{
		
		private Integer classRoomID;
		
		private String classRoomCode;
		
		private String classRoomName;
		
		private Integer course;
	}


}
