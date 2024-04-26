package datn.qlth.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import datn.qlth.dto.CreateFacultyDTO;
import datn.qlth.dto.FacultyDTO;
import datn.qlth.dto.UpdateFacultyDTO;
import datn.qlth.dto.filter.FacultyFilterForm;
import datn.qlth.entity.Faculty;
import datn.qlth.service.FacultyService;
import datn.qlth.validation.faculty.FacultyCodeExists;
import datn.qlth.validation.faculty.FacultyIDExists;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/faculties")
@Validated
public class FacultyController {
	
	@Autowired
	private FacultyService service;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	public ResponseEntity<?> GetAllFaculties (
			Pageable pageable,
			@RequestParam(name = "search", required = false) String search,
			FacultyFilterForm filter){
		
		if (!pageable.getSort().isSorted()) {
	        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("facultyID").ascending());
	    }
		
		Page<Faculty> entityPages = service.getAllFaculties(pageable, search, filter);
		
		List<FacultyDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<FacultyDTO>>() {
		}.getType());
		
		Page<FacultyDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());
		
		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getFacultyByID(@PathVariable(name = "id") @FacultyIDExists Integer ID){
		
		Faculty faculty = service.getFacultyByID(ID);
		
		FacultyDTO dto = modelMapper.map(faculty, FacultyDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/create-faculty")
	public ResponseEntity<?> createFaculty(@RequestBody CreateFacultyDTO form){
		
		Faculty faculty = service.createFaculty(form);
		
		FacultyDTO dto = modelMapper.map(faculty, FacultyDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PutMapping("/update-faculty/{id}")
	public ResponseEntity<?> updateFaculty(@PathVariable(name = "id") @FacultyIDExists Integer ID, @RequestBody UpdateFacultyDTO form){
		
		service.updateFaculty(ID, form);
		
		Faculty faculty = service.getFacultyByID(ID);
		
		FacultyDTO dto = modelMapper.map(faculty, FacultyDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteFaculty(@PathVariable(name = "id") @FacultyIDExists Integer ID){
		
		Faculty faculty = service.deletFaculty(ID);
		
		FacultyDTO dto = modelMapper.map(faculty, FacultyDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/get-faculty-by-faculty-code")
	public ResponseEntity<?> getFacultyByFacultyCode(@RequestParam @FacultyCodeExists String facultyCode){
		Faculty faculty = service.getFacultyByFacultyCode(facultyCode);
		
		FacultyDTO dto = modelMapper.map(faculty, FacultyDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
}
