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

import datn.qlth.dto.AddMajorToFacultyDTO;
import datn.qlth.dto.CreateMajorDTO;
import datn.qlth.dto.MajorDTO;
import datn.qlth.dto.UpdateMajorDTO;
import datn.qlth.dto.filter.MajorFilterForm;
import datn.qlth.entity.Major;
import datn.qlth.service.MajorService;
import datn.qlth.validation.faculty.FacultyIDExists;
import datn.qlth.validation.major.MajorIDExists;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/majors")
@Validated
public class MajorController {
	
	@Autowired
	private MajorService service;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	public ResponseEntity<?> getAllMajors (
			Pageable pageable,
			@RequestParam(value = "search", required = false) String search,
			MajorFilterForm filter){
		
		if (!pageable.getSort().isSorted()) {
	        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("majorID").ascending());
	    }
		
		Page<Major> entityPages = service.getAllMajors(pageable, search, filter);
		
		List<MajorDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<MajorDTO>>() {
		}.getType());
		
		Page<MajorDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());
		
		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getMajorByID (@PathVariable(name = "id") @MajorIDExists Integer ID){
		
		Major major = service.getMajorByID(ID);
		
		MajorDTO dto = modelMapper.map(major, MajorDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/create-major")
	public ResponseEntity<?> createMajor(@RequestBody CreateMajorDTO form){
		
		Major major = service.createMajor(form);
		
		MajorDTO dto = modelMapper.map(major, MajorDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PutMapping("/update-major/{id}")
	public ResponseEntity<?> updateMajor(@PathVariable(name = "id") @MajorIDExists Integer ID, @RequestBody UpdateMajorDTO form){
		
		Major major = service.updateMajor(ID, form);
		
		MajorDTO dto = modelMapper.map(major, MajorDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteMajor(@PathVariable(name = "id") @MajorIDExists Integer ID){
		
		Major major = service.deleteMajor(ID);
		
		MajorDTO dto = modelMapper.map(major, MajorDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/add-major-for-faculty")
	public ResponseEntity<?> addMajorToFacultyDTO(@RequestBody AddMajorToFacultyDTO form){
		
		service.addMajorToFaculty(form);
		
		return new ResponseEntity<>("Add Major For Faculty Successfully!", HttpStatus.OK);
	}
	
	@GetMapping("/get-majors-by-facultyID/{id}")
	public ResponseEntity<?> getMajorsByFacultyID (@PathVariable(name = "id") @FacultyIDExists Integer facultyID){
		
		List<Major> list = service.getMajorsByFacultyID(facultyID);
		
		List<MajorDTO> dtos = modelMapper.map(list, new TypeToken<List<MajorDTO>>() {
		}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
}
