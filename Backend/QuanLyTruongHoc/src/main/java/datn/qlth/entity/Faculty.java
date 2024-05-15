package datn.qlth.entity;

import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Faculty`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Faculty {
	
	@Column(name = "`id`")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer facultyID;
	
	@Column(name = "`faculty_code`", length = 30, unique = true, nullable = false)
	private String facultyCode;
	
	@Column(name = "`faculty_name`", length = 100, unique = true, nullable = false)
	private String facultyName;
	
	@OneToMany(mappedBy = "faculty")
	@OnDelete(action = OnDeleteAction.SET_NULL)
	private List<Major> majors;
}

