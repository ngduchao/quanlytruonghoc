package datn.qlth.specification.major;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import datn.qlth.dto.filter.MajorFilterForm;
import datn.qlth.entity.Faculty;
import datn.qlth.entity.Major;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class MajorSpecification {
	
	@SuppressWarnings("deprecation")
	public static Specification<Major> buildWhere(String search, MajorFilterForm filter){
		
		Specification<Major> where = null;
		
		CustomSpecification init = new CustomSpecification("init", "init");
		where = Specification.where(init);
		
		// Search theo theo majorName
		if (!StringUtils.isEmpty(search)) {
			search = search.trim();
			CustomSpecification majorName = new CustomSpecification("majorName", search);
			CustomSpecification majorCode = new CustomSpecification("majorCode", search);
			where = where.and(majorName).or(majorCode);
		}
		
		//filter theo majorCode
		if(filter == null) {
			return where;
		}
		
		if(filter.getMajorCode() != null) {
			CustomSpecification majorCode = new CustomSpecification("majorCode", filter.getMajorCode());
			where = where.and(majorCode);
		}
		
		if (!StringUtils.isEmpty(filter.getFacultyName())) {
	        CustomSpecification facultyName = new CustomSpecification("facultyName", filter.getFacultyName());
	        where = where.and(facultyName);
	    }
		return where;
	}
}

@RequiredArgsConstructor
class CustomSpecification implements Specification<Major>{

	private static final long serialVersionUID = 1L;
	
	@NonNull
	private String field;
	@NonNull
	private Object value;

	@Override
	public Predicate toPredicate(
			Root<Major> root, 
			CriteriaQuery<?> query, 
			CriteriaBuilder criteriaBuilder) {
		
		if (field.equalsIgnoreCase("init")) {
			return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
		}
		
		if (field.equalsIgnoreCase("majorName")) {
			return criteriaBuilder.like(root.get("majorName"), "%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("majorCode")) {
			return criteriaBuilder.like(root.get("majorCode"),"%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("facultyName")) {
	        Join<Major, Faculty> facultyJoin = root.join("faculty");
	        return criteriaBuilder.equal(facultyJoin.get("facultyName"), value.toString());
	    }
		
		if (field.equalsIgnoreCase("majorCode")) {
			return criteriaBuilder.like(root.get("majorCode"),value.toString());
		}
		
		
		return null;
	}
	
}

