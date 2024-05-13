package datn.qlth.service.Impl;

import java.io.IOException;
import java.io.Writer;
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

import datn.qlth.dto.CreateFacultyDTO;
import datn.qlth.dto.FacultyDTO;
import datn.qlth.dto.UpdateFacultyDTO;
import datn.qlth.dto.filter.FacultyFilterForm;
import datn.qlth.entity.Faculty;
import datn.qlth.repository.FacultyRepository;
import datn.qlth.service.CSVConstant;
import datn.qlth.service.FacultyService;
import datn.qlth.specification.faculty.FacultySpecification;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class FacultyServiceImpl implements FacultyService{
	
	@Autowired
	private FacultyRepository repository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Page<Faculty> getAllFaculties(Pageable pageable, String search, FacultyFilterForm filter) {
		
		Specification<Faculty> where = FacultySpecification.buildWhere(search, filter);
		
		return repository.findAll(where, pageable);
	}

	@Override
	public Faculty getFacultyByID(Integer ID) {
		return repository.findById(ID).get();
	}

	@Override
	public Faculty createFaculty(CreateFacultyDTO form) {
		
		Faculty faculty = modelMapper.map(form, Faculty.class);
		
		return repository.save(faculty);
	}

	@Override
	public void updateFaculty(Integer ID, UpdateFacultyDTO form) {
		
		Faculty faculty = repository.findById(ID).get();
		
		if(form.getFacultyCode() == null || form.getFacultyCode().isEmpty()) {
			form.setFacultyCode(faculty.getFacultyCode());
		}
		if(form.getFacultyName() == null || form.getFacultyName().isEmpty()) {
			form.setFacultyName(faculty.getFacultyName());
		}
		
		faculty.setFacultyCode(form.getFacultyCode());
		faculty.setFacultyName(form.getFacultyName());
		
		repository.save(faculty);
	}

	@Override
	public Faculty deletFaculty(Integer ID) {
		
		Faculty faculty = repository.findById(ID).get();
		
		repository.deleteById(ID);
		
		return faculty;
	}

	@Override
	public Faculty getFacultyByFacultyCode(String facultyCode) {
		
		return repository.getFacultyByFacultyCode(facultyCode);
	}

	@Override
	public boolean isFacultyExistsByID(Integer ID) {
		return repository.existsByFacultyID(ID);
	}

	@Override
	public boolean isFacultyExistsByFacultyCode(String facultyCode) {
		return repository.existsByFacultyCode(facultyCode);
	}

	@Override
	public boolean isFacultyExistsByFacultyName(String facultyName) {
		return repository.existsByFacultyName(facultyName);
	}

	@Override
	public void exportListFaculties(
			HttpServletResponse servletResponse, 
			String search,
			FacultyFilterForm filter) throws IOException {
		
		Specification<Faculty> where = FacultySpecification.buildWhere(search, filter);
		
		List<Faculty> userList = repository.findAll(where);

		List<FacultyDTO> dtos = modelMapper.map(userList, new TypeToken<List<FacultyDTO>>() {
		}.getType());
		
		servletResponse.setContentType(CSVConstant.FILETYPE);
//		servletResponse.setContentType("application/vnd.ms-excel:UTF-8");	
		servletResponse.addHeader(CSVConstant.CONTENT_DISPOSITION, CSVConstant.FILE_NAME_FACULTY_LIST);
	
		writeAccountToCsv(servletResponse.getWriter(), dtos);
	}
	
	public void writeAccountToCsv(Writer writer, List<FacultyDTO> dtos) {
		try  {
			writer.write('\uFEFF');
			CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT);
			csvPrinter.printRecord(
					CSVConstant.NO , 
					CSVConstant.FACULTY_CODE,
					CSVConstant.FACULTY_NAME
					);
			for (FacultyDTO faculty : dtos) {
				int index = dtos.indexOf(faculty) + 1;

				csvPrinter.printRecord(
						index,
						faculty.getFacultyCode(),
						faculty.getFacultyName()
						);
			}
 
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}
}
