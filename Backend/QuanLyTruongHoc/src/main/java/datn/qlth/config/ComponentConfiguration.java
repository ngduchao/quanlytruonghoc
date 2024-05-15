package datn.qlth.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class ComponentConfiguration {
	
	@Bean
	public ModelMapper initModelMapper() {

		return new ModelMapper();
	}
	
	@Bean
	public Cloudinary cloudinary() {
		Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
				"cloud_name", "disazz1iu",
				"api_key"	, "763416229961863",
				"api_secret", "CoiZR1zET5Dlw03f3f77OnInKcQ"
				
		));
		return cloudinary;
	}
}
