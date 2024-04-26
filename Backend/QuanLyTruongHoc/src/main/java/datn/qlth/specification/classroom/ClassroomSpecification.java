package datn.qlth.specification.classroom;

import java.util.Date;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import datn.qlth.dto.filter.ClassRoomFilterForm;
import datn.qlth.entity.ClassRoom;
import datn.qlth.entity.Major;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class ClassroomSpecification {
	
	@SuppressWarnings("deprecation")
	public static Specification<ClassRoom> buildWhere(String search, ClassRoomFilterForm filter){
		
		Specification<ClassRoom> where = null;
		
		CustomSpecification init = new CustomSpecification("init", "init");
		where = Specification.where(init);
		
		// Search theo theo classRoomName
		if (!StringUtils.isEmpty(search)) {
			search = search.trim();
			CustomSpecification classRoomName = new CustomSpecification("classRoomName", search);
			CustomSpecification classRoomCode = new CustomSpecification("classRoomCode", search);
			CustomSpecification teacherName = new CustomSpecification("teacherName", search);
			where = where.and(classRoomName).or(classRoomCode).or(teacherName);
		}
		
		//filter theo classRoomCode
		if(filter == null) {
			return where;
		}
		
		if(filter.getClassRoomCode() != null) {
			CustomSpecification classRoomCode = new CustomSpecification("classRoomCode", filter.getClassRoomCode());
			where = where.and(classRoomCode);
		}
		
		// min created date
		if (filter.getMinTimeCreated() != null) {
			CustomSpecification minTimeCreate = new CustomSpecification("minTimeCreated", filter.getMinTimeCreated());
			where = where.and(minTimeCreate);
		}		
				
		// max created date
		if (filter.getMaxTimeCreated() != null) {
			CustomSpecification maxTimeCreate = new CustomSpecification("maxTimeCreated", filter.getMaxTimeCreated());
			where = where.and(maxTimeCreate);
		}
		
		if (!StringUtils.isEmpty(filter.getMajorName())) {
	        CustomSpecification majorName = new CustomSpecification("majorName", filter.getMajorName());
	        where = where.and(majorName);
	    }

		return where;
	}
}

@RequiredArgsConstructor
class CustomSpecification implements Specification<ClassRoom>{

	private static final long serialVersionUID = 1L;
	
	@NonNull
	private String field;
	@NonNull
	private Object value;

	@Override
	public Predicate toPredicate(
			Root<ClassRoom> root, 
			CriteriaQuery<?> query, 
			CriteriaBuilder criteriaBuilder) {
		
		if (field.equalsIgnoreCase("init")) {
			return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
		}
		
		if (field.equalsIgnoreCase("classRoomName")) {
			return criteriaBuilder.like(root.get("classRoomName"), "%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("classRoomCode")) {
			return criteriaBuilder.like(root.get("classRoomCode"),"%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("teacherName")) {
			return criteriaBuilder.like(root.get("teacher").get("teacherName"), "%" + value.toString() + "%");
		}
		
		
		if (field.equalsIgnoreCase("classRoomCode")) {
			return criteriaBuilder.like(root.get("classRoomCode"),value.toString());
		}
		
		if (field.equalsIgnoreCase("minTimeCreated")) {
			return criteriaBuilder.greaterThanOrEqualTo(
					root.get("createdDate"), (Date) value);
		}
		
		if (field.equalsIgnoreCase("maxTimeCreated")) {
			return criteriaBuilder.lessThanOrEqualTo(
					root.get("createdDate"), (Date) value);
		}
		
		if (field.equalsIgnoreCase("majorName")) {
	        Join<ClassRoom, Major> facultyJoin = root.join("major");
	        return criteriaBuilder.equal(facultyJoin.get("majorName"), value.toString());
	    }
		
		return null;
	}
	
}

