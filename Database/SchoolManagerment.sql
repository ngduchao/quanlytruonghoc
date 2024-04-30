DROP DATABASE IF EXISTS SchoolManagement;

CREATE DATABASE IF NOT EXISTS SchoolManagement;

USE SchoolManagement;

DROP TABLE IF EXISTS `Faculty`; -- Khoa
CREATE TABLE IF NOT EXISTS `Faculty`(
	`id`					INT AUTO_INCREMENT PRIMARY KEY,
    `faculty_code`			VARCHAR(30) UNIQUE NOT NULL,
    `faculty_name`			VARCHAR(100) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS `Major`; -- Ngành
CREATE TABLE IF NOT EXISTS `Major`(
	`id`					INT AUTO_INCREMENT PRIMARY KEY,
    `major_code`			VARCHAR(30) UNIQUE NOT NULL,
    `major_name`			VARCHAR(100) UNIQUE NOT NULL,
    `faculty_id`			INT,
    FOREIGN KEY(`faculty_id`) REFERENCES `Faculty`(`id`) ON DELETE SET NULL ON UPDATE SET NULL
);

DROP TABLE IF EXISTS `Teacher`; -- Giảng viên
CREATE TABLE IF NOT EXISTS `Teacher`(
	`id`					INT AUTO_INCREMENT PRIMARY KEY,
    `teacher_code`			VARCHAR(20) UNIQUE NOT NULL,
    `teacher_name`			VARCHAR(50) NOT NULL,
    `email` 				VARCHAR(50) UNIQUE NOT NULL,
    `phone_number`			VARCHAR(15) UNIQUE NOT NULL,
    `birth_day`				DATETIME NOT NULL,
    `home_town`				VARCHAR(100) NOT NULL,
    `gender`				ENUM('MALE', 'FEMALE'),
    `specialize_level`		ENUM('TIENSI', 'THACSI', 'DAIHOC') -- trình độ
);

DROP TABLE IF EXISTS `Subject`; -- Môn học
CREATE TABLE IF NOT EXISTS `Subject` (
	`id`					INT AUTO_INCREMENT PRIMARY KEY,
	`subject_code` 			VARCHAR(30) UNIQUE NOT NULL,
    `subject_name`			VARCHAR(100) NOT NULL,
    `number_of_credit`		INT,
    `actual_quantity`		INT,
    `max_quantity`			INT,
    `major_id`				INT,
    `teacher_id`			INT, -- giảng viên dạy
    FOREIGN KEY(`major_id`) REFERENCES `Major`(`id`) ON DELETE SET NULL ON UPDATE SET NULL,
    FOREIGN KEY(`teacher_id`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE SET NULL
);

DROP TABLE IF EXISTS `Class_room`; -- Lớp học
CREATE TABLE IF NOT EXISTS `Class_room`(
	`id`					INT AUTO_INCREMENT PRIMARY KEY,
	`code` 					VARCHAR(30) UNIQUE NOT NULL, -- Mã lớp
    `name` 					VARCHAR(100) NOT NULL,
    `quantity`				INT CHECK(`quantity` >= 0),
    `create_date`			DATETIME DEFAULT NOW(),
    `course`				INT,
    `major_id`				INT,
    `teacher_id`			INT, -- GVCN
    FOREIGN KEY(`major_id`) REFERENCES `Major`(`id`) ON DELETE SET NULL ON UPDATE SET NULL,
    FOREIGN KEY(`teacher_id`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE SET NULL
);

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
	`user_id`				BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_code`				VARCHAR(20) UNIQUE NOT NULL,
    `username`	 			VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(`username`) >= 6 AND LENGTH(`username`) <= 50),
    `email`					VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(`email`) >= 6 AND LENGTH(`email`) <= 50),
    `password` 				VARCHAR(800) NOT NULL,
    `first_name` 			NVARCHAR(50) NOT NULL,
	`last_name` 			NVARCHAR(50) NOT NULL,
    `phone_number`			VARCHAR(15) UNIQUE NOT NULL,
    `birth_day`				DATETIME NOT NULL,
    `home_town`				VARCHAR(100) NOT NULL,
    `gender`				ENUM('MALE', 'FEMALE'),
    `role` 					ENUM('ADMIN', 'USER'),
    `status`				BOOLEAN DEFAULT 0, -- 0: Not Active, 1: Active
    `class_id`				INT,
    FOREIGN KEY(`class_id`) REFERENCES `Class_room`(`id`) ON DELETE SET NULL ON UPDATE SET NULL
);

DROP TABLE IF EXISTS `Registration_subject`; -- Môn học đăng ký
CREATE TABLE IF NOT EXISTS `Registration_subject`(
	`id`					INT AUTO_INCREMENT PRIMARY KEY,
    `subject_id`			INT,
    `user_id` 				BIGINT,
   `regular_point_1`		FLOAT DEFAULT 0,
   `regular_point_2`		FLOAT DEFAULT 0,
   `midterm_score`			FLOAT DEFAULT 0,
   `final_score`			FLOAT DEFAULT 0,
   `created_date`			DATETIME DEFAULT NOW(),
    FOREIGN KEY(`subject_id`) REFERENCES `Subject`(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Parent`; -- Phụ huynh
CREATE TABLE IF NOT EXISTS `Parent` (
	`id` 					INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` 			NVARCHAR(50) NOT NULL,
	`last_name` 			NVARCHAR(50) NOT NULL,
    `year_of_birth_day` 	INT CHECK(`year_of_birth_day` < 2024),
    `phone_number`			VARCHAR(15) UNIQUE,
    `job` 					VARCHAR(50),
    `relationship` 			VARCHAR(20),
    `user_id` 				BIGINT,
    FOREIGN KEY(`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE SET NULL
);