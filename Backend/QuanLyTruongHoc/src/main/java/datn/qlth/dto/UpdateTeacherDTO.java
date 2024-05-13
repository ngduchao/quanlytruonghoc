package datn.qlth.dto;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonFormat;

import datn.qlth.entity.Enum.SpecializeLevel;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTeacherDTO {
	
	@Length(max = 20, message = "The teacherCode length is max 20 characters")
	@Length(min = 6, message = "The teacherCode length is min 6 characters")
	private String teacherCode;
	
	@Length(max = 20, message = "The teacherName length is max 50 characters")
	@Length(min = 6, message = "The teacherName length is min 6 characters")
	private String teacherName;
	
	@Length(max = 50, message = "The email's length is max 50 characters")
	@Length(min = 6, message = "The email's length is min 6 characters")
	@Email
	private String email;
	
	@Pattern(regexp = "^\\d{10}$", message = "Phone number must have exactly 10 digits")
	private String phoneNumber;
	
	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date birthDay;
	
	@NotBlank(message = "The home town mustn't be null value")
	private String homeTown;
	
	@Pattern(regexp = "TIENSI|THACSI|DAIHOC", message = "The specializeLevel must be TIENSI or THACSI or DAIHOC")
    private SpecializeLevel specializeLevel;
}
