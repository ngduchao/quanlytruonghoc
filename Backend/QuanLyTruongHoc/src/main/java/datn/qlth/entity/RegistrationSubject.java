package datn.qlth.entity;

import java.util.Date;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Registration_subject`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationSubject {
	
	@Column(name = "`id`")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer RegistrationSubjectID;
	
	@Column(name = "`regular_point_1`")
	private Float regularPoint1;
	
	@Column(name = "`regular_point_2`")
	private Float regularPoint2;
	
	@Column(name = "`midterm_score`")
	private Float midtermScore;
	
	@Column(name = "`final_score`")
	private Float finalScore;
	
	@Column(name = "`created_date`")
	@Temporal(TemporalType.DATE)
	private Date createdDate;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.SET_NULL)
	@JoinColumn(name = "`user_id`")
	private User user;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.SET_NULL)
	@JoinColumn(name = "`subject_id`")
	private Subject subject;
	
	@PrePersist
    public void prePersist() {
        if (this.createdDate == null) {
            this.createdDate = new Date();
        }
    }
}
