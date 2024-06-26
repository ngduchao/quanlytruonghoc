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

import datn.qlth.dto.AddMajorToFacultyDTO;
import datn.qlth.dto.CreateMajorDTO;
import datn.qlth.dto.MajorDTO;
import datn.qlth.dto.UpdateMajorDTO;
import datn.qlth.dto.filter.MajorFilterForm;
import datn.qlth.entity.Faculty;
import datn.qlth.entity.Major;
import datn.qlth.repository.FacultyRepository;
import datn.qlth.repository.MajorRepository;
import datn.qlth.service.CSVConstant;
import datn.qlth.service.MajorService;
import datn.qlth.specification.major.MajorSpecification;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class MajorServiceImpl implements MajorService{
	
	@Autowired
	private MajorRepository repository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private FacultyRepository facultyRepository;

	@Override
	public Page<Major> getAllMajors(Pageable pageable, String search, MajorFilterForm filter) {
		
		Specification<Major> where = MajorSpecification.buildWhere(search, filter);
		
		return repository.findAll(where, pageable);
	}

	@Override
	public Major getMajorByID(Integer ID) {
		
		return repository.findById(ID).get();
	}
	
	@Override
	public List<Major> getMajorsByFacultyID(Integer facultyID) {
		
		Faculty faculty = facultyRepository.findById(facultyID).get();
		
		return repository.findByFaculty(faculty);
	}

	@Override
	public Major createMajor(CreateMajorDTO form) {
		
		Major major = modelMapper.map(form, Major.class);
		
		Faculty faculty = facultyRepository.findById(form.getFacultyID()).get();
		
		major.setFaculty(faculty);
		
		return repository.save(major);
	}
	
	@Override
	public Major updateMajor(Integer ID, UpdateMajorDTO form) {
		
		Major major = repository.findById(ID).get();
		
		if(form.getMajorCode() == null || form.getMajorCode().isEmpty()) {
			form.setMajorCode(major.getMajorCode());
		}
		if(form.getMajorName() == null || form.getMajorName().isEmpty()) {
			form.setMajorName(major.getMajorName());
		}
		
		Faculty faculty = facultyRepository.findById(form.getFacultyID()).get();
		
		major.setMajorCode(form.getMajorCode());
		major.setMajorName(form.getMajorName());
		major.setFaculty(faculty);

		return repository.save(major);
	}

	@Override
	public Major deleteMajor(Integer ID) {
		
		Major major = repository.findById(ID).get();
		
		repository.deleteById(ID);
		
		return major;
	}

	@Override
	public void addMajorToFaculty(AddMajorToFacultyDTO form) {
		
		Major major = repository.findById(form.getMajorID()).get();
		
		Faculty faculty = facultyRepository.findById(form.getFacultyID()).get();
		
		major.setFaculty(faculty);
		
		repository.save(major);
	}

	@Override
	public boolean isMajorExistsByMajorID(Integer ID) {
		return repository.existsByMajorID(ID);
	}

	@Override
	public boolean isMajorExistsByMajorCode(String majorCode) {
		return repository.existsByMajorCode(majorCode);
	}

	@Override
	public boolean isMajorExistsByMajorName(String majorName) {
		return repository.existsByMajorName(majorName);
	}

	@Override
	public void exportListMajor(
			HttpServletResponse servletResponse, 
			String search,
			MajorFilterForm filter) throws IOException {
		
		Specification<Major> where = MajorSpecification.buildWhere(search, filter);
		
		List<Major> userList = repository.findAll(where);

		List<MajorDTO> dtos = modelMapper.map(userList, new TypeToken<List<MajorDTO>>() {
		}.getType());
		
		servletResponse.setContentType(CSVConstant.FILETYPE);
		servletResponse.addHeader(CSVConstant.CONTENT_DISPOSITION, CSVConstant.FILE_NAME_ACCOUNT_LIST);

		writeAccountToCsv(servletResponse.getWriter(), dtos);
		
	}

	public void writeAccountToCsv(Writer writer, List<MajorDTO> dtos) {
		try  {
			writer.write('\uFEFF');
			CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT);
			csvPrinter.printRecord(
					CSVConstant.NO,
					CSVConstant.MAJOR_CODE,
					CSVConstant.MAJOR_NAME,
					CSVConstant.FACULTY_NAME
					);

			for (MajorDTO major : dtos) {
				int index = dtos.indexOf(major) + 1;

				csvPrinter.printRecord(
						index,
						major.getMajorCode(),
						major.getMajorName(),
						major.getFaculty().getFacultyName().toString()
						);
			}
 
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}

	@Override
	public List<Major> getListMajorsNotPage() {
		return repository.findAll();
	}
	
}
