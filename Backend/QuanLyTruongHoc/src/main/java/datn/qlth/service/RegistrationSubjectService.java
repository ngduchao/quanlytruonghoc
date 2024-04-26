package datn.qlth.service;

import java.util.List;

import datn.qlth.dto.DeleteRegistrationSubjectDTO;
import datn.qlth.dto.RegistrationSubjectForStudentDTO;
import datn.qlth.dto.ScoreFormDTO;
import datn.qlth.dto.UpdateRegistrationSubjectDTO;
import datn.qlth.entity.RegistrationSubject;

public interface RegistrationSubjectService {
	
	public List<RegistrationSubject> getAllRegistrationSubjects();
	
	public RegistrationSubject getRegistrationSubjectByID(Integer ID);
	
	public RegistrationSubject registrationSubjectForStudent(RegistrationSubjectForStudentDTO form);
	
	public void deleteRegistrationSubject(Integer ID);
	
	public void deleteRegistrationSubjectForStudent(DeleteRegistrationSubjectDTO form);
	
	public void updateRegistrationSubjectForStudent(Integer ID ,UpdateRegistrationSubjectDTO form);
	
	public void updateScoreForRegistrationSubject(Integer ID ,ScoreFormDTO form);
	
	public boolean isExistsRegistrationSubjectByID(Integer ID);
}
