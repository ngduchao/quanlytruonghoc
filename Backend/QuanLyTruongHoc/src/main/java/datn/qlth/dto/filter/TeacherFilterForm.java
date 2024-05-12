package datn.qlth.dto.filter;

import datn.qlth.entity.Enum.SpecializeLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherFilterForm {
	
	private SpecializeLevel specializeLevel;
	
	private Integer classRoomID;
}
