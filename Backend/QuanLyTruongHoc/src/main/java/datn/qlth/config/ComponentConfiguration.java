package datn.qlth.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ComponentConfiguration {
	
//	@Bean
//	public ModelMapper initModelMapper() {
//		
//		ModelMapper modelMapper = new ModelMapper();
//        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);
//
//        return modelMapper;
//	}
	
	@Bean
	public ModelMapper initModelMapper() {
		
		
		return new ModelMapper();
	}
}
