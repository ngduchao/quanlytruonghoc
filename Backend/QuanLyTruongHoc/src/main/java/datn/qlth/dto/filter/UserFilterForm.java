package datn.qlth.dto.filter;

import datn.qlth.entity.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFilterForm {
	
	private Role role;
	
	private String classRoomName;
}
