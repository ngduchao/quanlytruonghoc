package datn.qlth.service.Impl;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import datn.qlth.service.FileUploadService;

@Service
public class FileUploadServiceImpl implements FileUploadService{
	
	@Autowired
	private Cloudinary cloudinary;

	@SuppressWarnings("rawtypes")
	@Override
	public Map uploadFile(MultipartFile file, String folderName) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", folderName));
    }
	
	
}
