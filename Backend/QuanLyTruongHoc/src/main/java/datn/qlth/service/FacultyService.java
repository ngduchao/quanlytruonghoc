package datn.qlth.service;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import datn.qlth.dto.CreateFacultyDTO;
import datn.qlth.dto.UpdateFacultyDTO;
import datn.qlth.dto.filter.FacultyFilterForm;
import datn.qlth.entity.Faculty;
import jakarta.servlet.http.HttpServletResponse;

public interface FacultyService {
	
	public Page<Faculty> getAllFaculties(Pageable pageable, String search, FacultyFilterForm filter);
	
	public Faculty getFacultyByID (Integer ID);
	
	public Faculty createFaculty (CreateFacultyDTO form);
	
	public void updateFaculty (Integer ID, UpdateFacultyDTO form);
	
	public Faculty deletFaculty (Integer ID);
	
	public Faculty getFacultyByFacultyCode (String facultyCode);
	
	public boolean isFacultyExistsByID(Integer ID);
	
	public boolean isFacultyExistsByFacultyCode(String facultyCode);
	
	public boolean isFacultyExistsByFacultyName(String facultyName);
	
	public void exportListFaculties(HttpServletResponse servletResponse, String search, FacultyFilterForm filter)throws IOException;

}
