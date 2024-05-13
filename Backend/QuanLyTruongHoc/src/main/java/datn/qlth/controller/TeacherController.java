package datn.qlth.controller;

import java.io.IOException;
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

import datn.qlth.dto.CreateTeacherDTO;
import datn.qlth.dto.TeacherDTO;
import datn.qlth.dto.TeacherDeleteDTO;
import datn.qlth.dto.UpdateTeacherDTO;
import datn.qlth.dto.filter.TeacherFilterForm;
import datn.qlth.entity.Teacher;
import datn.qlth.service.TeacherService;
import datn.qlth.validation.teacher.TeacherCodeExists;
import datn.qlth.validation.teacher.TeacherIDExists;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/teachers")
@Validated
public class TeacherController {
	
	@Autowired
	private TeacherService service;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	public ResponseEntity<?> getAllTeachers(
			Pageable pageable,
			@RequestParam(value = "search", required = false) String search,
			TeacherFilterForm filter){
		
		if (!pageable.getSort().isSorted()) {
	        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("teacherName").ascending());
	    }
		
		Page<Teacher> entityPages = service.getAllTeachers(pageable, search, filter);
		
		List<TeacherDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<TeacherDTO>>() {
		}.getType());
		
		Page<TeacherDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());
		
		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
	
	@GetMapping("/get-list")
	public ResponseEntity<?> getListTeacher(){
		
		List<Teacher> list = service.getListTeacher();
		
		List<TeacherDTO> dtos = modelMapper.map(list, new TypeToken<List<TeacherDTO>>() {
		}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getTeacherByID(@PathVariable(name = "id") @TeacherIDExists Integer ID){
		
		Teacher teacher = service.getTeacherByID(ID);
		
		TeacherDTO dto = modelMapper.map(teacher, TeacherDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/get-teacher-by-teacher-code")
	public ResponseEntity<?> getTeacherByTeacherCode(@RequestParam @TeacherCodeExists String teacherCode){
		
		Teacher teacher = service.getByTeacherCode(teacherCode);
		
		TeacherDTO dto = modelMapper.map(teacher, TeacherDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/create-teacher")
	public ResponseEntity<?> createTeacher(@RequestBody CreateTeacherDTO form){
		
		Teacher teacher =  service.createTeacher(form);
		
		TeacherDTO dto = modelMapper.map(teacher, TeacherDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PutMapping("/update-teacher/{id}")
	public ResponseEntity<?> updateTeacher(@PathVariable(name = "id") @TeacherIDExists Integer ID, @RequestBody UpdateTeacherDTO form){
		
		Teacher teacher = service.updateTeacher(ID, form);
		
		TeacherDTO dto = modelMapper.map(teacher, TeacherDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTeacherByID(@PathVariable(name = "id") @TeacherIDExists Integer ID){
		
		Teacher teacher = service.deleteTeacher(ID);	

		TeacherDeleteDTO dto = modelMapper.map(teacher, TeacherDeleteDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-teacher-by-teacher-code/{teacherCode}")
	public ResponseEntity<?> deleteTeacherByTeacherCode(@PathVariable(name = "teacherCode") @TeacherCodeExists String teacherCode){
		
		Teacher teacher = service.deleteTeacherByTeacherCode(teacherCode);
		
		TeacherDeleteDTO dto = modelMapper.map(teacher, TeacherDeleteDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping(value = "/teacherCode/{teacherCode}")
	public ResponseEntity<?> existsUserByTeacherCode(@PathVariable(name = "teacherCode") String teacherCode){
		
		boolean result = service.isExistsByTeacherCode(teacherCode);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/email/{email}")
	public ResponseEntity<?> existsUserByEmail(@PathVariable(name = "email") String email){
		
		boolean result = service.isExistsByEmail(email);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/phoneNumber/{phoneNumber}")
	public ResponseEntity<?> existsUserByPhoneNumber(@PathVariable(name = "phoneNumber") String phoneNumber){
		
		boolean result = service.isExistsByPhoneNumber(phoneNumber);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping("/export/csv")
    public void exportToExcel(
    		HttpServletResponse servletResponse, 
			@RequestParam(value = "search", required = false) String search,
			TeacherFilterForm filter) throws IOException {
		
		service.exportListTeacher(servletResponse, search, filter);
	}
}
