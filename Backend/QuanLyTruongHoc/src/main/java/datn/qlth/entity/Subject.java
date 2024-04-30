package datn.qlth.entity;

import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Subject`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subject {

	@Column(name = "`id`")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer subjectID;
	
	@Column(name = "`subject_code`", length = 30, unique = true, nullable = false)
	private String subjectCode;
	
	@Column(name = "subject_name", length = 100, nullable = false)
	private String subjectName;
	
	@Column(name = "number_of_credit", nullable = false)
	private Integer numberOfCredit;
	
	@Column(name = "actual_quantity")
	private Integer actualQuantity;
	
	@Column(name = "max_quantity")
	private Integer maxQuantity;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.SET_NULL)
	@JoinColumn(name = "`major_id`")
	private Major major;
	
	@OneToMany(mappedBy = "subject")
	@OnDelete(action = OnDeleteAction.SET_NULL)
	private List<RegistrationSubject> registrationSubjects;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.SET_NULL)
	@JoinColumn(name = "`teacher_id`")
	private Teacher teacher;
}
