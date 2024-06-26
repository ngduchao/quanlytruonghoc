package datn.qlth.dto;

import org.hibernate.validator.constraints.Length;

import datn.qlth.entity.Enum.SubjectStatus;
import datn.qlth.validation.major.MajorIDExists;
import datn.qlth.validation.subject.SubjectCodeNotExists;
import datn.qlth.validation.teacher.TeacherIDExists;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSubjectDTO {
	
	private Integer subjectID = null;
	
	@NotBlank(message = "The subjectCode mustn't be null value")
	@Length(max = 30, message = "The subjectCode length is max 30 characters")
	@Length(min = 6, message = "The subjectCode length is min 6 characters")
	@SubjectCodeNotExists
	private String subjectCode;
	
	@NotBlank(message = "The subjectName mustn't be null value")
	@Length(max = 100, message = "The subjectName length is max 100 characters")
	@Length(min = 6, message = "The subjectName length is min 6 characters")
	private String subjectName;
	
	@Min(value = 0, message = "The numberOfCredit must be greater than 0")
	private Integer numberOfCredit;
	
	@Pattern(regexp = "OPEN|CLOSE", message = "The subjectStatus must be OPEN or CLOSE")
	private SubjectStatus subjectStatus;
	
	@TeacherIDExists
	private Integer teacherID;
	
	@MajorIDExists
	private Integer majorID;
}
