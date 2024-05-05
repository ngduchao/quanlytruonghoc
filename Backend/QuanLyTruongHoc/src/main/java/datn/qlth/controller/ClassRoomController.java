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

import datn.qlth.dto.AddClassRoomToMajorDTO;
import datn.qlth.dto.AddTeacherToClassDTO;
import datn.qlth.dto.ChangeTeacherDTO;
import datn.qlth.dto.ClassRoomDTO;
import datn.qlth.dto.CreateClassRoomDTO;
import datn.qlth.dto.NumberOfStudentsInClass;
import datn.qlth.dto.UpdateClassRoomDTO;
import datn.qlth.dto.filter.ClassRoomFilterForm;
import datn.qlth.entity.ClassRoom;
import datn.qlth.service.ClassRoomService;
import datn.qlth.validation.classroom.ClassroomCodeExists;
import datn.qlth.validation.classroom.ClassroomIDExists;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/classrooms")
@Validated
public class ClassRoomController {
	
	@Autowired
	private ClassRoomService service;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	public ResponseEntity<?> getAllClassRooms(
			Pageable pageable,
			@RequestParam(value = "search", required = false) String search,
			ClassRoomFilterForm filter){
		
		if (!pageable.getSort().isSorted()) {
	        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("classRoomName").ascending());
	    }
		
		Page<ClassRoom> entityPages = service.getAllClassRooms(pageable, search, filter);
		
		List<ClassRoomDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<ClassRoomDTO>>() {
		}.getType());
		
		List<ClassRoomDTO> dtos2 = dtos.stream().map(e -> {
			
			ClassRoom classRoom = service.getClassRoomByID(e.getClassRoomID());
			
			e.setQuantity(classRoom.getUsers().size());
			
			return e;
		}).toList();
		
		Page<ClassRoomDTO> dtoPage = new PageImpl<>(dtos2, pageable, entityPages.getTotalElements());
		
		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getClassRoomByID(@PathVariable(name = "id") @ClassroomIDExists Integer ID){
		
		ClassRoom classRoom = service.getClassRoomByID(ID);
		
		NumberOfStudentsInClass dto = modelMapper.map(classRoom, NumberOfStudentsInClass.class);
		
		dto.setQuantity(classRoom.getUsers().size());
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/get-class-room-by-class-room-code")
	public ResponseEntity<?> getClassRoomByClassRoomCode(@RequestParam @ClassroomCodeExists String classRoomCode){
		
		ClassRoom classRoom = service.getClassRoomByClassRoomCode(classRoomCode);
		
		NumberOfStudentsInClass dto = modelMapper.map(classRoom, NumberOfStudentsInClass.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/create-class-room")
	public ResponseEntity<?> createClassRoom(@RequestBody CreateClassRoomDTO form){
		
		ClassRoom classRoom = service.createClassRoom(form);
		
		ClassRoomDTO dto = modelMapper.map(classRoom, ClassRoomDTO.class);
		
		dto.setQuantity(classRoom.getUsers().size());
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PutMapping("/update-class-room/{id}")
	public ResponseEntity<?> updateClassRoom(@PathVariable(name = "id") @ClassroomIDExists Integer ID, @RequestBody UpdateClassRoomDTO form){
		
		ClassRoom classRoom = service.updateClassRoom(ID, form);
		
		ClassRoomDTO dto = modelMapper.map(classRoom, ClassRoomDTO.class);
		
		dto.setQuantity(classRoom.getUsers().size());
		
		return new ResponseEntity<>(dto, HttpStatus.OK); 
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteClassRoomByID(@PathVariable(name = "id") @ClassroomIDExists Integer ID){
		
		ClassRoom classRoom = service.deleteClassRoomByID(ID);
		
		ClassRoomDTO dto = modelMapper.map(classRoom, ClassRoomDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK); 
	}
	
	@DeleteMapping("/delete-class-room-by-class-room-code")
	public ResponseEntity<?> deleteClassRoomByClassRoomCode(@RequestParam @ClassroomCodeExists String classRoomCode){
		
		service.deleteClassRoomByClassRoomCode(classRoomCode);
		
		return new ResponseEntity<>("Delete Successfully!", HttpStatus.OK);
	}
	
	@PostMapping("/add-class-room-to-major")
	public ResponseEntity<?> addClassRoomToMajor(@RequestBody AddClassRoomToMajorDTO form){
		
		service.addClassRoomToMajor(form);
		
		return new ResponseEntity<>("Add Classroom To Major Successfully!", HttpStatus.OK); 
	}
	
	@PostMapping("/add-teacher-to-class-room")
	public ResponseEntity<?> addTeacherToClassroom(@RequestBody AddTeacherToClassDTO form){
		
		ClassRoom classRoom = service.getClassRoomByClassRoomCode(form.getClassRoomCode());
		
		if(classRoom.getTeacher() != null) {
			return new ResponseEntity<>("The class has a teacher!", HttpStatus.BAD_REQUEST);
		}
		
		service.addTeacherToClassDTO(form);
		
		return new ResponseEntity<>("Add Teacher To Classroom Successfully!", HttpStatus.OK); 
	}
	
	@PutMapping("/change-teacher")
	public ResponseEntity<?> changeTeacher(@RequestBody ChangeTeacherDTO form){
		
		ClassRoom classRoom = service.getClassRoomByClassRoomCode(form.getClassRoomCode());
		
		if(classRoom.getTeacher() == null) {
			return new ResponseEntity<>("The class doesn't have a teacher yet!", HttpStatus.BAD_REQUEST);
		}
		
		service.changeTeacher(form);
		
		return new ResponseEntity<>("Change Teacher Successfully!", HttpStatus.OK); 
	}
	
	@PutMapping("/delete-teacher-in-class")
	public ResponseEntity<?> deleteTeacherInClassRoom(@RequestParam @ClassroomCodeExists String classRoomCode){
		
		ClassRoom classRoom = service.getClassRoomByClassRoomCode(classRoomCode);
		
		if(classRoom.getTeacher() == null) {
			return new ResponseEntity<>("The class doesn't have a teacher yet!", HttpStatus.BAD_REQUEST);
		}
		
		service.deleteTeacher(classRoomCode);
		
		return new ResponseEntity<>("Delete Teacher In Class Successfully!", HttpStatus.OK); 
		
	}
	
	@GetMapping(value = "/classRoomCode/{classRoomCode}")
	public ResponseEntity<?> existsClassRoomEntityByClassRoomCode(@PathVariable(name = "classRoomCode") String classRoomCode){
		
		boolean result = service.isClassRoomExistsByClassRoomCode(classRoomCode);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/classRoomName/{classRoomName}")
	public ResponseEntity<?> existsClassRoomEntityByClassRoomName(@PathVariable(name = "classRoomName") String classRoomName){
		
		boolean result = service.isClassRoomExistsByClassRoomName(classRoomName);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/classRoomNameAndCourse/{classRoomName}/{course}")
	public ResponseEntity<?> existsClassRoomEntityByClassRoomNameAndCourse(@PathVariable(name = "classRoomName") String classRoomName, @PathVariable(name = "course") Integer course){
		
		boolean result = service.isClassRoomExistsByClassRoomNameAndCourse(classRoomName, course);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping("/export/csv")
    public void exportToExcel(HttpServletResponse response, @RequestParam Integer classRoomID) throws IOException {
		service.exportListStudentsInClass(response, classRoomID);
	}
	
	@GetMapping("/export-all/csv")
    public void exportToExcel(
    		HttpServletResponse servletResponse, 
			@RequestParam(value = "search", required = false) String search,
			ClassRoomFilterForm filter) throws IOException {
		
		service.exportListClassRoom(servletResponse, search, filter);
	}
}
