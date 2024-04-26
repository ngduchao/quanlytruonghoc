package datn.qlth.dto.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectFilterForm {
	
	private String subjectCode;
	
	private String teacherName;
}
