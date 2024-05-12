package datn.qlth.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import datn.qlth.entity.Enum.SpecializeLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherDeleteDTO {
	
	private Integer teacherID;
	
	private String teacherCode;
	
	private String teacherName;
	
	private String email;
	
	private String phoneNumber;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date birthDay;
	
	private String homeTown;
	
    private SpecializeLevel specializeLevel;

}