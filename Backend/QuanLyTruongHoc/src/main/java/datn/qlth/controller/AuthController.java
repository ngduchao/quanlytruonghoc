package datn.qlth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import datn.qlth.config.security.JwtUtil;
import datn.qlth.dto.AuthRequest;
import datn.qlth.dto.AuthResponse;
import datn.qlth.service.CustomerDetailsService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
@ResponseBody
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private CustomerDetailsService customerDetailsService;
	
	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception{
		try {
			authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password");
		}
		
		final UserDetails userDetails = customerDetailsService
                .loadUserByUsername(authRequest.getUsername());
		
		final String jwt = jwtUtil.generateToken(userDetails);
		
		AuthResponse authResponse = new AuthResponse(jwt, userDetails);
		
		return ResponseEntity.ok(authResponse);
	}
}
