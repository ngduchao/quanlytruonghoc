package datn.qlth.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import datn.qlth.dto.AddSubjectToMajorDTO;
import datn.qlth.dto.CreateSubjectDTO;
import datn.qlth.dto.UpdateSubjectDTO;
import datn.qlth.dto.filter.SubjectFilterForm;
import datn.qlth.entity.Subject;

public interface SubjectService {
	
	public Page<Subject> getAllSubjects(Pageable pageable, String search, SubjectFilterForm filter);
	
	public Subject getSubjectByID(Integer ID);
	
	public Subject getSubjectBySubjectCode(String subjectCode);
	
	public Subject createSubject(CreateSubjectDTO form);
	
	public Subject updateSubject(Integer ID, UpdateSubjectDTO form);
	
	public Subject deleteSubjectByID(Integer ID);
	
	public void deleteSubjectBySubjectCode(String subjectCode);
	
	public void addSubjectToMajor(AddSubjectToMajorDTO form);
	
	public boolean isSubjectExistsBySubjectID(Integer ID);
	
	public boolean isSubjectExistsBySubjectCode(String subjectCode);
	
	public boolean isSubjectExistsBySubjectName(String subjectName);
}
