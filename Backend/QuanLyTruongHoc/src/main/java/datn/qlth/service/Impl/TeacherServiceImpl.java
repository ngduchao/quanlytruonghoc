package datn.qlth.service.Impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import datn.qlth.dto.CreateTeacherDTO;
import datn.qlth.dto.UpdateTeacherDTO;
import datn.qlth.dto.filter.TeacherFilterForm;
import datn.qlth.entity.Teacher;
import datn.qlth.repository.TeacherRepository;
import datn.qlth.service.TeacherService;
import datn.qlth.specification.teacher.TeacherSpecification;

@Service
public class TeacherServiceImpl implements TeacherService{
	
	@Autowired
	private TeacherRepository repository;
	
	@Autowired
	private ModelMapper modelMapper;
	

	@Override
	public Page<Teacher> getAllTeachers(Pageable pageable, String search, TeacherFilterForm filter) {
		
		Specification<Teacher> where = TeacherSpecification.buildWhere(search, filter);
		
		return repository.findAll(where, pageable);
	}

	@Override
	public Teacher getTeacherByID(Integer ID) {
		return repository.findById(ID).get();
	}

	@Override
	public Teacher getByTeacherCode(String teacherCode) {
		return repository.findByTeacherCode(teacherCode);
	}

	@Override
	public Teacher createTeacher(CreateTeacherDTO form) {

		Teacher teacher = modelMapper.map(form, Teacher.class);

		return repository.save(teacher);
	}

	@Override
	public Teacher updateTeacher(Integer ID, UpdateTeacherDTO form) {
		
		Teacher teacher = repository.findById(ID).get();
		
		if(form.getTeacherCode() == null || form.getTeacherCode().isEmpty()) {
			form.setTeacherCode(teacher.getTeacherCode());
		}
		if(form.getTeacherName() == null || form.getTeacherName().isEmpty()) {
			form.setTeacherName(teacher.getTeacherName());
		}
		if(form.getEmail() == null || form.getEmail().isEmpty()) {
			form.setEmail(teacher.getEmail());
		}
		if(form.getPhoneNumber() == null || form.getPhoneNumber().isEmpty()) {
			form.setPhoneNumber(teacher.getPhoneNumber());
		}
		if(form.getBirthDay() == null) {
			form.setBirthDay(teacher.getBirthDay());
		}
		if(form.getHomeTown() == null || form.getHomeTown().isEmpty()) {
			form.setHomeTown(teacher.getHomeTown());
		}
		if(form.getSpecializeLevel() == null) {
			form.setSpecializeLevel(teacher.getSpecializeLevel());
		}
		
		teacher.setTeacherCode(form.getTeacherCode());
		teacher.setTeacherName(form.getTeacherName());
		teacher.setEmail(form.getEmail());
		teacher.setPhoneNumber(form.getPhoneNumber());
		teacher.setBirthDay(form.getBirthDay());
		teacher.setHomeTown(form.getHomeTown());
		teacher.setSpecializeLevel(form.getSpecializeLevel());
		
		return repository.save(teacher);
	}

	@Override
	public Teacher deleteTeacher(Integer ID) {
		
		Teacher teacher = repository.findById(ID).get();
		
		repository.deleteById(ID);
		
		return teacher;
	}

	@Override
	public Teacher deleteTeacherByTeacherCode(String teacherCode) {
		
		Teacher teacher = repository.findByTeacherCode(teacherCode);
		
		repository.deleteById(teacher.getTeacherID());
		
		return teacher;
	}

	@Override
	public boolean isExistsByTeacherID(Integer ID) {
		return repository.existsByTeacherID(ID);
	}

	@Override
	public boolean isExistsByTeacherCode(String teacherCode) {
		return repository.existsByTeacherCode(teacherCode);
	}

	@Override
	public boolean isExistsByTeacherName(String teacherName) {
		return repository.existsByTeacherName(teacherName);
	}

	@Override
	public boolean isExistsByEmail(String email) {
		return repository.existsByEmail(email);
	}

	@Override
	public boolean isExistsByPhoneNumber(String phoneNumber) {
		return repository.existsByPhoneNumber(phoneNumber);
	}
}
