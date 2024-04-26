package datn.qlth.entity;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import datn.qlth.entity.Enum.SpecializeLevel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Teacher`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {
	
	@Column(name = "`id`")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer teacherID;
	
	@Column(name = "`teacher_code`", length = 20, unique = true, nullable = false)
	private String teacherCode;
	
	@Column(name = "`teacher_name`", length = 50, nullable = false, unique = true)
	private String teacherName;
	
	@Column(name = "`email`", length = 50, nullable = false, unique = true)
	private String email;
	
	@Column(name = "`phone_number`", length = 15, nullable = false)
	private String phoneNumber;
	
	@Column(name = "`birth_day`")
	private Date birthDay;
	
	@Column(name = "`home_town`", length = 100, nullable = false)
	private String homeTown;
	
	@Column(name = "`specialize_level`")
    @Enumerated(value = EnumType.STRING)
    private SpecializeLevel specializeLevel;
	
	@OneToMany(mappedBy = "teacher")
	@OnDelete(action = OnDeleteAction.SET_NULL)
	private List<Subject> subjects;
	
	@OneToMany(mappedBy = "teacher")
	@OnDelete(action = OnDeleteAction.SET_NULL)
	private List<ClassRoom> classRooms;
}
