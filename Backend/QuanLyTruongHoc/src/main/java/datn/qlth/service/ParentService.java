package datn.qlth.service;

import java.util.List;

import datn.qlth.dto.CreateParentFormDTO;
import datn.qlth.dto.UpdateParentFormDTO;
import datn.qlth.entity.Parent;
import datn.qlth.entity.User;

public interface ParentService {
	
	public List<Parent> getAllParents();
	
	public List<Parent> getParentsOfUser(Integer userID);
	
	public Parent getParentByID(Integer ID);
	
	public void createParentOfUser(User user, CreateParentFormDTO form);
	
	public void createParentToUserByAdmin(Integer userID, CreateParentFormDTO form);
	
	public void deleteParentByID(Integer ID);
	
	public void updateParentByID(Integer ID, UpdateParentFormDTO form);
	
	public boolean isParentExistsByParentID(Integer ID);
}
