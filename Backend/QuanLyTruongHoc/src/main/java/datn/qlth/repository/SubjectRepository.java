package datn.qlth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import datn.qlth.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Integer>, JpaSpecificationExecutor<Subject>{
	
	public Subject findBySubjectCode(String subjectStringCode);
	
	public boolean existsBySubjectID(Integer ID);
	
	public boolean existsBySubjectCode(String subjectCode);
	
	public boolean existsBySubjectName(String subjectName);
}
