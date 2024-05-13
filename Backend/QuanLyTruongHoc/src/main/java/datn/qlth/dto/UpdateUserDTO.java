package datn.qlth.dto;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonFormat;

import datn.qlth.entity.Enum.Gender;
import datn.qlth.validation.classroom.ClassroomIDExists;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDTO {

	@Length(max = 50, message = "The email's length is max 50 characters")
	@Length(min = 6, message = "The email's length is min 6 characters")
	@Email
	private String email;
	
	private String firstName;
	
	private String lastName;
	
	@Pattern(regexp = "^\\d{10}$", message = "Phone number must have exactly 10 digits")
	private String phoneNumber;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date birthDay;
	
	private String homeTown;
	
	private Gender gender;
	
//	@ClassroomIDExists
	private Integer classRoomID;
}
