package datn.qlth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import datn.qlth.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User>{
	
	Optional<User> findByUsername (String username);
	
	public User findByUserCode(String userCode);
	
	public User findByEmail(String email);
	
	public boolean existsByUsername(String username);
	
	public boolean existsByUserCode(String userCode);
	
	public boolean existsByEmail(String email);
	
	public boolean existsByPhoneNumber(String phoneNumber);
	
	public List<User> findByRole(String role);
}
