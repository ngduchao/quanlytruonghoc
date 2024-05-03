package datn.qlth.service;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import datn.qlth.dto.AddClassRoomToMajorDTO;
import datn.qlth.dto.AddTeacherToClassDTO;
import datn.qlth.dto.ChangeTeacherDTO;
import datn.qlth.dto.CreateClassRoomDTO;
import datn.qlth.dto.UpdateClassRoomDTO;
import datn.qlth.dto.filter.ClassRoomFilterForm;
import datn.qlth.entity.ClassRoom;
import jakarta.servlet.http.HttpServletResponse;

public interface ClassRoomService {
	
	public Page<ClassRoom> getAllClassRooms(Pageable pageable, String search, ClassRoomFilterForm filter);
	
	public ClassRoom getClassRoomByID(Integer ID);
	
	public ClassRoom getClassRoomByClassRoomCode(String classRoomCode);
	
	public ClassRoom createClassRoom(CreateClassRoomDTO form);
	
	public ClassRoom updateClassRoom(Integer ID, UpdateClassRoomDTO form);
	
	public ClassRoom deleteClassRoomByID(Integer ID);
	
	public void deleteClassRoomByClassRoomCode(String classRoomCode);
	
	public void addClassRoomToMajor(AddClassRoomToMajorDTO form);
	
	public void addTeacherToClassDTO(AddTeacherToClassDTO form);
	
	public void changeTeacher(ChangeTeacherDTO form);
	
	public void deleteTeacher(String classRoomCode);
	
	public boolean isClassRoomExistsByClassRoomID(Integer ID);
	
	public boolean isClassRoomExistsByClassRoomCode(String classRoomCode);
	
	public boolean isClassRoomExistsByClassRoomName(String classRoomName);
	
	public boolean isClassRoomExistsByClassRoomNameAndCourse(String classRoomName, Integer course);

	public void exportListStudentsInClass(HttpServletResponse servletResponse, Integer classRoomID)throws IOException;
}
