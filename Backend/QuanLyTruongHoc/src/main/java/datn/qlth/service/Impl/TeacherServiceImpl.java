package datn.qlth.service.Impl;

import java.io.IOException;
import java.io.Writer;
import java.text.SimpleDateFormat;
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

import datn.qlth.dto.CreateTeacherDTO;
import datn.qlth.dto.TeacherDTO;
import datn.qlth.dto.UpdateTeacherDTO;
import datn.qlth.dto.filter.TeacherFilterForm;
import datn.qlth.entity.Teacher;
import datn.qlth.repository.TeacherRepository;
import datn.qlth.service.CSVConstant;
import datn.qlth.service.TeacherService;
import datn.qlth.specification.teacher.TeacherSpecification;
import jakarta.servlet.http.HttpServletResponse;

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

	@Override
	public void exportListTeacher(
			HttpServletResponse servletResponse, 
			String search, 
			TeacherFilterForm filter)
			throws IOException {

		Specification<Teacher> where = TeacherSpecification.buildWhere(search, filter);
		
		List<Teacher> userList = repository.findAll(where);

		List<TeacherDTO> dtos = modelMapper.map(userList, new TypeToken<List<TeacherDTO>>() {
		}.getType());

		servletResponse.setContentType(CSVConstant.FILETYPE);
//		servletResponse.setContentType("application/vnd.ms-excel:UTF-8");	
		servletResponse.addHeader(CSVConstant.CONTENT_DISPOSITION, CSVConstant.FILE_NAME_ACCOUNT_LIST);


		writeTeacherToCsv(servletResponse.getWriter(), dtos);
		
	}
	
	public void writeTeacherToCsv(Writer writer, List<TeacherDTO> dtos) {
		try {
			writer.write('\uFEFF');
			CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT);
			csvPrinter.printRecord(
					CSVConstant.NO, 
					CSVConstant.TEACHER_CODE,
					CSVConstant.TEACHER_NAME,
					CSVConstant.EMAIL_ADDRESS,
					CSVConstant.PHONE,
					CSVConstant.GENDER,
					CSVConstant.BIRTH_DAY,
					CSVConstant.HOME_TOWN,
					CSVConstant.SPECIALIZE_LEVEL
					);
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

			for (TeacherDTO teacher : dtos) {
				int index = dtos.indexOf(teacher) + 1;
				
				String formattedBirthDay = dateFormat.format(teacher.getBirthDay());
				
				String formattedSpecializeLevel = teacher.getSpecializeLevel().toString().equals("TIENSI") ? "Tiến Sĩ" 
						: teacher.getSpecializeLevel().toString().equals("THACSI") ? "Thạc Sĩ" 
								: "Đại Học";
				
				String formattedGender = teacher.getGender().toString().equals("MALE") ? "Nam" : "Nữ";

				csvPrinter.printRecord(
						index,
						teacher.getTeacherCode(),
						teacher.getTeacherName(),
						teacher.getEmail(),
						teacher.getPhoneNumber(),
						formattedGender,
						formattedBirthDay,
						teacher.getHomeTown(),
						formattedSpecializeLevel
						);
			}
 
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}

	@Override
	public List<Teacher> getListTeacher() {
		return repository.findAll();
	}
}
