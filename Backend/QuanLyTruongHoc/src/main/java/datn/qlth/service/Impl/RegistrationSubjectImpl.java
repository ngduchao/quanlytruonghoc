package datn.qlth.service.Impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import datn.qlth.dto.DeleteRegistrationSubjectDTO;
import datn.qlth.dto.RegistrationSubjectForStudentDTO;
import datn.qlth.dto.ScoreFormDTO;
import datn.qlth.dto.UpdateRegistrationSubjectDTO;
import datn.qlth.entity.RegistrationSubject;
import datn.qlth.entity.Subject;
import datn.qlth.entity.User;
import datn.qlth.repository.RegistrationSubjectRepository;
import datn.qlth.repository.SubjectRepository;
import datn.qlth.repository.UserRepository;
import datn.qlth.service.RegistrationSubjectService;

@Service
public class RegistrationSubjectImpl implements RegistrationSubjectService{
	
	@Autowired
	private RegistrationSubjectRepository repository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SubjectRepository subjectRepository;

	@Override
	public List<RegistrationSubject> getAllRegistrationSubjects() {
		
		return repository.findAll();
	}

	@Override
	public RegistrationSubject getRegistrationSubjectByID(Integer ID) {
		return repository.findById(ID).get();
	}

	@Override
	public RegistrationSubject registrationSubjectForStudent(RegistrationSubjectForStudentDTO form) {
		
		float diem = 0;
		
		RegistrationSubject registrationSubject = modelMapper.map(form, RegistrationSubject.class);
		
		User user = userRepository.findByUserCode(form.getUserCode());
		
		Subject subject = subjectRepository.findBySubjectCode(form.getSubjectCode());
		
		registrationSubject.setUser(user);
		registrationSubject.setSubject(subject);
		registrationSubject.setFinalScore(diem);
		registrationSubject.setMidtermScore(diem);
		registrationSubject.setRegularPoint1(diem);
		registrationSubject.setRegularPoint2(diem);
		
		return repository.save(registrationSubject);
	}

	@Override
	public void deleteRegistrationSubject(Integer ID) {
		
		repository.deleteById(ID);
	}

	@Override
	public void deleteRegistrationSubjectForStudent(DeleteRegistrationSubjectDTO form) {
		
		User user = userRepository.findById(form.getUserID()).get();
		
		Subject subject = subjectRepository.findById(form.getSubjectID()).get();
		
		List<RegistrationSubject> list = repository.findAll();
		
		for (RegistrationSubject registrationSubject : list) {
			if(registrationSubject.getUser().getUserID() == user.getUserID() && registrationSubject.getSubject().getSubjectID() == subject.getSubjectID()) {
				repository.deleteById(registrationSubject.getRegistrationSubjectID());
			}
		}
	}

	@Override
	public void updateRegistrationSubjectForStudent(Integer ID, UpdateRegistrationSubjectDTO form) {
		
		RegistrationSubject registrationSubject = repository.findById(ID).get();
		
		Subject subject = subjectRepository.findBySubjectCode(form.getSubjectCode());
		
		registrationSubject.setSubject(subject);
		
		repository.save(registrationSubject);
	}

	@Override
	public void updateScoreForRegistrationSubject(Integer ID, ScoreFormDTO form) {
		
		RegistrationSubject registrationSubject = repository.findById(ID).get();
		
		if(form.getRegularPoint1() == null) {
			form.setRegularPoint1(registrationSubject.getRegularPoint1());
		}
		if(form.getRegularPoint2() == null) {
			form.setRegularPoint2(registrationSubject.getRegularPoint2());
		}
		if(form.getMidtermScore() == null) {
			form.setMidtermScore(registrationSubject.getMidtermScore());
		}
		if(form.getFinalScore() == null) {
			form.setFinalScore(registrationSubject.getFinalScore());
		}
		
		registrationSubject.setRegularPoint1(form.getRegularPoint1());
		registrationSubject.setRegularPoint2(form.getRegularPoint2());
		registrationSubject.setMidtermScore(form.getMidtermScore());
		registrationSubject.setFinalScore(form.getFinalScore());
		
		repository.save(registrationSubject);
	}

	@Override
	public boolean isExistsRegistrationSubjectByID(Integer ID) {
		return repository.existsById(ID);
	}
}
