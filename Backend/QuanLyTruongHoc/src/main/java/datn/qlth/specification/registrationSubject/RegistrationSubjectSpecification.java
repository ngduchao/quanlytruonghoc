package datn.qlth.specification.registrationSubject;

import org.springframework.data.jpa.domain.Specification;

import datn.qlth.dto.filter.RegistrationSubjectFilterForm;
import datn.qlth.entity.RegistrationSubject;
import datn.qlth.entity.Subject;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class RegistrationSubjectSpecification {
	public static Specification<RegistrationSubject> buildWhere(RegistrationSubjectFilterForm filter){
		
		Specification<RegistrationSubject> where = null;
		
		CustomSpecification init = new CustomSpecification("init", "init");
		where = Specification.where(init);
		
		if(filter == null) {
			return where;
		}
		
		if(filter.getSubjectID() != null) {
			CustomSpecification subjectID = new CustomSpecification("subjectID", filter.getSubjectID());
			where = where.and(subjectID);
		}

		return where;
	}
}

@RequiredArgsConstructor
class CustomSpecification implements Specification<RegistrationSubject>{

	private static final long serialVersionUID = 1L;
	
	@NonNull
	private String field;
	@NonNull
	private Object value;
	
	@Override
	public Predicate toPredicate(Root<RegistrationSubject> root, CriteriaQuery<?> query,
			CriteriaBuilder criteriaBuilder) {
		
		if (field.equalsIgnoreCase("init")) {
			return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
		}
		
		if (field.equalsIgnoreCase("subjectID")) {
	        Join<RegistrationSubject, Subject> subjectJoin = root.join("subject");
	        return criteriaBuilder.equal(subjectJoin.get("subjectID"), value.toString());
	    }
		
		return null;
	}
	
}