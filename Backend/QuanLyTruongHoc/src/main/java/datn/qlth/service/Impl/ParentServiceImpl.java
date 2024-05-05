package datn.qlth.service.Impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import datn.qlth.dto.CreateParentFormDTO;
import datn.qlth.dto.UpdateParentFormDTO;
import datn.qlth.entity.Parent;
import datn.qlth.entity.User;
import datn.qlth.repository.ParentRepository;
import datn.qlth.repository.UserRepository;
import datn.qlth.service.ParentService;

@Service
public class ParentServiceImpl implements ParentService{
	
	@Autowired
	private ParentRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<Parent> getAllParents() {
		
		return repository.findAll();
	}

	@Override
	public List<Parent> getParentsOfUser(Integer userID) {
		
		User user = userRepository.findById(userID).get();
		
		return repository.findByUser(user);
	}

	@Override
	public Parent getParentByID(Integer ID) {
		return repository.findById(ID).get();
	}

	@Override
	public void createParentOfUser(User user, CreateParentFormDTO form) {
		
		Parent parent = modelMapper.map(form, Parent.class);
		
		parent.setUser(user);
		
		repository.save(parent);
	}

	@Override
	public void deleteParentByID(Integer ID) {
		
		repository.deleteById(ID);
	}

	@Override
	public void updateParentByID(Integer ID, UpdateParentFormDTO form) {
		
		Parent parent = repository.findById(ID).get();
		
		if(form.getFirstName() == null || form.getFirstName().isEmpty()) {
			form.setFirstName(parent.getFirstName());
		}
		if(form.getLastName() == null || form.getLastName().isEmpty()) {
			form.setLastName(parent.getLastName());
		}
		if(form.getYearOfBirthDay() == null || form.getYearOfBirthDay() > 2024) {
			form.setYearOfBirthDay(parent.getYearOfBirthDay());
		}
		if(form.getPhoneNumber() == null || form.getPhoneNumber().isEmpty()) {
			form.setPhoneNumber(parent.getPhoneNumber());
		}
		if(form.getJob() == null || form.getJob().isEmpty()) {
			form.setJob(parent.getJob());
		}
		if(form.getRelationship() == null || form.getRelationship().isEmpty()) {
			form.setRelationship(parent.getRelationship());
		}
		
		parent.setFirstName(form.getFirstName());
		parent.setLastName(form.getLastName());
		parent.setYearOfBirthDay(form.getYearOfBirthDay());
		parent.setPhoneNumber(form.getPhoneNumber());
		parent.setJob(form.getJob());
		parent.setRelationship(form.getRelationship());
		
		repository.save(parent);
	}

	@Override
	public void createParentToUserByAdmin(Integer userID, CreateParentFormDTO form) {
		
		User user = userRepository.findById(userID).get();
		
		Parent parent = modelMapper.map(form, Parent.class);
		
		parent.setUser(user);
		
		repository.save(parent);
	}

	@Override
	public boolean isParentExistsByParentID(Integer ID) {
		return repository.existsByParentID(ID);
	}

}
