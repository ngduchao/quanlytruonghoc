package datn.qlth.dto;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonFormat;

import datn.qlth.entity.Enum.Gender;
import datn.qlth.entity.Enum.Role;
import datn.qlth.entity.Enum.UserStatus;
import datn.qlth.validation.classroom.ClassroomIDExists;
import datn.qlth.validation.user.EmailNotExists;
import datn.qlth.validation.user.UserCodeNotExists;
import datn.qlth.validation.user.UsernameNotExists;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserDTO {
	
	private Long userID = null;
	
	@NotBlank(message = "The userCode mustn't be null value")
	@Length(max = 20, message = "The userCode length is max 20 characters")
	@Length(min = 6, message = "The userCode length is min 6 characters")
	@UserCodeNotExists
	private String userCode;

	@NotBlank(message = "The username mustn't be null value")
	@Length(max = 50, message = "The username's length is max 50 characters")
	@Length(min = 6, message = "The username's length is min 6 characters")
	@UsernameNotExists
	private String username;
	
	@NotBlank(message = "The email mustn't be null value")
	@Length(max = 50, message = "The email's length is max 50 characters")
	@Length(min = 6, message = "The email's length is min 6 characters")
	@Email
	@EmailNotExists
	private String email;
	
	@NotBlank(message = "The password mustn't be null value")
	private String password;
	
	@NotBlank(message = "The first name mustn't be null value")
	private String firstName;
	
	@NotBlank(message = "The last name mustn't be null value")
	private String lastName;
	
	@Pattern(regexp = "^\\d{10}$", message = "Phone number must have exactly 10 digits")
	private String phoneNumber;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date birthDay;
	
	@NotBlank(message = "The home town mustn't be null value")
	private String homeTown;
	
	@Pattern(regexp = "ADMIN|USER", message = "The role must be ADMIN or USER")
	private Role role;
	
	@Pattern(regexp = "MALE|FEMALE", message = "The role must be MALE or FEMALE")
	private Gender gender;
	
	@ClassroomIDExists
	private Integer classRoomID;
	
	@Pattern(regexp = "NOT_STUDYING, STUDYING", message = "The status must be NOT_STUDYING or STUDYING")
	private UserStatus status;
}
