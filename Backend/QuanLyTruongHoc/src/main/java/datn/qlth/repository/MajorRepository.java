package datn.qlth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import datn.qlth.entity.Faculty;
import datn.qlth.entity.Major;

public interface MajorRepository extends JpaRepository<Major, Integer>, JpaSpecificationExecutor<Major>{

	public Major findByMajorCode(String majorCode);
	
	public List<Major> findByFaculty(Faculty faculty);
	
	public boolean existsByMajorID(Integer ID);
	
	public boolean existsByMajorCode(String majorCode);
	
	public boolean existsByMajorName(String majorName);
}
