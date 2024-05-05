package datn.qlth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import datn.qlth.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Integer>, JpaSpecificationExecutor<Teacher>{
	
	public Teacher findByTeacherCode(String teacherCode);
	
	public boolean existsByTeacherID(Integer ID);
	
	public boolean existsByTeacherCode(String teacherCode);
	
	public boolean existsByTeacherName(String teacherName);
	
	public boolean existsByEmail(String email);
	
	public boolean existsByPhoneNumber(String phoneNumber);
}
