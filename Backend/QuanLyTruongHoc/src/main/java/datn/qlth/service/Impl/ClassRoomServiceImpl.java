package datn.qlth.service.Impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import datn.qlth.dto.AddClassRoomToMajorDTO;
import datn.qlth.dto.AddTeacherToClassDTO;
import datn.qlth.dto.ChangeTeacherDTO;
import datn.qlth.dto.CreateClassRoomDTO;
import datn.qlth.dto.UpdateClassRoomDTO;
import datn.qlth.dto.filter.ClassRoomFilterForm;
import datn.qlth.entity.ClassRoom;
import datn.qlth.entity.Major;
import datn.qlth.entity.Teacher;
import datn.qlth.repository.ClassRoomRepository;
import datn.qlth.repository.MajorRepository;
import datn.qlth.repository.TeacherRepository;
import datn.qlth.service.ClassRoomService;
import datn.qlth.specification.classroom.ClassroomSpecification;

@Service
public class ClassRoomServiceImpl implements ClassRoomService{
	
	@Autowired
	private ClassRoomRepository repository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private MajorRepository majorRepository;
	
	@Autowired
	private TeacherRepository teacherRepository;

	@Override
	public Page<ClassRoom> getAllClassRooms(Pageable pageable, String search, ClassRoomFilterForm filter) {
		
		Specification<ClassRoom> where = ClassroomSpecification.buildWhere(search, filter);
		
		return repository.findAll(where, pageable);
	}

	@Override
	public ClassRoom getClassRoomByID(Integer ID) {
		return repository.findById(ID).get();
	}

	@Override
	public ClassRoom getClassRoomByClassRoomCode(String classRoomCode) {
		return repository.findByClassRoomCode(classRoomCode);
	}

	@Override
	public ClassRoom createClassRoom(CreateClassRoomDTO form) {
		
		ClassRoom classRoom = modelMapper.map(form, ClassRoom.class);
		
		Major major = majorRepository.findByMajorCode(form.getMajorCode());
		
		Teacher teacher = teacherRepository.findByTeacherCode(form.getTeacherCode());
		
		classRoom.setQuantity(0);
		classRoom.setMajor(major);
		classRoom.setTeacher(teacher);
		
		return repository.save(classRoom);
	}

	@Override
	public ClassRoom updateClassRoom(Integer ID, UpdateClassRoomDTO form) {
		
		ClassRoom classRoom = repository.findById(ID).get();
		
		if(form.getClassRoomCode() == null || form.getClassRoomCode().isEmpty()) {
			form.setClassRoomCode(classRoom.getClassRoomCode());
		}
		if(form.getClassRoomName() == null || form.getClassRoomName().isEmpty()) {
			form.setClassRoomName(classRoom.getClassRoomName());
		}
		
		Major major = majorRepository.findById(form.getMajorID()).get();
		
		if(classRoom.getMajor() == null) {
			if(form.getMajorID() != null) {
				classRoom.setMajor(major);
			}
			else {
				classRoom.setMajor(null);
			}
		}else {
			if(form.getMajorID() != null) {
				classRoom.setMajor(major);
			}else {
				classRoom.setMajor(classRoom.getMajor());
			}
		}
		
		Teacher teacher = teacherRepository.findById(form.getTeacherID()).get();
		
		if(classRoom.getTeacher() == null) {
			if(form.getTeacherID() != null) {
				classRoom.setTeacher(teacher);
			}
			else {
				classRoom.setTeacher(null);
			}
		}
		else {
			if(form.getTeacherID() != null) {
				classRoom.setTeacher(teacher);
			}
			else {
				classRoom.setTeacher(classRoom.getTeacher());
			}
		}
		
		classRoom.setClassRoomCode(form.getClassRoomCode());
		classRoom.setClassRoomName(form.getClassRoomName());
		classRoom.setMajor(major);
		classRoom.setTeacher(teacher);
		
		return repository.save(classRoom);
	}

	@Override
	public ClassRoom deleteClassRoomByID(Integer ID) {
		
		ClassRoom classRoom = repository.findById(ID).get();
		
		repository.deleteById(ID);
		
		return classRoom;
	}

	@Override
	public void deleteClassRoomByClassRoomCode(String classRoomCode) {
		
		ClassRoom classRoom = repository.findByClassRoomCode(classRoomCode);
		
		repository.deleteById(classRoom.getClassRoomID());
	}

	@Override
	public void addClassRoomToMajor(AddClassRoomToMajorDTO form) {
		
		Major major = majorRepository.findByMajorCode(form.getMajorCode());
		
		ClassRoom classRoom = repository.findByClassRoomCode(form.getClassRoomCode());
		
		classRoom.setMajor(major);
		
		repository.save(classRoom);
	}

	@Override
	public void addTeacherToClassDTO(AddTeacherToClassDTO form) {
		
		Teacher teacher = teacherRepository.findByTeacherCode(form.getTeacherCode());
		
		ClassRoom classRoom = repository.findByClassRoomCode(form.getClassRoomCode());
		
		classRoom.setTeacher(teacher);
		
		repository.save(classRoom);
		
	}

	@Override
	public void changeTeacher(ChangeTeacherDTO form) {
		
		Teacher teacher = teacherRepository.findByTeacherCode(form.getTeacherCode());
		
		ClassRoom classRoom = repository.findByClassRoomCode(form.getClassRoomCode());
		
		classRoom.setTeacher(teacher);
		
		repository.save(classRoom);
	}

	@Override
	public void deleteTeacher(String classRoomCode) {
		
		ClassRoom classRoom = repository.findByClassRoomCode(classRoomCode);
		
		classRoom.setTeacher(null);
		
		repository.save(classRoom);
	}

	@Override
	public boolean isClassRoomExistsByClassRoomID(Integer ID) {
		return repository.existsByClassRoomID(ID);
	}

	@Override
	public boolean isClassRoomExistsByClassRoomCode(String classRoomCode) {
		return repository.existsByClassRoomCode(classRoomCode);
	}

	@Override
	public boolean isClassRoomExistsByClassRoomName(String classRoomName) {
		return repository.existsByClassRoomName(classRoomName);
	}
}
