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

import datn.qlth.dto.AddSubjectToMajorDTO;
import datn.qlth.dto.CreateSubjectDTO;
import datn.qlth.dto.SubjectDTO;
import datn.qlth.dto.UpdateSubjectDTO;
import datn.qlth.dto.filter.SubjectFilterForm;
import datn.qlth.entity.RegistrationSubject;
import datn.qlth.entity.Subject;
import datn.qlth.entity.Enum.SubjectStatus;
import datn.qlth.service.RegistrationSubjectService;
import datn.qlth.service.SubjectService;
import datn.qlth.validation.subject.SubjectCodeExists;
import datn.qlth.validation.subject.SubjectIDExists;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/subjects")
@Validated
public class SubjectController {
	
	@Autowired
	private SubjectService service;
	
	@Autowired
	private RegistrationSubjectService registrationSubjectService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	public ResponseEntity<?> getAllSubjects (
			Pageable pageable,
			@RequestParam(value = "search", required = false) String search,
			SubjectFilterForm filter) {
		
		// kiểm tra xem thuộc tính sort có trong Pageable không
	    if (!pageable.getSort().isSorted()) {
	        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("subjectID").ascending());
	    }
		
		Page<Subject> entityPages = service.getAllSubjects(pageable, search, filter);
		
		List<SubjectDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<SubjectDTO>>() {
		}.getType());
		
		System.out.println(dtos);
		
		List<SubjectDTO> dtos2 = dtos.stream().map(e -> {
			
			List<RegistrationSubject> list = registrationSubjectService.getRegistrationSubjectsBySubject(e.getSubjectID());
			
			e.setActualQuantity(list.size());
			
			return e;
		}).toList();
		
		Page<SubjectDTO> dtoPage = new PageImpl<>(dtos2, pageable, entityPages.getTotalElements());
		
		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
	
	@GetMapping("/get-list-subject")
	public ResponseEntity<?> getListSubjects(){
		
		List<Subject> list = service.getListSubjects();
		
		List<SubjectDTO> dtos = modelMapper.map(list, new TypeToken<List<SubjectDTO>>() {
		}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
	
	@GetMapping("/get-list-subject-by-subjectStatus/{majorID}")
	public ResponseEntity<?> getListSubjectsBySubjectStatus(@PathVariable(name = "majorID") Integer majorID ,@RequestParam SubjectStatus subjectStatus){
		
		List<Subject> list = service.getListSubjectBySubjectStatus(subjectStatus, majorID);
		
		List<SubjectDTO> dtos = modelMapper.map(list, new TypeToken<List<SubjectDTO>>() {
		}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getSubjectByID(@PathVariable(name = "id") @SubjectIDExists Integer ID){
		
		Subject subject = service.getSubjectByID(ID);
		
		SubjectDTO dto  = modelMapper.map(subject, SubjectDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/get-subject-by-subject-code")
	public ResponseEntity<?> getSubjectBySubjectCode(@RequestParam @SubjectCodeExists String subjectCode){
		
		Subject subject = service.getSubjectBySubjectCode(subjectCode);
		
		SubjectDTO dto  = modelMapper.map(subject, SubjectDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/create-subject")
	public ResponseEntity<?> createSubject(@RequestBody CreateSubjectDTO form){
		
		Subject subject = service.createSubject(form);
		
		SubjectDTO dto = modelMapper.map(subject, SubjectDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PutMapping("/update-subject/{id}")
	public ResponseEntity<?> updateSubject(@PathVariable(name = "id") @SubjectIDExists Integer ID, @RequestBody UpdateSubjectDTO form){
		
		Subject subject = service.updateSubject(ID, form);
		
		SubjectDTO dto = modelMapper.map(subject, SubjectDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteSubjectByID(@PathVariable(name = "id") @SubjectIDExists Integer ID){
		
		Subject subject = service.deleteSubjectByID(ID);
		
		SubjectDTO dto = modelMapper.map(subject, SubjectDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-subject-by-subject-code")
	public ResponseEntity<?> deleteSubjectBySubjectCode(@RequestParam @SubjectCodeExists String subjectCode){
		
		service.deleteSubjectBySubjectCode(subjectCode);
		
		return new ResponseEntity<>("Delete Successfully!", HttpStatus.OK);
	}
	
	@PostMapping("/add-subject-for-major")
	public ResponseEntity<?> addSubjectToMajorDTO(@RequestBody AddSubjectToMajorDTO form){
		
		service.addSubjectToMajor(form);
		
		return new ResponseEntity<>("Add Subject For Major Successfully!", HttpStatus.OK);
	}
	
	@GetMapping(value = "/subjectCode/{subjectCode}")
	public ResponseEntity<?> existsSubjectBySubjectCode(@PathVariable(name = "subjectCode") String subjectCode){
		
		boolean result = service.isSubjectExistsBySubjectCode(subjectCode);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/subjectName/{subjectName}")
	public ResponseEntity<?> existsSubjectBySubjectName(@PathVariable(name = "subjectName") String subjectName){
		
		boolean result = service.isSubjectExistsBySubjectName(subjectName);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/subjectCodeAndSubjectName/{subjectCode}/{subjectName}")
	public ResponseEntity<?> existsSubjectBySubjectCodeAndName(@PathVariable(name = "subjectCode") String subjectCode, @PathVariable(name = "subjectName") String subjectName){
		
		boolean result = service.isSubjectExistsBySubjectCodeAndSubjectName(subjectCode, subjectName);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
