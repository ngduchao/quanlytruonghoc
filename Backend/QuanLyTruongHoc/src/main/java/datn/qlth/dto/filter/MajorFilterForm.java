package datn.qlth.dto.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MajorFilterForm {
	
	private String majorCode;
	
	private String facultyName;
}
