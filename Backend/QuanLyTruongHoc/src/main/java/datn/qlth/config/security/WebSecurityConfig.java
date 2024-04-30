package datn.qlth.config.security;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import datn.qlth.filter.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((request) -> request
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/users/get-registration-subject-by-user").hasAuthority("USER")
                        .requestMatchers("/api/v1/users/delete-registration-subject").hasAuthority("USER")
                        .requestMatchers("/api/v1/users/registration-subject").hasAuthority("USER")
                        .requestMatchers("/api/v1/registration-subjects/get-registration-subject-by-username").hasAuthority("USER")
                        .requestMatchers("/api/v1/registration-subjects/create-registration-subject").permitAll()
                        .requestMatchers("/api/v1/subjects/get-list-subject").hasAnyAuthority("USER", "ADMIN")
                        .requestMatchers("/api/v1/users/update-user/{id}").permitAll()
                        .requestMatchers("/api/v1/users/resetPasswordRequest").permitAll()
                        .requestMatchers("/api/v1/users/changePassword").permitAll()
                        .requestMatchers("/api/v1/users/get-user-by-username").permitAll()
                        .requestMatchers("/api/v1/users/email/{email}").permitAll()
                        .requestMatchers("/api/v1/parents/create-parent-to-user").permitAll()
                        .requestMatchers("/api/v1/parents/delete-parent/{id}").permitAll()
                        .requestMatchers("/api/v1/parents/update-parent/{id}").permitAll()
                        .requestMatchers("/api/v1/users/profile").permitAll()
                        .requestMatchers("/api/v1/users/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/faculties/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/subjects/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/classromms/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/teachers/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/registration-subjects/**").permitAll()
                        .requestMatchers("/api/v1/parents/**").hasAuthority("ADMIN")
                        .anyRequest().permitAll())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.applyPermitDefaultValues();

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
