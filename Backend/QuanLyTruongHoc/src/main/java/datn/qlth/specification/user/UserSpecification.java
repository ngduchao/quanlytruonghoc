package datn.qlth.specification.user;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import datn.qlth.dto.filter.UserFilterForm;
import datn.qlth.entity.ClassRoom;
import datn.qlth.entity.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class UserSpecification {
	
	@SuppressWarnings("deprecation")
	public static Specification<User> buildWhere(String search, UserFilterForm filter){
		
		Specification<User> where = null;
		
		CustomSpecification init = new CustomSpecification("init", "init");
		where = Specification.where(init);
		
		// Search theo theo username & firstname & lastname
		if (!StringUtils.isEmpty(search)) {
			search = search.trim();
			CustomSpecification username = new CustomSpecification("username", search);
			CustomSpecification firstName = new CustomSpecification("firstName", search);
			CustomSpecification lastName = new CustomSpecification("lastName", search);
			where = where.and((username).or(firstName).or(lastName));
		}
		
		//filter theo role
		if(filter == null) {
			return where;
		}
		
		if(filter.getRole() != null) {
			CustomSpecification role = new CustomSpecification("role", filter.getRole());
			where = where.and(role);
		}

		if (!StringUtils.isEmpty(filter.getClassRoomName())) {
	        CustomSpecification classRoomName = new CustomSpecification("classRoomName", filter.getClassRoomName());
	        where = where.and(classRoomName);
	    }
		
		if (!StringUtils.isEmpty(filter.getClassRoomID())) {
	        CustomSpecification classRoomID = new CustomSpecification("classRoomID", filter.getClassRoomID());
	        where = where.and(classRoomID);
	    }
		return where;
	}
}

@SuppressWarnings("serial")
@RequiredArgsConstructor
class CustomSpecification implements Specification<User>{
	
	@NonNull
	private String field;
	@NonNull
	private Object value;

	@Override
	public Predicate toPredicate(
			Root<User> root, 
			CriteriaQuery<?> query, 
			CriteriaBuilder criteriaBuilder) {
		
		if (field.equalsIgnoreCase("init")) {
			return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
		}
		
		if (field.equalsIgnoreCase("username")) {
			return criteriaBuilder.like(root.get("username"), "%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("firstName")) {
			return criteriaBuilder.like(root.get("firstName"), "%" + value.toString() + "%");
		}

		if (field.equalsIgnoreCase("lastName")) {
			return criteriaBuilder.like(root.get("lastName"), "%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("role")) {
			return criteriaBuilder.equal(root.get("role"), value);
		}
		
		if (field.equalsIgnoreCase("classRoomName")) {
	        Join<User, ClassRoom> classRoomJoin = root.join("classRoom");
	        return criteriaBuilder.equal(classRoomJoin.get("classRoomName"), value.toString());
	    }
		
		if (field.equalsIgnoreCase("classRoomID")) {
	        Join<User, ClassRoom> classRoomJoin = root.join("classRoom");
	        return criteriaBuilder.equal(classRoomJoin.get("classRoomID"), value.toString());
	    }
		
		return null;
	}
	
	
}
