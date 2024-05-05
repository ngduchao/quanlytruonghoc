package datn.qlth.service.Impl;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import datn.qlth.dto.CreateRegistrationSubjectDTO;
import datn.qlth.dto.DeleteRegistrationSubjectDTO;
import datn.qlth.dto.RegistrationSubjectDTO;
import datn.qlth.dto.RegistrationSubjectForStudentDTO;
import datn.qlth.dto.ScoreFormDTO;
import datn.qlth.dto.UpdateRegistrationSubjectDTO;
import datn.qlth.dto.filter.RegistrationSubjectFilterForm;
import datn.qlth.entity.RegistrationSubject;
import datn.qlth.entity.Subject;
import datn.qlth.entity.User;
import datn.qlth.repository.RegistrationSubjectRepository;
import datn.qlth.repository.SubjectRepository;
import datn.qlth.repository.UserRepository;
import datn.qlth.service.CSVConstant;
import datn.qlth.service.RegistrationSubjectService;
import datn.qlth.specification.registrationSubject.RegistrationSubjectSpecification;
import jakarta.servlet.http.HttpServletResponse;

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
	public List<RegistrationSubject> getAllRegistrationSubjects(RegistrationSubjectFilterForm filter) {
		
		Specification<RegistrationSubject> where = RegistrationSubjectSpecification.buildWhere(filter);
		
		return repository.findAll(where);
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
		
		Subject subject = subjectRepository.findById(form.getSubjectID()).get();
		
		subject.setActualQuantity(subject.getActualQuantity() + 1);
		
		registrationSubject.setUser(user);
		registrationSubject.setSubject(subject);
		registrationSubject.setFinalScore(diem);
		registrationSubject.setMidtermScore(diem);
		registrationSubject.setRegularPoint1(diem);
		registrationSubject.setRegularPoint2(diem);
		
		return repository.save(registrationSubject);
	}

	@Override
	public RegistrationSubject deleteRegistrationSubject(Integer ID) {
		
		RegistrationSubject registrationSubject = repository.findById(ID).get();
	
		if(registrationSubject.getSubject() != null) {
			Subject subject = subjectRepository.findById(registrationSubject.getSubject().getSubjectID()).get();
			subject.setActualQuantity(subject.getActualQuantity() - 1);
		}
		
		repository.deleteById(ID);
		
		return registrationSubject;
	
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
	public RegistrationSubject updateScoreForRegistrationSubject(Integer ID, ScoreFormDTO form) {
		
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
		
		return repository.save(registrationSubject);
	}

	@Override
	public boolean isExistsRegistrationSubjectByID(Integer ID) {
		return repository.existsById(ID);
	}

	@Override
	public RegistrationSubject createRegistrationSubject(CreateRegistrationSubjectDTO form) {
		
		float diem = 0;
		
		RegistrationSubject registrationSubject = modelMapper.map(form, RegistrationSubject.class);
		
		User user = userRepository.findByUserCode(form.getUserCode());
		
		Subject subject = subjectRepository.findById(form.getSubjectID()).get();
		
		subject.setActualQuantity(subject.getActualQuantity() + 1);
		
		registrationSubject.setUser(user);
		registrationSubject.setSubject(subject);
		registrationSubject.setFinalScore(diem);
		registrationSubject.setMidtermScore(diem);
		registrationSubject.setRegularPoint1(diem);
		registrationSubject.setRegularPoint2(diem);
		
		return repository.save(registrationSubject);
		
	}

	@Override
	public List<RegistrationSubject> getRegistrationSubjectsBySubject(Integer subjectID) {
		
		Subject subject = subjectRepository.findById(subjectID).get();
		
		List<RegistrationSubject> list = repository.findBySubject(subject);
		
		return list;
	}

	@Override
	public boolean isExistsRegistrationSubjectByUser(String userCode, Integer subjectID) {
		
		User user = userRepository.findByUserCode(userCode);
		
		Subject subject = subjectRepository.findById(subjectID).get();

		return repository.existsByUserAndSubject(user, subject);
	}

	@Override
	public List<RegistrationSubject> getRegistrationSubjectByUser(String username) {
		
		User user = userRepository.findByUsername(username).get();
		
		return repository.findByUser(user);
	}

	@Override
	public void exportListRegistrationSubject(HttpServletResponse servletResponse, Integer subjectID) throws IOException {
		
		List<RegistrationSubject> list = getRegistrationSubjectsBySubject(subjectID);
		
		List<RegistrationSubjectDTO> dtos = modelMapper.map(list, new TypeToken<List<RegistrationSubjectDTO>>() {
		}.getType());
		servletResponse.setContentType(CSVConstant.FILETYPE);
		servletResponse.addHeader(CSVConstant.CONTENT_DISPOSITION, CSVConstant.FILE_NAME_TRANSCRIPT);
		writeAccountToCsv(servletResponse.getWriter(), dtos);
	}
	
	public void writeAccountToCsv(Writer writer, List<RegistrationSubjectDTO> dtos) {
		try  {
			writer.write('\uFEFF');
			CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT);
			csvPrinter.printRecord(
					CSVConstant.NO, 
					CSVConstant.USER_CODE,
					CSVConstant.FULL_NAME, 
					CSVConstant.REGULAR_POINT1,
					CSVConstant.REGULAR_POINT2,
					CSVConstant.MIDTERM_SCORE,
					CSVConstant.FINAL_SCORE);

			for (RegistrationSubjectDTO registrationSubject : dtos) {
				int index = dtos.indexOf(registrationSubject) + 1;

				csvPrinter.printRecord(
						index, 
						registrationSubject.getUser().getUserCode(),
						registrationSubject.getUser().getFullName(),
						registrationSubject.getRegularPoint1(),
						registrationSubject.getRegularPoint2(),
						registrationSubject.getMidtermScore(),
						registrationSubject.getFinalScore());
			}
 
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}
}
