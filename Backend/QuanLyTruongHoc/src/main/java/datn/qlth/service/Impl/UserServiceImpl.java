package datn.qlth.service.Impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import datn.qlth.dto.AddUserToClassDTO;
import datn.qlth.dto.ChangePasswordFromDTO;
import datn.qlth.dto.CreateAdminDTO;
import datn.qlth.dto.CreateRegistrationSubjectFormDTO;
import datn.qlth.dto.CreateUserDTO;
import datn.qlth.dto.StudentDeleteRegistrationSubject;
import datn.qlth.dto.UpdateAdminDTO;
import datn.qlth.dto.UpdateUserDTO;
import datn.qlth.dto.filter.UserFilterForm;
import datn.qlth.entity.ClassRoom;
import datn.qlth.entity.RegistrationSubject;
import datn.qlth.entity.Subject;
import datn.qlth.entity.User;
import datn.qlth.event.OnResetPasswordViaEmailEvent;
import datn.qlth.repository.ClassRoomRepository;
import datn.qlth.repository.RegistrationSubjectRepository;
import datn.qlth.repository.SubjectRepository;
import datn.qlth.repository.UserRepository;
import datn.qlth.service.UserService;
import datn.qlth.specification.user.UserSpecification;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ClassRoomRepository classRoomRepository;
	
	@Autowired
	private RegistrationSubjectRepository registrationSubjectRepository;
	
	@Autowired
	private SubjectRepository subjectRepository;
	
	@Autowired
	private ApplicationEventPublisher eventPublisher;

	@Override
	public Page<User> getAllUsers(Pageable pageable, String search, UserFilterForm filter) {
		
		Specification<User> where = UserSpecification.buildWhere(search, filter);
		
		return repository.findAll(where, pageable);
	}

	@Override
	public User createUser(CreateUserDTO form) {
		
		User user = modelMapper.map(form, User.class);
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		ClassRoom classRoom = classRoomRepository.findById(form.getClassRoomID()).get();
		
//		classRoom.setQuantity(classRoom.getQuantity() + 1);
		
		user.setClassRoom(classRoom);
		
		return repository.save(user);
	}

	@Override
	public User getUserByID(Integer ID) {
		
		return repository.findById(ID).get();
	}

	@Override
	public void updateUser(Integer ID, UpdateUserDTO form) {
		
		User user  = repository.findById(ID).get();
		
		if(form.getEmail() == null || form.getEmail().isEmpty()) {
			form.setEmail(user.getEmail());
		}
		if(form.getFirstName() == null || form.getFirstName().isEmpty()) {
			form.setFirstName(user.getFirstName());
		}
		if(form.getLastName() == null || form.getLastName().isEmpty()) {
			form.setLastName(user.getLastName());
		}
		if(form.getPhoneNumber() == null || form.getPhoneNumber().isEmpty()) {
			form.setPhoneNumber(user.getPhoneNumber());
		}
		if(form.getBirthDay() == null) {
			form.setBirthDay(user.getBirthDay());
		}
		if(form.getHomeTown() == null || form.getHomeTown().isEmpty()) {
			form.setHomeTown(user.getHomeTown());
		}
		
		ClassRoom classRoom = classRoomRepository.findById(form.getClassRoomID()).get();
		
		if(form.getClassRoomID() != null) {
			if(user.getClassRoom().getClassRoomID() != form.getClassRoomID()) {
				
//				// lớp cũ -1 sv
//				user.getClassRoom().setQuantity(user.getClassRoom().getQuantity() - 1);
//				// lớp mới +1 sv
//				classRoom.setQuantity(classRoom.getQuantity() + 1);

				user.setClassRoom(classRoom);
			}
			if(user.getClassRoom().getClassRoomID() == form.getClassRoomID()) {
				user.setClassRoom(classRoom);
			}
		}
		
		if(user.getClassRoom() == null) {
			if(form.getClassRoomID() != null) {
				user.setClassRoom(classRoom);
			}
		}
		
		if(form.getGender() == null) {
			form.setGender(user.getGender());
		}
		
		user.setEmail(form.getEmail());
		user.setFirstName(form.getFirstName());
		user.setLastName(form.getLastName());
		user.setPhoneNumber(form.getPhoneNumber());
		user.setBirthDay(form.getBirthDay());
		user.setHomeTown(form.getHomeTown());
		user.setGender(form.getGender());

		repository.save(user);
	}

	@Override
	public User deleteUser(Integer ID) {
		
		User user = repository.findById(ID).get();
		
//		if(user.getClassRoom() != null) {
//			ClassRoom classRoom = classRoomRepository.findById(user.getClassRoom().getClassRoomID()).get();
//			classRoom.setQuantity(classRoom.getQuantity() - 1);
//
//		}
		
		repository.deleteById(ID);
		
		return user;
	}

	@Override
	public void addUserToClass(AddUserToClassDTO form) {
		
		User user = repository.findByUsername(form.getUsername()).get();
		
//		ClassRoom classRoom = classRoomRepository.findByClassRoomCode(form.getClassRoomCode());
		
//		classRoom.setQuantity(classRoom.getQuantity() + 1);
		
//		user.setClassRoom(classRoom);
		
		repository.save(user);
	}

	@Override
	public User getUserByUsername(String username) {
		return repository.findByUsername(username).get();
	}

	@Override
	public List<RegistrationSubject> getRegistrationSubjectsByUser(User user) {
		
		List<RegistrationSubject> list = registrationSubjectRepository.findByUser(user);
		
		return list;
	}

	@Override
	public void registrationSubject(User user, CreateRegistrationSubjectFormDTO form) {
		
		float diem = 0;
		
		Subject subject = subjectRepository.findBySubjectCode(form.getSubjectCode());
		
		RegistrationSubject registrationSubject = modelMapper.map(form, RegistrationSubject.class);
		
		registrationSubject.setUser(user);
		registrationSubject.setSubject(subject);
		registrationSubject.setFinalScore(diem);
		registrationSubject.setMidtermScore(diem);
		registrationSubject.setRegularPoint1(diem);
		registrationSubject.setRegularPoint2(diem);
		
		registrationSubjectRepository.save(registrationSubject);
	}

	@Override
	public void deleteRegistrationSubject(User user, StudentDeleteRegistrationSubject form) {
		
		List<RegistrationSubject> list = registrationSubjectRepository.findByUser(user);
		
		for (RegistrationSubject registrationSubject : list) {
			
			if(registrationSubject.getSubject().getSubjectID() == form.getSubjectID()) {
				
				registrationSubjectRepository.deleteById(registrationSubject.getRegistrationSubjectID());
			}
		}
	}

	@Override
	public User getProfile(Integer userID) {
		
		User user = repository.findById(userID).get();
		
		return user;
	}

	@Override
	public boolean isUserExistsByID(Integer ID) {
		return repository.existsById(ID);
	}

	@Override
	public boolean isUserExistsByUsername(String username) {
		return repository.existsByUsername(username);
	}

	@Override
	public boolean isUserExistsByUserCode(String userCode) {
		return repository.existsByUserCode(userCode);
	}

	@Override
	public boolean isUserExistsByEmail(String email) {
		return repository.existsByEmail(email);
	}

	@Override
	public User getUserByEmail(String email) {
		return repository.findByEmail(email);
	}
	
	@Override
	public void sendResetPasswordViaEmail(String email) {
		eventPublisher.publishEvent(new OnResetPasswordViaEmailEvent(email));
	}

	@Override
	public void resetPasswordViaEmail(String email) {
		
		sendResetPasswordViaEmail(email);
	}

	@Override
	public User changePassword(User user, ChangePasswordFromDTO form) {
	
		user.setPassword(passwordEncoder.encode(form.getNewPassword()));

		return repository.save(user);
	}

	@Override
	public void resetPassword(String email, String newPassword) {
		
		User user = repository.findByEmail(email);
		
		user.setPassword(passwordEncoder.encode(newPassword));
		
		repository.save(user);
	}

	@Override
	public List<User> getListUsers() {
		return repository.findByRole("USER");
	}

	@Override
	public User updateAdmin(Integer ID, UpdateAdminDTO form) {
		
		User user = repository.findById(ID).get();
		
		if(form.getEmail() == null || form.getEmail().isEmpty()) {
			form.setEmail(user.getEmail());
		}
		if(form.getFirstName() == null || form.getFirstName().isEmpty()) {
			form.setFirstName(user.getFirstName());
		}
		if(form.getLastName() == null || form.getLastName().isEmpty()) {
			form.setLastName(user.getLastName());
		}
		if(form.getPhoneNumber() == null || form.getPhoneNumber().isEmpty()) {
			form.setPhoneNumber(user.getPhoneNumber());
		}
		if(form.getBirthDay() == null) {
			form.setBirthDay(user.getBirthDay());
		}
		if(form.getHomeTown() == null || form.getHomeTown().isEmpty()) {
			form.setHomeTown(user.getHomeTown());
		}
		if(form.getGender() == null) {
			form.setGender(user.getGender());
		}
		
		user.setEmail(form.getEmail());
		user.setFirstName(form.getFirstName());
		user.setLastName(form.getLastName());
		user.setPhoneNumber(form.getPhoneNumber());
		user.setBirthDay(form.getBirthDay());
		user.setHomeTown(form.getHomeTown());
		user.setGender(form.getGender());

		return repository.save(user);
	}

	@Override
	public User createAdmin(CreateAdminDTO form) {
		
		User user = modelMapper.map(form, User.class);
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		return repository.save(user);
	}

	@Override
	public boolean isUserExistsByPhoneNumber(String phoneNumber) {
		
		return repository.existsByPhoneNumber(phoneNumber);
	}

	@Override
	public User getUserByUserCode(String userCode) {
		return repository.findByUserCode(userCode);
	}

}
