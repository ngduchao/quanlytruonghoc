package datn.qlth.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.Formula;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import datn.qlth.entity.Enum.Gender;
import datn.qlth.entity.Enum.Role;
import datn.qlth.entity.Enum.UserStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "`User`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Column(name = "`user_id`")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userID;
	
	@Column(name = "`user_code`", length = 20, unique = true, nullable = false)
	private String userCode;
	
	@Column(name = "`username`", length = 50, nullable = false, unique = true)
	private String username;
	
	@Column(name = "`email`", length = 50, nullable = false, unique = true)
	private String email;
	
	@Column(name = "`password`", length = 50, nullable = false)
	private String password;
	
	@Column(name = "`first_name`", length = 50, nullable = false)
	private String firstName;
	
	@Column(name = "`last_name`", length = 50, nullable = false)
	private String lastName;
	
	@Formula("concat(first_name, ' ', last_name)")
	private String fullName;
	
	@Column(name = "`phone_number`", length = 15, nullable = false)
	private String phoneNumber;
	
	@Column(name = "`birth_day`")
	private Date birthDay;
	
	@Column(name = "`home_town`", length = 100, nullable = false)
	private String homeTown;
	
	@Column(name = "`gender`")
	@Enumerated(value = EnumType.STRING)
	private Gender gender;
	
	@Column(name = "`role`")
    @Enumerated(value = EnumType.STRING)
    private Role role;
	
	@Enumerated(EnumType.ORDINAL)
	@Column(name = "`status`", nullable = false)
	private UserStatus status;
	
	@Column(name = "`image`")
	private String image;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.SET_NULL)
	@JoinColumn(name = "`class_id`")
	private ClassRoom classRoom;
	
	@OneToMany(mappedBy = "user")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<RegistrationSubject> registrationSubjects;
	
	@OneToMany(mappedBy = "user")
	@OnDelete(action = OnDeleteAction.SET_NULL)
	private List<Parent> parents;
}
