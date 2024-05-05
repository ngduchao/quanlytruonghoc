package datn.qlth.entity;

import java.util.Date;
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
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Class_room`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassRoom {
	
	@Column(name = "`id`")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer classRoomID;
	
	@Column(name = "`code`", length = 30, unique = true, nullable = false)
	private String classRoomCode;
	
	@Column(name = "`name`", length = 100, nullable = false)
	private String classRoomName;
	
//	@Column(name = "`quantity`")
//	private Integer quantity;
	
	@Column(name = "`create_date`")
	@Temporal(TemporalType.DATE)
	private Date createdDate;
	
	@Column(name = "`course`")
	private Integer course;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.SET_NULL)
	@JoinColumn(name = "`major_id`")
	private Major major;
	
	@OneToMany(mappedBy = "classRoom")
	@OnDelete(action = OnDeleteAction.SET_NULL)
	private List<User> users;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.SET_NULL)
	@JoinColumn(name = "`teacher_id`")
	private Teacher teacher;
	
	@PrePersist
    public void prePersist() {
        if (this.createdDate == null) {
            this.createdDate = new Date();
        }
    }
}
