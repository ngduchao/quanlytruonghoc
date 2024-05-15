package datn.qlth.service.Impl;

import java.io.IOException;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import datn.qlth.dto.AddClassRoomToMajorDTO;
import datn.qlth.dto.AddTeacherToClassDTO;
import datn.qlth.dto.ChangeTeacherDTO;
import datn.qlth.dto.ClassRoomDTO;
import datn.qlth.dto.CreateClassRoomDTO;
import datn.qlth.dto.UpdateClassRoomDTO;
import datn.qlth.dto.UserDTO;
import datn.qlth.dto.filter.ClassRoomFilterForm;
import datn.qlth.entity.ClassRoom;
import datn.qlth.entity.Major;
import datn.qlth.entity.Teacher;
import datn.qlth.entity.User;
import datn.qlth.repository.ClassRoomRepository;
import datn.qlth.repository.MajorRepository;
import datn.qlth.repository.TeacherRepository;
import datn.qlth.service.CSVConstant;
import datn.qlth.service.ClassRoomService;
import datn.qlth.specification.classroom.ClassroomSpecification;
import jakarta.servlet.http.HttpServletResponse;

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
		
		classRoom.setUsers(new ArrayList<>());
		
//		classRoom.setQuantity(0);
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

	@Override
	public boolean isClassRoomExistsByClassRoomNameAndCourse(String classRoomName, Integer course) {
		return repository.existsByClassRoomNameAndCourse(classRoomName, course);
	}

	@Override
	public void exportListStudentsInClass(HttpServletResponse servletResponse, Integer classRoomID) throws IOException {
		List<User> list = getClassRoomByID(classRoomID).getUsers();
		
		List<UserDTO> dtos = modelMapper.map(list, new TypeToken<List<UserDTO>>() {
		}.getType());
		
		servletResponse.setContentType(CSVConstant.FILETYPE);
		servletResponse.addHeader(CSVConstant.CONTENT_DISPOSITION, CSVConstant.FILE_NAME_STUDENT_IN_CLASS);
		writeAccountToCsv(servletResponse.getWriter(), dtos);
	}
	
	public void writeAccountToCsv(Writer writer, List<UserDTO> dtos) {
		try  {
			writer.write('\uFEFF');
			CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT);
			csvPrinter.printRecord(
					CSVConstant.NO, 
					CSVConstant.USER_CODE,
					CSVConstant.FIRST_NAME,
					CSVConstant.LAST_NAME,
					CSVConstant.BIRTH_DAY,
					CSVConstant.GENDER,
					CSVConstant.EMAIL_ADDRESS,
					CSVConstant.PHONE,
					CSVConstant.HOME_TOWN,
					CSVConstant.STATUS);
			
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

			for (UserDTO entity : dtos) {
				int index = dtos.indexOf(entity) + 1;
				
				String formattedBirthDay = dateFormat.format(entity.getBirthDay());
				
				String status = entity.getStatus().toString().equals("STUDYING") ? "Đang học" : "Đã nghỉ";
				
				String formattedGender = entity.getGender().toString().equals("MALE") ? "Nam" : "Nữ";
				
				csvPrinter.printRecord(
						index,
						entity.getUserCode(),
						entity.getFirstName(),
						entity.getLastName(),
						formattedBirthDay,
						formattedGender,
						entity.getEmail(),
						entity.getPhoneNumber(),
						entity.getHomeTown(),
						status
						);
			}
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}

	@Override
	public void exportListClassRoom(
			HttpServletResponse servletResponse, 
			String search, 
			ClassRoomFilterForm filter)
			throws IOException {

		Specification<ClassRoom> where = ClassroomSpecification.buildWhere(search, filter);
		
		List<ClassRoom> classRoomList = repository.findAll(where);

		List<ClassRoomDTO> dtos = modelMapper.map(classRoomList, new TypeToken<List<ClassRoomDTO>>() {
		}.getType());

		servletResponse.setContentType(CSVConstant.FILETYPE);
		servletResponse.addHeader(CSVConstant.CONTENT_DISPOSITION, CSVConstant.FILE_NAME_ACCOUNT_LIST);

		writeClassRoomToCsv(servletResponse.getWriter(), dtos);
	}
	
	public void writeClassRoomToCsv(Writer writer, List<ClassRoomDTO> dtos) {
		try  {
			writer.write('\uFEFF');
			CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT);
			csvPrinter.printRecord(
					CSVConstant.NO,
					CSVConstant.CLASSROOM_CODE,
					CSVConstant.CLASSROOM_NAME,
					CSVConstant.COURSE,
					CSVConstant.MAJOR_NAME,
					CSVConstant.CREATED_DATE,
					CSVConstant.TEACHER_NAME
					);
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

			for (ClassRoomDTO classRoom : dtos) {
				int index = dtos.indexOf(classRoom) + 1;
				
				String formattedCreatedDate = dateFormat.format(classRoom.getCreatedDate());

				csvPrinter.printRecord(
						index,
						classRoom.getClassRoomCode(),
						classRoom.getClassRoomName(),
						classRoom.getCourse(),
						classRoom.getMajor().getMajorName(),
						formattedCreatedDate,
						classRoom.getTeacher().getTeacherName()
						);
			}
 
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}
}
