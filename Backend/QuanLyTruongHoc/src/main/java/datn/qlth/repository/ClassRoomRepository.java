package datn.qlth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import datn.qlth.entity.ClassRoom;

public interface ClassRoomRepository extends JpaRepository<ClassRoom, Integer>, JpaSpecificationExecutor<ClassRoom>{
	
	public ClassRoom findByClassRoomCode(String classRoomCode);
	
	public boolean existsByClassRoomID(Integer ID);
	
	public boolean existsByClassRoomCode(String classRoomCode);
	
	public boolean existsByClassRoomName(String classRoomName);
}
