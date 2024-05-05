package datn.qlth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacultyDTO {
	
	private Integer facultyID;

	private String facultyCode;
	
	private String facultyName;
}
