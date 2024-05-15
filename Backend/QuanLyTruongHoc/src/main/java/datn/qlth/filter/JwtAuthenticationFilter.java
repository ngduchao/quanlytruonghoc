package datn.qlth.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import datn.qlth.config.security.JwtUtil;
import datn.qlth.service.CustomerDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	private CustomerDetailsService customerDetailsService;
	
	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		if (isAuthOrSignUpPath(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }
		
		String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(token);
            } catch (IllegalArgumentException e) {
                logger.warn("Unable to get JWT Token!");
            } catch (ExpiredJwtException e) {
                logger.warn("JWT Token has expired!");
            }
        }
        
     // Mỗi lần get token thì validate nó
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails accountDetails = customerDetailsService.loadUserByUsername(username);

            // Nếu token hợp lệ
            if (jwtUtil.validateToken(token, accountDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(accountDetails, null, accountDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));


                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        filterChain.doFilter(request, response);
        
	}
	
	private boolean isAuthOrSignUpPath(String requestURI) {
        return requestURI.contains("/api/v1/auth/") || requestURI.contains("/api/v1/signup/");
    }
	
	
}
