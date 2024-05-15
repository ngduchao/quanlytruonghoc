USE SchoolManagement;
                    
INSERT INTO `Faculty` (`faculty_code`, `faculty_name`)
VALUES				('KH0001', 'Khoa công nghệ thông tin'),
					('KH0002', 'Khoa kế kiểm'),
					('KH0003', 'Khoa ngoại ngữ - du lịch'),
					('KH0004', 'Khoa điện'),
					('KH0005', 'Khoa cơ khí'),
					('KH0006', 'Khoa điện tử'),
					('KH0007', 'Khoa công nghệ ô tô'),
					('KH0008', 'Khoa quản trị kinh doanh'),
					('KH0009', 'Khoa công nghệ may - TKTT'),
					('KH0010', 'Khoa công nghệ hóa');
                    
INSERT INTO `Major` (`major_code`, `major_name`, `faculty_id`)
VALUES 				('KHMT', 'Khoa học máy tính', 1),
					('KTPM', 'Kỹ thuật phần mềm', 1),
                    ('HTTT', 'Hệ thống thông tin', 1),
                    ('CNTT', 'Công nghệ thông tin', 1),
                    ('CNKTDT', 'Công nghệ kỹ thuật điện tử - viễn thông', 6),
                    ('KTKM', 'Kỹ thuật khuôn mẫu', 5),
                    ('DULI', 'Du lịch', 3),
                    ('KETO', 'Kế toán', 2),
                    ('KTOT', 'Công nghệ kỹ thuật ô tô', 7),
                    ('KIEM', 'Kiểm toán', 2),
                    ('KTDT', 'Kinh tế đầu tư', 8),
                    ('HTCN', 'Kỹ thuật hệ thống công nghiệp', 5),
                    ('MARK', 'Marketing', 8),
                    ('NNAN', 'Ngôn ngữ Anh', 3),
                    ('NNHQ', 'Ngôn ngữ Hàn Quốc', 3),
                    ('NNNB', 'Ngôn ngữ Nhật', 3),
                    ('QTLH', 'Quản trị dịch vụ du lịch và lữ hành', 3),
                    ('QTKD', 'Quản trị kinh doanh', 8),
                    ('QTNL', 'Quản trị nhân lực', 8),
                    ('QTVP', 'Quản trị văn phòng', 8),
                    ('TCNH', 'Tài chính ngân hàng', 8),
                    ('TKTT', 'Thiết kế thời trang', 9),
                    ('CNMA', 'Công nghệ dệt, may', 9),
                    ('CODT', 'Công nghệ kỹ thuật cơ điện tử', 5),
                    ('COKH', 'Công nghệ kỹ thuật cơ khí', 5),
                    ('DIEN', 'Công nghệ kỹ thuật điện, điện tử', 4),
                    ('DKTD', 'Công nghệ kỹ thuật điều khiển và tự động hóa', 4),
                    ('KTHH', 'Công nghệ kỹ thuật hóa học', 10),
                    ('KTMT', 'Công nghệ kỹ thuật máy tính', 6),
                    ('NHIE', 'Công nghệ kỹ thuật nhiệt', 4),
                    ('HTP', 'Công nghệ thực phẩm', 10),
                    ('VLDM', 'Công nghệ vật liệu dệt, may', 9);
                    
INSERT INTO `Teacher` (`teacher_code`, `teacher_name`, `email`, `phone_number`, `birth_day`, `home_town`, `gender`, `specialize_level`)
VALUES					('TC0001', 'Nguyễn Thị Hồng', 'nguyenthihong@email.com', '0987654321', '1980-05-15', 'Hà Nội', 'FEMALE', 'TIENSI'),
						('TC0002', 'Trần Văn Tuấn', 'tranvantuan@email.com', '0333456789', '1975-10-20', 'Hải Phòng', 'MALE', 'THACSI'),
						('TC0003', 'Phạm Thị Hương', 'phamthihuong@email.com', '0345678912', '1990-08-25', 'Nam Định', 'FEMALE', 'DAIHOC'),
						('TC0004', 'Lê Quang Huy', 'lequanghuy@email.com', '0567891234', '1988-03-10', 'Hà Nội', 'MALE', 'TIENSI'),
						('TC0005', 'Hoàng Minh Ngọc', 'hoangminhngoc@email.com', '0789123456', '1983-12-05', 'Bắc Ninh', 'MALE', 'THACSI'),
						('TC0006', 'Nguyễn Thành Long', 'nguyenthanhlong@email.com', '0891234567', '1985-07-20', 'Hà Nam', 'MALE', 'DAIHOC'),
						('TC0007', 'Trần Thị Lan', 'tranthilan@email.com', '0909876543', '1979-09-30', 'Quảng Ninh', 'FEMALE', 'TIENSI'),
						('TC0008', 'Phan Văn Nam', 'phanvannam@email.com', '0654321890', '1972-11-18', 'Hà Nội', 'MALE', 'THACSI'),
						('TC0009', 'Lý Thị Thu', 'lythithu@email.com', '0532187659', '1987-04-25', 'Bắc Ninh', 'FEMALE','DAIHOC'),
						('TC0010', 'Trương Văn Tùng', 'truongvantung@email.com', '0319876543', '1981-06-12', 'Thái Bình', 'MALE','TIENSI');

INSERT INTO `Subject` (`subject_code`, `subject_name`, `number_of_credit`, `major_id`, `teacher_id`, `max_quantity`, `actual_quantity`, `status`)
VALUES					('FL6085.1', 'Tiếng Anh Công nghệ thông tin cơ bản 1', 5, 1, 1, 70, 5, 'OPEN'),
						('PE6021', 'Bóng rổ', 1, 1, 2, 70, 1, 'CLOSE'),
                        ('PE6026', 'Cầu lông', 1, 2, 2, 70, 1, 'CLOSE'),
                        ('LP6012', 'Chủ nghĩa xã hội khoa học', 3, 2, 2, 70, 1, 'OPEN'),
                        ('LP6013', 'Lịch sử Đảng Cộng sản Việt Nam', 3, 4, 3, 70, 1, 'OPEN'),
                        ('LP6010', 'Triết học Mác-Lênin', 3, 1, 3, 70, 1, 'CLOSE'),
                        ('BS6002', 'Giải tích', 3, 1, 4, 70, 1, 'OPEN'),
                        ('BS6026', 'Thống kê', 3, 1, 4, 70, 1, 'OPEN'),
                        ('IT6035', 'Toán rời rạc', 3, 1, 4, 70, 1, 'OPEN'),
                        ('IT6070', 'An ninh mạng', 3, 1, 5, 70, 1, 'OPEN'),
                        ('IT6002', 'Cấu trúc dữ liệu và giải thuật', 3, 1, 5, 70, 1, 'OPEN'),
                        ('IT6065', 'Hệ thống cơ sở dữ liệu', 3, 1, 5, 70, 1, 'CLOSE'),
                        ('IT6015', 'Kỹ thuật lập trình', 3, 1, 6, 70, 1, 'OPEN'),
                        ('IT6018', 'Lập trình hướng đối tượng', 3, 1, 6, 70, 1, 'OPEN'),
                        ('IT6019', 'Lập trình Java', 3, 1, 7, 70, 1, 'CLOSE'),
                        ('IT6084', 'Kiểm thử phần mềm', 3, 1, 8, 70, 1, 'OPEN'),
                        ('IT6067', 'Kiến trúc máy tính và hệ điều hành', 3, 6, 8, 70, 1, 'OPEN'),
                        ('IT6082', 'Nhập môn công nghệ phần mềm', 3, 1, 9, 70, 1, 'CLOSE'),
                        ('IT6094', 'Trí tuệ nhân tạo', 3, 1, 9, 70, 1, 'CLOSE'),
                        ('IT6073', 'Ngôn ngữ lập trình khoa học', 3, 1, 9, 70, 0, 'OPEN'),
                        ('IT6053', 'Đồ án chuyên ngành', 3, 1, 10, 70, 0, 'OPEN');
                        
INSERT INTO `Class_room` (`code`, `name`,`quantity`, `create_date`, `course`, `major_id`, `teacher_id`)
VALUES					('KHMT01', 'Khoa học máy tính 1', 2, NOW(), 15, 1, 1),
						('KHMT02', 'Khoa học máy tính 2', 3, NOW(), 15, 1, 1),
                        ('HTTT01', 'Hệ thống thông tin 1', 0, NOW(), 15, 3, 7),
                        ('KTPM01', 'Kỹ thuật phần mềm 1', 1, NOW(), 15, 2, 7),
                        ('CNTT01', 'Công nghệ thông tin 1', 0, NOW(), 15, 4, 7);

INSERT INTO `User` (`user_code`, `username`, `email`, `password`, `first_name`, `last_name`, `phone_number`, `birth_day`, `home_town`, `gender`, `role`, `status`, `image`,  `class_id`)
VALUES   			('2020605340', 'ngduchao', 'duchao0202@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nguyễn Đức', 'Hảo', '0396180331', '2002-02-02', 'Bắc Ninh', 'MALE', 'ADMIN', 1, NULL , NULL),
					('2020605341', 'nguyena', 'nguyenvana@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nguyễn Văn', 'A', '0987654321', '1978-11-02', 'Hà Nội', 'MALE', 'ADMIN', 1, NULL, NULL),
                    ('2020605342', 'nguyenb', 'nguyenvanb@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nguyễn Văn', 'B', '0323456789', '2002-05-21', 'Hà Nội', 'MALE', 'USER', 1, NULL, 1),
                    ('2020605343', 'tranvana', 'tranvana@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Trần Văn', 'A', '0987664821', '2002-02-21', 'Nam Định', 'MALE', 'USER', 1, NULL, 1),
                    ('2020605344', 'tranvanb', 'tranvanb@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Trần Văn', 'B', '0323248789', '2002-03-12', 'Hải Phòng', 'MALE', 'USER', 1, NULL, 2),
                    ('2020605345', 'tranvanc', 'tranvanc@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Trần Văn', 'C', '0329816789', '2002-05-18', 'Quảng Ninh', 'MALE', 'USER', 1, NULL, 2),
                    ('2020605347', 'tranvanr', 'tranvanr@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Trần Văn', 'R', '0311216789', '2002-05-18', 'Quảng Ninh', 'MALE', 'USER', 1, NULL, 2),
                    ('2020605346', 'nguyenc', 'nguyenvanc@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nguyễn Văn', 'C', '0353452456', '2002/09/07', 'Hà Nội', 'MALE', 'USER', 1, NULL, 4);

INSERT INTO `Registration_subject` (`subject_id`, `user_id`)
VALUES								(1, 3),
									(1, 4),
                                    (1, 5),
                                    (1, 6),
                                    (1, 7),
									(2, 3),
                                    (3, 3),
                                    (4, 3),
                                    (5, 3),
                                    (6, 4),
                                    (7, 4),
                                    (8, 4),
                                    (9, 4),
                                    (10, 4),
                                    (11, 4),
                                    (12, 5),
                                    (13, 5),
                                    (14, 6),
                                    (15, 6),
                                    (16, 6),
                                    (17, 7),
                                    (18, 7),
                                    (19, 7);

INSERT INTO `Parent` (`first_name`, `last_name`, `year_of_birth_day`, `phone_number`, `job`, `relationship`, `user_id`)
VALUES				('Nguyễn', 'Đức A', 1978, '0987654321', 'Tự do', 'Bố', 3),
					('Trần', 'Thị B', 1982, '0982765431', 'Tự do', 'Mẹ', 3),
					('Nguyễn', 'Quang E', 1978, '0926453718', 'Tự do', 'Bố', 4);
                    
SELECT * FROM `Faculty`;
SELECT * FROM `Teacher`;
SELECT * FROM `Major`;
SELECT * FROM `Subject`;
SELECT * FROM `Class_room`;
SELECT * FROM `User`;
SELECT * FROM `Registration_subject`;
SELECT * FROM `Parent`;

