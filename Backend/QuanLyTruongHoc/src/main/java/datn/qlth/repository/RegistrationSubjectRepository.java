package datn.qlth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import datn.qlth.entity.RegistrationSubject;
import datn.qlth.entity.Subject;
import datn.qlth.entity.User;

public interface RegistrationSubjectRepository extends JpaRepository<RegistrationSubject, Integer>, JpaSpecificationExecutor<RegistrationSubject>{

	public List<RegistrationSubject> findByUser(User user);
	
	public List<RegistrationSubject> findBySubject(Subject subject);
	
	public boolean existsByUserAndSubject(User user, Subject subject);
}	
