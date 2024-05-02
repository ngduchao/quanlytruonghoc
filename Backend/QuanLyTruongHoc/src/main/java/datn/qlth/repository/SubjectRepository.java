package datn.qlth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import datn.qlth.entity.Major;
import datn.qlth.entity.Subject;
import datn.qlth.entity.Enum.SubjectStatus;

public interface SubjectRepository extends JpaRepository<Subject, Integer>, JpaSpecificationExecutor<Subject>{
	
	public Subject findBySubjectCode(String subjectStringCode);
	
	public boolean existsBySubjectID(Integer ID);
	
	public boolean existsBySubjectCode(String subjectCode);
	
	public boolean existsBySubjectName(String subjectName);
	
	public boolean existsBySubjectCodeAndSubjectName(String subjectCode, String subjectName);
	
	public List<Subject> findBySubjectStatusAndMajor(SubjectStatus SubjectStatus, Major major);
}
