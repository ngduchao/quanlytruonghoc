package datn.qlth.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

import datn.qlth.dto.CreateRegistrationSubjectDTO;
import datn.qlth.dto.DeleteRegistrationSubjectDTO;
import datn.qlth.dto.RegistrationSubjectDTO;
import datn.qlth.dto.RegistrationSubjectForStudentDTO;
import datn.qlth.dto.ScoreFormDTO;
import datn.qlth.dto.UpdateRegistrationSubjectDTO;
import datn.qlth.dto.filter.RegistrationSubjectFilterForm;
import datn.qlth.entity.RegistrationSubject;
import datn.qlth.entity.Subject;
import datn.qlth.service.RegistrationSubjectService;
import datn.qlth.service.SubjectService;
import datn.qlth.validation.registrationSubject.RegistrationSubjectIDExists;
import datn.qlth.validation.subject.SubjectIDExists;
import datn.qlth.validation.user.UserCodeExists;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/registration-subjects")
@Validated
public class RegistrationSubjectController {
	
	@Autowired
	private RegistrationSubjectService service;
	
	@Autowired
	private SubjectService subjectService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	public ResponseEntity<?> getAllRegistrationSubjects(
			RegistrationSubjectFilterForm filter){
		
		List<RegistrationSubject> entityPages = service.getAllRegistrationSubjects(filter);
		
		List<RegistrationSubjectDTO> dtos = modelMapper.map(entityPages, new TypeToken<List<RegistrationSubjectDTO>>() {
		}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getRegistrationSubjectByID(@PathVariable(name = "id") @RegistrationSubjectIDExists Integer ID){
		
		RegistrationSubject registrationSubject = service.getRegistrationSubjectByID(ID);
		
		RegistrationSubjectDTO dto = modelMapper.map(registrationSubject, RegistrationSubjectDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/registration-subject-for-student")
	public ResponseEntity<?> registrationSubjectForStudent(@RequestBody RegistrationSubjectForStudentDTO form){
		
		Subject subject = subjectService.getSubjectByID(form.getSubjectID());
		
		if(subject.getActualQuantity() == 70) {
			
			return new ResponseEntity<>("Fail!", HttpStatus.BAD_REQUEST);
			
		}else {
			RegistrationSubject registrationSubject = service.registrationSubjectForStudent(form);
			
			RegistrationSubjectDTO dto = modelMapper.map(registrationSubject, RegistrationSubjectDTO.class);
			
			return new ResponseEntity<>(dto, HttpStatus.OK);
		}
	}
	
	@PostMapping("/create-registration-subject")
	public ResponseEntity<?> createRegistrationSubject(@RequestBody CreateRegistrationSubjectDTO form){
		
		Subject subject = subjectService.getSubjectByID(form.getSubjectID());
		
		boolean checkUser = false;
		
		for (RegistrationSubject e : subject.getRegistrationSubjects()) {
			if(e.getUser().getUserCode().equals(form.getUserCode())) {
				checkUser = true;
				break;
			}
		}
		
		if(subject.getActualQuantity() == 70) {
			
			return new ResponseEntity<>("Fail!", HttpStatus.BAD_REQUEST);
			
		}
		else if(checkUser) {
			return new ResponseEntity<>("Students already exist in class!", HttpStatus.BAD_REQUEST);
		} 
		else {
			
			RegistrationSubject registrationSubject = service.createRegistrationSubject(form);
			
			RegistrationSubjectDTO dto = modelMapper.map(registrationSubject, RegistrationSubjectDTO.class);
		
			
			return new ResponseEntity<>(dto, HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteRegistrationSubject(@PathVariable(name = "id") @RegistrationSubjectIDExists Integer ID){
		
		RegistrationSubject registrationSubject = service.deleteRegistrationSubject(ID);
		
		RegistrationSubjectDTO dto = modelMapper.map(registrationSubject, RegistrationSubjectDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
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
		
		RegistrationSubject registrationSubject = service.updateScoreForRegistrationSubject(ID, form);
		
		RegistrationSubjectDTO dto = modelMapper.map(registrationSubject, RegistrationSubjectDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/get-by-subject")
	public ResponseEntity<?> getRegistrationSubjectsBySubject(@RequestParam @SubjectIDExists Integer subjectID){
		
		List<RegistrationSubject> list = service.getRegistrationSubjectsBySubject(subjectID);
		
				
		List<RegistrationSubjectDTO> dtos = modelMapper.map(list, new TypeToken<List<RegistrationSubjectDTO>>() {
		}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
	
	@GetMapping("/registration-subject-exists-by-userID-and-subjectID")
	public ResponseEntity<?> registrationSubjectExistsByUserID(@RequestParam @UserCodeExists String userCode, @RequestParam @SubjectIDExists Integer subjectID){
		
		boolean result = service.isExistsRegistrationSubjectByUser(userCode, subjectID);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping("/get-registration-subject-by-username")
	public ResponseEntity<?> getRegistrationSubjectByUsername(Authentication authentication){
		
		String username = authentication.getName();
		
		List<RegistrationSubject> list = service.getRegistrationSubjectByUser(username);
		
		List<RegistrationSubjectDTO> dtos = modelMapper.map(list, new TypeToken<List<RegistrationSubjectDTO>>() {
		}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
}
