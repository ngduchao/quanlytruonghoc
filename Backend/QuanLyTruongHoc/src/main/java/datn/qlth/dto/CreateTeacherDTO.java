package datn.qlth.dto;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonFormat;

import datn.qlth.entity.Enum.SpecializeLevel;
import datn.qlth.validation.teacher.TeacherCodeNotExists;
import datn.qlth.validation.teacher.TeacherNameNotExists;
import datn.qlth.validation.user.EmailNotExists;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTeacherDTO {
	
	@NotBlank(message = "The teacherCode mustn't be null value")
	@Length(max = 20, message = "The teacherCode length is max 20 characters")
	@Length(min = 6, message = "The teacherCode length is min 6 characters")
	@TeacherCodeNotExists
	private String teacherCode;
	
	@NotBlank(message = "The teacherName mustn't be null value")
	@Length(max = 50, message = "The teacherName length is max 50 characters")
	@Length(min = 6, message = "The teacherName length is min 6 characters")
	@TeacherNameNotExists
	private String teacherName;
	
	@NotBlank(message = "The email mustn't be null value")
	@Length(max = 50, message = "The email's length is max 50 characters")
	@Length(min = 6, message = "The email's length is min 6 characters")
	@Email
	@EmailNotExists
	private String email;
	
	@Pattern(regexp = "^\\d{10}$", message = "Phone number must have exactly 10 digits")
	private String phoneNumber;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date birthDay;
	
	@NotBlank(message = "The home town mustn't be null value")
	private String homeTown;
	
	@Pattern(regexp = "TIENSI|THACSI|DAIHOC", message = "The specializeLevel must be TIENSI or THACSI or DAIHOC")
    private SpecializeLevel specializeLevel;
	
	
}
