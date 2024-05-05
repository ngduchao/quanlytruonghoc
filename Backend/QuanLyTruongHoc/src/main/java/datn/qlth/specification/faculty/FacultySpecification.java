package datn.qlth.specification.faculty;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import datn.qlth.dto.filter.FacultyFilterForm;
import datn.qlth.entity.Faculty;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class FacultySpecification {
	
	@SuppressWarnings("deprecation")
	public static Specification<Faculty> buildWhere(String search, FacultyFilterForm filter){
		
		Specification<Faculty> where = null;
		
		CustomSpecification init = new CustomSpecification("init", "init");
		where = Specification.where(init);
		
		// Search theo theo facultyName
		if (!StringUtils.isEmpty(search)) {
			search = search.trim();
			CustomSpecification facultyName = new CustomSpecification("facultyName", search);
			CustomSpecification facultyCode = new CustomSpecification("facultyCode", search);
			where = where.and((facultyName).or(facultyCode));
		}
		
		//filter theo facultyCode
		if(filter == null) {
			return where;
		}
		
		if(filter.getFacultyCode() != null) {
			CustomSpecification facultyCode = new CustomSpecification("facultyCode", filter.getFacultyCode());
			where = where.and(facultyCode);
		}

		return where;
	}
}

@RequiredArgsConstructor
class CustomSpecification implements Specification<Faculty>{

	private static final long serialVersionUID = 1L;
	
	@NonNull
	private String field;
	@NonNull
	private Object value;

	@Override
	public Predicate toPredicate(
			Root<Faculty> root, 
			CriteriaQuery<?> query, 
			CriteriaBuilder criteriaBuilder) {
		
		if (field.equalsIgnoreCase("init")) {
			return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
		}
		
		if (field.equalsIgnoreCase("facultyName")) {
			return criteriaBuilder.like(root.get("facultyName"), "%" + value.toString() + "%");
		}
		if (field.equalsIgnoreCase("facultyCode")) {
			return criteriaBuilder.like(root.get("facultyCode"), "%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("facultyCode")) {
			return criteriaBuilder.like(root.get("facultyCode"),value.toString());
		}
		
		return null;
	}
	
}

