package datn.qlth.specification.teacher;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import datn.qlth.dto.filter.TeacherFilterForm;
import datn.qlth.entity.Teacher;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class TeacherSpecification {
	
	@SuppressWarnings("deprecation")
	public static Specification<Teacher> buildWhere(String search, TeacherFilterForm filter){
		
		Specification<Teacher> where = null;
		
		CustomSpecification init = new CustomSpecification("init", "init");
		where = Specification.where(init);
		
		// Search theo theo teacherName
		if (!StringUtils.isEmpty(search)) {
			search = search.trim();
			CustomSpecification teacherName = new CustomSpecification("teacherName", search);
			CustomSpecification teacherCode = new CustomSpecification("teacherCode", search);
			CustomSpecification homeTown = new CustomSpecification("homeTown", search);
			where = where.and(teacherName).or(teacherCode).or(homeTown);
		}
		
		//filter theo SpecializeLevel
		if(filter == null) {
			return where;
		}
		
		if(filter.getSpecializeLevel() != null) {
			CustomSpecification SpecializeLevel = new CustomSpecification("specializeLevel", filter.getSpecializeLevel());
			where = where.and(SpecializeLevel);
		}

		return where;
	}
}

@SuppressWarnings("serial")
@RequiredArgsConstructor
class CustomSpecification implements Specification<Teacher>{
	
	@NonNull
	private String field;
	@NonNull
	private Object value;

	@Override
	public Predicate toPredicate(
			Root<Teacher> root, 
			CriteriaQuery<?> query, 
			CriteriaBuilder criteriaBuilder) {
		
		if (field.equalsIgnoreCase("init")) {
			return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
		}
		
		if (field.equalsIgnoreCase("teacherName")) {
			return criteriaBuilder.like(root.get("teacherName"), "%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("teacherCode")) {
			return criteriaBuilder.like(root.get("teacherCode"), "%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("homeTown")) {
			return criteriaBuilder.like(root.get("homeTown"), "%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("specializeLevel")) {
			return criteriaBuilder.equal(root.get("specializeLevel"), value);
		}
		
		return null;
	}
	
	
}
