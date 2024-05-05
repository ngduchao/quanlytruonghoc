package datn.qlth.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import datn.qlth.dto.AddUserToClassDTO;
import datn.qlth.dto.ChangePasswordFromDTO;
import datn.qlth.dto.CreateAdminDTO;
import datn.qlth.dto.CreateRegistrationSubjectFormDTO;
import datn.qlth.dto.CreateUserDTO;
import datn.qlth.dto.StudentDeleteRegistrationSubject;
import datn.qlth.dto.UpdateAdminDTO;
import datn.qlth.dto.UpdateUserDTO;
import datn.qlth.dto.filter.UserFilterForm;
import datn.qlth.entity.RegistrationSubject;
import datn.qlth.entity.User;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {
	
	public Page<User> getAllUsers(Pageable pageable, String search, UserFilterForm filter);
	
	public User createUser (CreateUserDTO form);
	
	public User createAdmin(CreateAdminDTO form);
	
	public User getUserByID (Integer ID);
	
	public User getUserByUsername(String username);
	
	public User getUserByUserCode(String userCode);
	
	public List<User> getListUsers();
	
	public List<User> getList();
	
	public void generateExcel(HttpServletResponse response)  throws IOException;
	
	public void updateUser (Integer ID, UpdateUserDTO form);
	
	public User updateAdmin (Integer ID, UpdateAdminDTO form);
	
	public User deleteUser (Integer ID);
	
	public void addUserToClass(AddUserToClassDTO form);
	
	public List<RegistrationSubject> getRegistrationSubjectsByUser(User user);
	
	public void registrationSubject(User user, CreateRegistrationSubjectFormDTO form);
	
	public void deleteRegistrationSubject(User user, StudentDeleteRegistrationSubject form);
	
	public User getProfile(Integer userID);
	
	public boolean isUserExistsByID(Integer ID);
	
	public boolean isUserExistsByUsername(String username);
	
	public boolean isUserExistsByUserCode(String userCode);
	
	public boolean isUserExistsByEmail(String email);
	
	public boolean isUserExistsByPhoneNumber(String phoneNumber);
	
	public User getUserByEmail(String email);
	
	public void resetPasswordViaEmail(String email);
	
	public void sendResetPasswordViaEmail(String email);
	
	public User changePassword(User user, ChangePasswordFromDTO form);
	
	public void resetPassword(String email, String newPassword);
	
	public void exportListUser(HttpServletResponse servletResponse, String search, UserFilterForm filter)throws IOException;
	
}
