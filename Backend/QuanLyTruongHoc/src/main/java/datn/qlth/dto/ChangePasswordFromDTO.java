package datn.qlth.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ChangePasswordFromDTO {
	
	private String oldPassword;
	
	private String newPassword;
}
