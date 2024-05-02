package datn.qlth.service.Impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import datn.qlth.dto.AddSubjectToMajorDTO;
import datn.qlth.dto.CreateSubjectDTO;
import datn.qlth.dto.UpdateSubjectDTO;
import datn.qlth.dto.filter.SubjectFilterForm;
import datn.qlth.entity.Major;
import datn.qlth.entity.Subject;
import datn.qlth.entity.Teacher;
import datn.qlth.entity.Enum.SubjectStatus;
import datn.qlth.repository.MajorRepository;
import datn.qlth.repository.SubjectRepository;
import datn.qlth.repository.TeacherRepository;
import datn.qlth.service.SubjectService;
import datn.qlth.specification.subject.SubjectSpecification;

@Service
public class SubjectServiceImpl implements SubjectService{
	
	@Autowired
	private SubjectRepository repository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private MajorRepository majorRepository;
	
	@Autowired
	private TeacherRepository teacherRepository;

	@Override
	public Page<Subject> getAllSubjects(Pageable pageable, String search, SubjectFilterForm filter) {
		
		Specification<Subject> where = SubjectSpecification.buildWhere(search, filter);
		
		return repository.findAll(where, pageable);
	}
	
	@Override
	public List<Subject> getListSubjects() {
		
		return repository.findAll();
	}

	@Override
	public Subject getSubjectByID(Integer ID) {
		return repository.findById(ID).get();
	}

	@Override
	public Subject getSubjectBySubjectCode(String subjectCode) {
		return repository.findBySubjectCode(subjectCode);
	}

	@Override
	public Subject createSubject(CreateSubjectDTO form) {
		
		Teacher teacher = teacherRepository.findById(form.getTeacherID()).get();
		
		Major major = majorRepository.findById(form.getMajorID()).get();
		
		Subject subject = modelMapper.map(form, Subject.class);
		
		subject.setActualQuantity(0);
		subject.setMaxQuantity(70);
		subject.setTeacher(teacher);
		subject.setMajor(major);
		
		return repository.save(subject);
	}

	@Override
	public Subject updateSubject(Integer ID, UpdateSubjectDTO form) {
		
		Subject subject = repository.findById(ID).get();
		
		Teacher teacher = teacherRepository.findById(form.getTeacherID()).get();
		
		Major major = majorRepository.findById(form.getMajorID()).get();
		
		if(form.getSubjectCode() == null || form.getSubjectCode().isEmpty()) {
			form.setSubjectCode(subject.getSubjectCode());
		}
		if(form.getSubjectName() == null || form.getSubjectName().isEmpty()) {
			form.setSubjectName(subject.getSubjectName());
		}
		if(form.getNumberOfCredit() == null) {
			form.setNumberOfCredit(subject.getNumberOfCredit());
		}
		
		if(subject.getTeacher() != null) {
			if(subject.getTeacher().getTeacherID() != form.getTeacherID()) {
				subject.setTeacher(teacher);
			}else {
				subject.setTeacher(teacher);
			}
		}
		if(subject.getTeacher() == null) {
			if(form.getTeacherID() != null) {
				subject.setTeacher(teacher);
			}
		}
		
		if(subject.getMajor() != null) {
			if(subject.getMajor().getMajorID() != form.getMajorID()) {
				subject.setMajor(major);
			}else {
				subject.setMajor(major);
			}
		}
		
		subject.setSubjectCode(form.getSubjectCode());
		subject.setSubjectName(form.getSubjectName());
		subject.setNumberOfCredit(form.getNumberOfCredit());
		subject.setSubjectStatus(form.getSubjectStatus());
		
		return repository.save(subject);
	}

	@Override
	public Subject deleteSubjectByID(Integer ID) {
		
		Subject subject = repository.findById(ID).get();
		
		repository.deleteById(ID);
		
		return subject;
	}

	@Override
	public void deleteSubjectBySubjectCode(String subjectCode) {
		
		Subject subject = repository.findBySubjectCode(subjectCode);
		
		repository.deleteById(subject.getSubjectID());
	}

	@Override
	public void addSubjectToMajor(AddSubjectToMajorDTO form) {
		
		Subject subject = repository.findBySubjectCode(form.getSubjectCode());
		
		Major major = majorRepository.findByMajorCode(form.getMajorCode());
		
		subject.setMajor(major);
		
		repository.save(subject);
	}

	@Override
	public boolean isSubjectExistsBySubjectID(Integer ID) {
		return repository.existsBySubjectID(ID);
	}

	@Override
	public boolean isSubjectExistsBySubjectCode(String subjectCode) {
		return repository.existsBySubjectCode(subjectCode);
	}

	@Override
	public boolean isSubjectExistsBySubjectName(String subjectName) {
		return repository.existsBySubjectName(subjectName);
	}

	@Override
	public boolean isSubjectExistsBySubjectCodeAndSubjectName(String subjectCode, String subjectName) {
		return repository.existsBySubjectCodeAndSubjectName(subjectCode, subjectName);
	}

	@Override
	public List<Subject> getListSubjectBySubjectStatus(SubjectStatus subjectStatus, Integer majorID) {
		
		Major major = majorRepository.findById(majorID).get();
		
		return repository.findBySubjectStatusAndMajor(subjectStatus, major);
	}

	
}
