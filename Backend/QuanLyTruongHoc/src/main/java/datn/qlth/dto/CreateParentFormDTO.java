package datn.qlth.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateParentFormDTO {
	
	@NotBlank(message = "The firstName mustn't be null value")
	@Length(max = 50, message = "The firstName length is max 50 characters")
	@Length(min = 6, message = "The firstName length is min 6 characters")
	private String firstName;
	
	@NotBlank(message = "The lastName mustn't be null value")
	@Length(max = 50, message = "The lastName length is max 50 characters")
	@Length(min = 6, message = "The lastName length is min 6 characters")
	private String lastName;
	
	@Max(value = 1994, message = "Parent's age must be greater than 30 years old")
	private Integer yearOfBirthDay;
	
	@Pattern(regexp = "^\\d{10}$", message = "Phone number must have exactly 10 digits")
	private String phoneNumber;
	
	@NotBlank(message = "The job mustn't be null value")
	@Length(max = 50, message = "The job length is max 50 characters")
	@Length(min = 6, message = "The job length is min 6 characters")
	private String job;
	
	@NotBlank(message = "The relationship mustn't be null value")
	@Length(max = 20, message = "The relationship length is max 20 characters")
	@Length(min = 6, message = "The relationship length is min 6 characters")
	private String relationship;
}
