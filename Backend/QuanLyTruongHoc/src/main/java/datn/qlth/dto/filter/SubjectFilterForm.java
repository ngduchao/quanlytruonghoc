package datn.qlth.dto.filter;

import datn.qlth.entity.Enum.SubjectStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectFilterForm {
	
	private String subjectCode;
	
	private String teacherName;
	
	private SubjectStatus subjectStatus;
}
