package datn.qlth.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import datn.qlth.dto.AddMajorToFacultyDTO;
import datn.qlth.dto.CreateMajorDTO;
import datn.qlth.dto.UpdateMajorDTO;
import datn.qlth.dto.filter.MajorFilterForm;
import datn.qlth.entity.Major;
import jakarta.servlet.http.HttpServletResponse;

public interface MajorService {
	
	public Page<Major> getAllMajors(Pageable pageable, String search, MajorFilterForm filter);
	
	public Major getMajorByID (Integer ID);
	
	public List<Major> getListMajorsNotPage();
	
	public List<Major> getMajorsByFacultyID (Integer facultyID);
	
	public Major createMajor (CreateMajorDTO form);
	
	public Major updateMajor (Integer ID, UpdateMajorDTO form);
	
	public Major deleteMajor (Integer ID);
	
	public void addMajorToFaculty (AddMajorToFacultyDTO form);
	
	public boolean isMajorExistsByMajorID(Integer ID);
	
	public boolean isMajorExistsByMajorCode(String majorCode);
	
	public boolean isMajorExistsByMajorName(String majorName);
	
	public void exportListMajor(HttpServletResponse servletResponse, String search, MajorFilterForm filter)throws IOException;

}
