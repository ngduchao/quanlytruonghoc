package datn.qlth.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import datn.qlth.service.FileUploadService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/v1/upload")
public class FileUploaderController {
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@PostMapping()
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, 
                                         @RequestParam("folder") String folderName) throws IOException {
        return ResponseEntity.ok(fileUploadService.uploadFile(file, folderName));
    }
}
