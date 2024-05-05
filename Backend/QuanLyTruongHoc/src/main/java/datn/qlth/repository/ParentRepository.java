package datn.qlth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import datn.qlth.entity.Parent;
import datn.qlth.entity.User;

public interface ParentRepository extends JpaRepository<Parent, Integer>,  JpaSpecificationExecutor<Parent>{
	
	public List<Parent> findByUser(User user);
	
	public boolean existsByParentID(Integer ID);
}
