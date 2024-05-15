package datn.qlth.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
	
	@SuppressWarnings("rawtypes")
	public Map uploadFile(MultipartFile file, String folderName) throws IOException;
}
