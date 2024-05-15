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
import org.springframework.web.bind.annotation.RestController;

import datn.qlth.dto.CreateParentFormDTO;
import datn.qlth.dto.ParentDTO;
import datn.qlth.dto.UpdateParentFormDTO;
import datn.qlth.entity.Parent;
import datn.qlth.entity.User;
import datn.qlth.service.ParentService;
import datn.qlth.service.UserService;
import datn.qlth.validation.parent.ParentIDExists;
import datn.qlth.validation.user.UserIDExists;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/parents")
@Validated
public class ParentController {
	
	@Autowired
	private ParentService service;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserService userService;
	
	@GetMapping()
	public ResponseEntity<?> getAllParents(){
		
		List<Parent> list = service.getAllParents();
		
		List<ParentDTO> dtos = modelMapper.map(list, new TypeToken<List<ParentDTO>>() {}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
	
	@GetMapping("/get-parent-of-user/{userID}")
	public ResponseEntity<?> getParentsOfUser(@PathVariable(name = "userID") @UserIDExists Integer userID){
		
		List<Parent> list = service.getParentsOfUser(userID);
		
		List<ParentDTO> dtos = modelMapper.map(list, new TypeToken<List<ParentDTO>>() {}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getParentByID(@PathVariable(name = "id") @ParentIDExists Integer ID){
		
		Parent parent = service.getParentByID(ID);
		
		ParentDTO dto = modelMapper.map(parent, ParentDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/create-parent-of-user")
	public ResponseEntity<?> createParentOfUser(Authentication authentication, @RequestBody CreateParentFormDTO form){
		
		User user = userService.getUserByUsername(authentication.getName());
		
		service.createParentOfUser(user, form);
		
		return new ResponseEntity<>("Create Successfully!", HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-parent/{id}")
	public ResponseEntity<?> deleteParentByID(@PathVariable(name = "id") @ParentIDExists Integer ID){
		
		service.deleteParentByID(ID);
		
		return new ResponseEntity<>("Delete Successfully!", HttpStatus.OK);
	}
	
	@PutMapping("/update-parent/{id}")
	public ResponseEntity<?> updateParentByID(@PathVariable(name = "id") @ParentIDExists Integer ID, @RequestBody UpdateParentFormDTO form){
		
		service.updateParentByID(ID, form);
		
		return new ResponseEntity<>("Update Successfully!", HttpStatus.OK);
	}
	
	@PostMapping("/create-parent-to-user-by-admin/{userID}")
	public ResponseEntity<?> createParentToUserByAdmin(@PathVariable(name = "userID") @UserIDExists Integer userID, @RequestBody CreateParentFormDTO form){
		
		service.createParentToUserByAdmin(userID, form);
		
		return new ResponseEntity<>("Create Successfully!", HttpStatus.OK);
	}
}
