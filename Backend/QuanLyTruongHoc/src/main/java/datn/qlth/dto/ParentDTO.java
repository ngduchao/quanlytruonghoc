package datn.qlth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParentDTO {
	
	private Integer parentID;
	
	private String fullName;
	
	private Integer yearOfBirthDay;
	
	private String phoneNumber;
	
	private String job;
	
	private String relationship;

	private UserDTO user;
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class UserDTO{
		
		private String userCode;
		
		private String fullName;
	}
}
