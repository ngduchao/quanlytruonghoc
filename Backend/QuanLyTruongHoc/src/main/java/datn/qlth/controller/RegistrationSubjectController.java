package datn.qlth.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import datn.qlth.dto.DeleteRegistrationSubjectDTO;
import datn.qlth.dto.RegistrationSubjectDTO;
import datn.qlth.dto.RegistrationSubjectForStudentDTO;
import datn.qlth.dto.ScoreFormDTO;
import datn.qlth.dto.UpdateRegistrationSubjectDTO;
import datn.qlth.entity.RegistrationSubject;
import datn.qlth.service.RegistrationSubjectService;
import datn.qlth.validation.registrationSubject.RegistrationSubjectIDExists;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/registration-subjects")
@Validated
public class RegistrationSubjectController {
	
	@Autowired
	private RegistrationSubjectService service;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	public ResponseEntity<?> getAllRegistrationSubjects(){
		
		List<RegistrationSubject> list = service.getAllRegistrationSubjects();
		
		List<RegistrationSubjectDTO> dtos = modelMapper.map(list, new TypeToken<List<RegistrationSubjectDTO>>() {
		}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getRegistrationSubjectByID(@PathVariable(name = "id") @RegistrationSubjectIDExists Integer ID){
		
		RegistrationSubject registrationSubject= service.getRegistrationSubjectByID(ID);
		
		RegistrationSubjectDTO dto = modelMapper.map(registrationSubject, RegistrationSubjectDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/registration-subject-for-student")
	public ResponseEntity<?> registrationSubjectForStudent(@RequestBody RegistrationSubjectForStudentDTO form){
		
		RegistrationSubject registrationSubject = service.registrationSubjectForStudent(form);
		
		RegistrationSubjectDTO dto = modelMapper.map(registrationSubject, RegistrationSubjectDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-registration-subject-by-admin/{id}")
	public ResponseEntity<?> deleteRegistrationSubject(@PathVariable(name = "id") @RegistrationSubjectIDExists Integer ID){
		
		service.deleteRegistrationSubject(ID);
		
		return new ResponseEntity<>("Delete Successfully!", HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-registration-subject-for-student")
	public ResponseEntity<?> deleteRegistrationSubjectForStudent(@RequestBody DeleteRegistrationSubjectDTO form){
		
		service.deleteRegistrationSubjectForStudent(form);
		
		return new ResponseEntity<>("Delete Successfully!", HttpStatus.OK);
	}
	
	@PutMapping("/update-registration-subject-for-student/{id}")
	public ResponseEntity<?> updateRegistrationSubjectForStudent(@PathVariable(name = "id") @RegistrationSubjectIDExists Integer ID ,@RequestBody UpdateRegistrationSubjectDTO form){
		
		service.updateRegistrationSubjectForStudent(ID, form);
		
		return new ResponseEntity<>("Update Successfully!", HttpStatus.OK);
	}
	
	@PutMapping("/update-score-for-student/{id}")
	public ResponseEntity<?> updateScoreForRegistrationSubject(@PathVariable(name = "id") @RegistrationSubjectIDExists Integer ID , @RequestBody ScoreFormDTO form){
		
		service.updateScoreForRegistrationSubject(ID, form);
		
		return new ResponseEntity<>("Update Successfully!", HttpStatus.OK);
	}

}
