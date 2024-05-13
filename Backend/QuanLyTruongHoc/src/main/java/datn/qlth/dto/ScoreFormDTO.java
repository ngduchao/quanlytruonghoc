package datn.qlth.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScoreFormDTO {
	
	@Min(value = 0, message = "The regularPoint1 must be greater than 0")
	@Max(value = 10, message = "The regularPoint1 must be less than or equal to 10")
	private Float regularPoint1;
	
	@Min(value = 0, message = "The regularPoint2 must be greater than 0")
	@Max(value = 10, message = "The regularPoint2 must be less than or equal to 10")
	private Float regularPoint2;
	
	@Min(value = 0, message = "The midtermScore must be greater than 0")
	@Max(value = 10, message = "The midtermScore must be less than or equal to 10")
	private Float midtermScore;
	
	@Min(value = 0, message = "The finalScore must be greater than 0")
	@Max(value = 10, message = "The finalScore must be less than or equal to 10")
	private Float finalScore;
}
