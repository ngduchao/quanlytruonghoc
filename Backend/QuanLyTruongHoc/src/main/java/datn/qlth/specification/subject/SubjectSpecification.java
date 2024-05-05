package datn.qlth.specification.subject;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import datn.qlth.dto.filter.SubjectFilterForm;
import datn.qlth.entity.Subject;
import datn.qlth.entity.Teacher;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class SubjectSpecification {
	
	@SuppressWarnings("deprecation")
	public static Specification<Subject> buildWhere(String search, SubjectFilterForm filter){
		
		Specification<Subject> where = null;
		
		CustomSpecification init = new CustomSpecification("init", "init");
		where = Specification.where(init);
		
		// Search theo theo subjectName
		if (!StringUtils.isEmpty(search)) {
			search = search.trim();
			CustomSpecification subjectName = new CustomSpecification("subjectName", search);
			CustomSpecification subjectCode = new CustomSpecification("subjectCode", search);
//			CustomSpecification teacherName = new CustomSpecification("teacherName", search);
			where = where.and(subjectName).or(subjectCode);
		}
		
		//filter theo subjectCode
		if(filter == null) {
			return where;
		}
		
		if(filter.getSubjectStatus() != null) {
			CustomSpecification subjectStatus = new CustomSpecification("subjectStatus", filter.getSubjectStatus());
			where = where.and(subjectStatus);
		}
		
		if(filter.getSubjectCode() != null) {
			CustomSpecification subjectCode = new CustomSpecification("subjectCode", filter.getSubjectCode());
			where = where.and(subjectCode);
		}
		
		if (!StringUtils.isEmpty(filter.getTeacherName())) {
	        CustomSpecification teacherName = new CustomSpecification("teacherName", filter.getTeacherName());
	        where = where.and(teacherName);
	    }
		
//		teacherName

		return where;
	}
}

@RequiredArgsConstructor
class CustomSpecification implements Specification<Subject>{

	private static final long serialVersionUID = 1L;
	
	@NonNull
	private String field;
	@NonNull
	private Object value;

	@Override
	public Predicate toPredicate(
			Root<Subject> root, 
			CriteriaQuery<?> query, 
			CriteriaBuilder criteriaBuilder) {
		
		if (field.equalsIgnoreCase("init")) {
			return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
		}
		
		if (field.equalsIgnoreCase("subjectName")) {
			return criteriaBuilder.like(root.get("subjectName"), "%" + value.toString() + "%");
		}
		if (field.equalsIgnoreCase("subjectCode")) {
			return criteriaBuilder.like(root.get("subjectCode"), "%" + value.toString() + "%");
		}
		
		if (field.equalsIgnoreCase("subjectStatus")) {
			return criteriaBuilder.equal(root.get("subjectStatus"), value);
		}
		
//		if (field.equalsIgnoreCase("teacherName")) {
//			return criteriaBuilder.like(root.get("teacher").get("teacherName"), "%" + value.toString() + "%");
//		}
		
		if (field.equalsIgnoreCase("subjectCode")) {
			return criteriaBuilder.like(root.get("subjectCode"),value.toString());
		}
		
		if (field.equalsIgnoreCase("teacherName")) {
	        Join<Subject, Teacher> facultyJoin = root.join("teacher");
	        return criteriaBuilder.equal(facultyJoin.get("teacherName"), value.toString());
	    }
		
		return null;
	}
	
}