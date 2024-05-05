package datn.qlth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import datn.qlth.entity.Faculty;

public interface FacultyRepository extends JpaRepository<Faculty, Integer>, JpaSpecificationExecutor<Faculty>{

	public Faculty getFacultyByFacultyCode(String facultyCode);
	
	public boolean existsByFacultyID(Integer ID);
	
	public boolean existsByFacultyCode(String facultyCode);
	
	public boolean existsByFacultyName(String facultyName);
}
