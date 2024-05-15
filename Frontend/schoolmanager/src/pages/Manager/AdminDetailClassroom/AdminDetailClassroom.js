import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router";

import styles from "./AdminDetailClassroom.module.scss";
import classroomApi from "../../../services/api/classroomApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import fileDownload from "js-file-download";

const cx = classNames.bind(styles);

function AdminDetailClassroom() {
    const [classRoomInfo, setClassRoomInfo] = useState({});
    const [teacherInfo, setTeacherInfo] = useState({});
    const [majorInfo, setMajorInfo] = useState({});
    const [usersInfo, setUsersInfo] = useState({});

    const { classRoomID } = useParams();

    //export
    const handleExport = async (e) => {
        const res = await classroomApi.exportCSV(classRoomID);
        // console.log(res);
        const blob = new Blob(["\uFEFF" + res], {
            type: "text/csv;charset=utf-8;",
        });
        fileDownload(blob, classRoomInfo.classRoomCode + ".csv");
    };

    useEffect(() => {
        const getTeacher = async () => {
            const result = await classroomApi.getById(classRoomID);

            setClassRoomInfo(result);

            setTeacherInfo(result.teacher);
            setMajorInfo(result.major);
            setUsersInfo(result.users);
        };

        getTeacher();
    }, [classRoomID]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "dd-MM-yyyy"); // Định dạng ngày tháng thành dd-MM-yyyy
    };

    return (
        <div className={cx("wrapper")}>
            <h2>Thông tin lớp {classRoomInfo.classRoomName}</h2>
            <hr />
            <div className={cx("table")}>
                <table>
                    <tr>
                        <td>Mã lớp</td>
                        <td>{classRoomInfo.classRoomCode}</td>
                    </tr>
                    <tr>
                        <td>Tên lớp</td>
                        <td>{classRoomInfo.classRoomName}</td>
                    </tr>
                    <tr>
                        <td>Khóa</td>
                        <td>{classRoomInfo.course}</td>
                    </tr>
                    <tr>
                        <td>Giáo viên chủ nhiệm</td>
                        <td>
                            {teacherInfo.teacherName} {" - "}{" "}
                            {teacherInfo.phoneNumber}
                        </td>
                    </tr>
                    <tr>
                        <td>Ngành</td>
                        <td>{majorInfo.majorName}</td>
                    </tr>
                    <tr>
                        <td>Số lượng</td>
                        <td>{classRoomInfo.quantity}</td>
                    </tr>
                </table>
            </div>

            <div className={cx("top-container")}>
                <button onClick={handleExport} className={cx("btn-export")}>
                    <span>
                        <FontAwesomeIcon icon={faFileExport} />
                    </span>
                    Export to CSV
                </button>
            </div>

            <div className={cx("table-info")}>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sinh viên</th>
                            <th>Họ đệm</th>
                            <th>Tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Quê quán</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersInfo.length > 0 ? (
                            usersInfo.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.userCode}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{formatDate(item.birthDay)}</td>
                                    <td>
                                        {item.gender === "MALE" ? "Nam" : "Nữ"}
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.homeTown}</td>
                                    <td>
                                        {item.status !== null
                                            ? item.status === "STUDYING"
                                                ? "Đang học"
                                                : "Đã nghỉ"
                                            : "null"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11">Chưa có học sinh</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDetailClassroom;
