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
@Table(name = "`Major`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Major {
	
	@Column(name = "`id`")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer majorID;
	
	@Column(name = "`major_code`", length = 30, unique = true, nullable = false)
	private String majorCode;
	
	@Column(name = "`major_name`", length = 100, unique = true, nullable = false)
	private String majorName;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.SET_NULL)
	@JoinColumn(name = "`faculty_id`")
	private Faculty faculty;
	
	@OneToMany(mappedBy = "major")
	@OnDelete(action = OnDeleteAction.SET_NULL)
	private List<Subject> subjects;
	
	@OneToMany(mappedBy = "major")
	@OnDelete(action = OnDeleteAction.SET_NULL)
	private List<ClassRoom> classRooms;
	
}
