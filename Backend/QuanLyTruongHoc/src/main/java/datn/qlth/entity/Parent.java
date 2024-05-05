package datn.qlth.entity;

import org.hibernate.annotations.Formula;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Parent`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Parent {
	
	@Column(name = "`id`")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer parentID;
	
	@Column(name = "`first_name`", length = 50, nullable = false)
	private String firstName;
	
	@Column(name = "`last_name`", length = 50, nullable = false)
	private String lastName;
	
	@Formula("concat(first_name, ' ', last_name)")
	private String fullName;
	
	@Column(name = "`year_of_birth_day`")
	private Integer yearOfBirthDay;
	
	@Column(name = "`phone_number`", length = 15, unique = true)
	private String phoneNumber;
	
	@Column(name = "`job`", length = 50)
	private String job;
	
	@Column(name = "`relationship`", length = 20)
	private String relationship;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.SET_NULL)
	@JoinColumn(name = "`user_id`")
	private User user;
}
