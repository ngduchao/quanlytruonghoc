package datn.qlth.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import datn.qlth.dto.CreateTeacherDTO;
import datn.qlth.dto.UpdateTeacherDTO;
import datn.qlth.dto.filter.TeacherFilterForm;
import datn.qlth.entity.Teacher;

public interface TeacherService {
	
	public Page<Teacher> getAllTeachers(Pageable pageable, String search, TeacherFilterForm filter);
	
	public Teacher getTeacherByID(Integer ID);
	
	public Teacher getByTeacherCode(String teacherCode);
	
	public Teacher createTeacher(CreateTeacherDTO form);
	
	public Teacher updateTeacher(Integer ID, UpdateTeacherDTO form);
	
	public Teacher deleteTeacher(Integer ID);
	
	public Teacher deleteTeacherByTeacherCode(String teacherCode);
	
	public boolean isExistsByTeacherID(Integer ID);
	
	public boolean isExistsByTeacherCode(String teacherCode);
	
	public boolean isExistsByTeacherName(String teacherName);
	
	public boolean isExistsByEmail(String email);
	
}
