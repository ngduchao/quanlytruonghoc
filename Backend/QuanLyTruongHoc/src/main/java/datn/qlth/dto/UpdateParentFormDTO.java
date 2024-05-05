package datn.qlth.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateParentFormDTO {
	
	@Length(max = 50, message = "The firstName length is max 50 characters")
	@Length(min = 6, message = "The firstName length is min 6 characters")
	private String firstName;
	
	@Length(max = 50, message = "The lastName length is max 50 characters")
	@Length(min = 6, message = "The lastName length is min 6 characters")
	private String lastName;
	
	@Max(value = 1994, message = "Parent's age must be greater than 30 years old")
	private Integer yearOfBirthDay;
	
	@Pattern(regexp = "^\\d{10}$", message = "Phone number must have exactly 10 digits")
	private String phoneNumber;
	
	@Length(max = 50, message = "The job length is max 50 characters")
	@Length(min = 6, message = "The job length is min 6 characters")
	private String job;
	
	@Length(max = 20, message = "The relationship length is max 20 characters")
	@Length(min = 6, message = "The relationship length is min 6 characters")
	private String relationship;
}
