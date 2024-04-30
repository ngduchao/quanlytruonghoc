package datn.qlth.service;

import java.util.List;

import datn.qlth.dto.CreateRegistrationSubjectDTO;
import datn.qlth.dto.DeleteRegistrationSubjectDTO;
import datn.qlth.dto.RegistrationSubjectForStudentDTO;
import datn.qlth.dto.ScoreFormDTO;
import datn.qlth.dto.UpdateRegistrationSubjectDTO;
import datn.qlth.dto.filter.RegistrationSubjectFilterForm;
import datn.qlth.entity.RegistrationSubject;

public interface RegistrationSubjectService {
	
	public List<RegistrationSubject> getAllRegistrationSubjects( RegistrationSubjectFilterForm filter);
	
	public List<RegistrationSubject>  getRegistrationSubjectsBySubject(Integer subjectID);
	
	public List<RegistrationSubject> getRegistrationSubjectByUser(String username);
	
	public RegistrationSubject getRegistrationSubjectByID(Integer ID);
	
	public RegistrationSubject registrationSubjectForStudent(RegistrationSubjectForStudentDTO form);
	
	public RegistrationSubject deleteRegistrationSubject(Integer ID);
	
	public RegistrationSubject createRegistrationSubject(CreateRegistrationSubjectDTO form);
	
	public void deleteRegistrationSubjectForStudent(DeleteRegistrationSubjectDTO form);
	
	public void updateRegistrationSubjectForStudent(Integer ID ,UpdateRegistrationSubjectDTO form);
	
	public RegistrationSubject updateScoreForRegistrationSubject(Integer ID ,ScoreFormDTO form);
	
	public boolean isExistsRegistrationSubjectByID(Integer ID);
	
	public boolean isExistsRegistrationSubjectByUser(String userCode, Integer subjectID);
}
