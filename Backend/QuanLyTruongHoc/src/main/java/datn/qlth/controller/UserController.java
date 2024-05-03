package datn.qlth.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
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

import datn.qlth.dto.AddUserToClassDTO;
import datn.qlth.dto.ChangePasswordFromDTO;
import datn.qlth.dto.CreateAdminDTO;
import datn.qlth.dto.CreateRegistrationSubjectFormDTO;
import datn.qlth.dto.CreateUserDTO;
import datn.qlth.dto.RegistrationSubjectDTO;
import datn.qlth.dto.StudentDeleteRegistrationSubject;
import datn.qlth.dto.UpdateAdminDTO;
import datn.qlth.dto.UpdateUserDTO;
import datn.qlth.dto.UserDTO;
import datn.qlth.dto.filter.UserFilterForm;
import datn.qlth.entity.RegistrationSubject;
import datn.qlth.entity.User;
import datn.qlth.entity.UserExcelExporter;
import datn.qlth.service.UserService;
import datn.qlth.validation.user.UserCodeExists;
import datn.qlth.validation.user.UserIDExists;
import datn.qlth.validation.user.UsernameExists;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/users")
@Validated
public class UserController {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping()
	public ResponseEntity<?> getAllUsers(
			Pageable pageable,
			@RequestParam(value = "search", required = false) String search,
			UserFilterForm filter){
		
		if (!pageable.getSort().isSorted()) {
	        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("userID").ascending());
	    }
		
		Page<User> entityPages = service.getAllUsers(pageable, search, filter);
		
		List<UserDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<UserDTO>>() {
		}.getType());
		
		Page<UserDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());
		
		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
	
	@PostMapping("/create-user")
	public ResponseEntity<?> createUser(@RequestBody CreateUserDTO form){
		
		User user = service.createUser(form);
		
		UserDTO dto = modelMapper.map(user, UserDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/create-admin")
	public ResponseEntity<?> createAdmin(@RequestBody CreateAdminDTO form){
		
		User user = service.createAdmin(form);
		
		UserDTO dto = modelMapper.map(user, UserDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserByID (@PathVariable(name = "id") @UserIDExists Integer ID){
		
		User user = service.getUserByID(ID);
		
		UserDTO dto = modelMapper.map(user, UserDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/get-user-by-username")
	public ResponseEntity<?> getUserByUsername(@RequestParam @UsernameExists String username){
		
		User user = service.getUserByUsername(username);
		
		UserDTO dto = modelMapper.map(user, UserDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/get-user-by-userCode")
	public ResponseEntity<?> getUserByUserCode(@RequestParam(name = "userCode") @UserCodeExists String userCode){
		
		User user = service.getUserByUserCode(userCode);
		
		UserDTO dto = modelMapper.map(user, UserDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PutMapping("/update-user/{id}")
	public ResponseEntity<?> updateUser(@PathVariable(name = "id") @UserIDExists Integer ID, @RequestBody UpdateUserDTO form){
				
		service.updateUser(ID, form);
		
		User user = service.getUserByID(ID);
		
		UserDTO dto = modelMapper.map(user, UserDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PutMapping("/update-admin/{id}")
	public ResponseEntity<?> updateAdmin(@PathVariable(name = "id") @UserIDExists Integer ID, @RequestBody UpdateAdminDTO form){
				
		User user = service.updateAdmin(ID, form);
		
		UserDTO dto = modelMapper.map(user, UserDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(Authentication authentication , @PathVariable(name = "id") @UserIDExists Integer ID){
		
		User userLogin = service.getUserByUsername(authentication.getName()); 

		if(userLogin.getUserID() == ID) {
			return new ResponseEntity<>("Delete Fail!", HttpStatus.BAD_REQUEST);
		}else {
			User user = service.deleteUser(ID);
			
			UserDTO dto = modelMapper.map(user, UserDTO.class);
			
			return new ResponseEntity<>(dto, HttpStatus.OK);
		}
	}
	
	@PostMapping("/add-user-to-class-room")
	public ResponseEntity<?> addUserToClass(@RequestBody AddUserToClassDTO form){
		
		service.addUserToClass(form);
		
		return new ResponseEntity<>("Add User To Class Successfully!", HttpStatus.OK);
	}
	
	@GetMapping("/get-registration-subject-by-user")
	public ResponseEntity<?> getRegistrationSubjectsByUser(Authentication authentication){
		
		User user = service.getUserByUsername(authentication.getName());
		
		List<RegistrationSubject> list = service.getRegistrationSubjectsByUser(user);
		
		List<RegistrationSubjectDTO> dtos = modelMapper.map(list, new TypeToken<List<RegistrationSubjectDTO>>() {}.getType());
		
		return new ResponseEntity<>(dtos, HttpStatus.OK);
	}
	
	@PostMapping("/registration-subject")
	public ResponseEntity<?> registrationSubject(Authentication authentication, @RequestBody CreateRegistrationSubjectFormDTO form){
		
		User user = service.getUserByUsername(authentication.getName());
		
		service.registrationSubject(user, form);
		
		return new  ResponseEntity<>("Registration Subject Successfully!", HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-registration-subject")
	public ResponseEntity<?> deleteRegistrationSubject(Authentication authentication, @RequestBody StudentDeleteRegistrationSubject form){
		
		User user = service.getUserByUsername(authentication.getName());
		
		service.deleteRegistrationSubject(user, form);
		
		return new  ResponseEntity<>("Delete Successfully!", HttpStatus.OK);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(Authentication authentication){
		
		if(authentication != null) {
			
			User user = service.getUserByUsername(authentication.getName());
			
			UserDTO dto = modelMapper.map(user, UserDTO.class);
			
			return new ResponseEntity<>(dto, HttpStatus.OK);
		}
		
		return new ResponseEntity<>(authentication, HttpStatus.OK);
	}
	
	@GetMapping("/get-user-by-email")
	public ResponseEntity<?> getUserByEmail(@RequestParam String email){
		
		User user = service.getUserByEmail(email);
		
		UserDTO dto = modelMapper.map(user, UserDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/resetPasswordRequest")
	public ResponseEntity<?> sendResetPasswordViaEmail(@RequestParam String email) {

		service.resetPasswordViaEmail(email);

		return new ResponseEntity<>("We have sent an email. Please check email!", HttpStatus.OK);
	}
	
	@PutMapping("/changePassword")
	public ResponseEntity<?> changePassword(Authentication authentication, @RequestBody ChangePasswordFromDTO form){
		
		User user = service.getUserByUsername(authentication.getName());
		
		if(passwordEncoder.matches(form.getOldPassword(), user.getPassword())) {
						
			user = service.changePassword(user, form);
			
			UserDTO dto = modelMapper.map(user, UserDTO.class);
			
			return new ResponseEntity<>(dto, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping(value = "/email/{email}")
	public ResponseEntity<?> existsUserByEmail(@PathVariable(name = "email") String email){
		
		boolean result = service.isUserExistsByEmail(email);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/userCode/{userCode}")
	public ResponseEntity<?> existsUserByUserCode(@PathVariable(name = "userCode") String userCode){
		
		boolean result = service.isUserExistsByUserCode(userCode);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/username/{username}")
	public ResponseEntity<?> existsUserByUsername(@PathVariable(name = "username") String username){
		
		boolean result = service.isUserExistsByUsername(username);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/phoneNumber/{phoneNumber}")
	public ResponseEntity<?> existsUserByPhoneNumber(@PathVariable(name = "phoneNumber") String phoneNumber){
		
		boolean result = service.isUserExistsByPhoneNumber(phoneNumber);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/export")
	public void exportUserToExcel(HttpServletResponse response) throws IOException{
		response.setContentType("application/octet-stream");
		String headerKey = "Content-Disposition";
		String headerValue = "attachment;filename=students.xlsx";
		response.setHeader(headerKey, headerValue);
		service.generateExcel(response);
 	}
	
	@GetMapping("/export/excelbyapi")
    public String exportToExcelByAPI(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
         
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users.xlsx";
        response.setHeader(headerKey, headerValue);
         
        List<User> listUsers = service.getList();
   
        UserExcelExporter excelExporter = new UserExcelExporter(listUsers);
         
        excelExporter.export(response);
        
        
        return "OK";
    }
	
	@GetMapping("/export/excel")
    public void exportToExcel(HttpServletResponse response) throws IOException {
		service.exportListUser(response);
	}
}
