package datn.qlth.dto.filter;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassRoomFilterForm {
	
	private String classRoomCode;
	
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	private Date minTimeCreated;
	
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	private Date maxTimeCreated;
	
	private String majorName;
}
