import classNames from "classnames/bind";

import styles from "./StudyResult.module.scss";
import { useEffect, useState } from "react";
import registrationSubjectApi from "../../../services/api/registrationSubjectApi";
import userApi from "../../../services/api/userApi";
import Storage from "../../../storage/Storages";

const cx = classNames.bind(styles);

function StudyResult() {
    const [data, setData] = useState({});

    const [userInfo, setUserInfo] = useState({});

    const username = Storage.getUserInfo().username;

    // console.log(username);

    useEffect(() => {
        const getAllInfo = async () => {
            const result =
                await registrationSubjectApi.getListRegistrationSubjectsByUser();
            const user = await userApi.getUserByUsername(username);

            // console.log(user);
            setUserInfo(user);
            setData(result);
        };
        getAllInfo();
    }, [username]);

    // console.log(userInfo);
    console.log(data);

    return (
        <div className={cx("wrapper")}>
            <h2>Kết quả học tập</h2>
            <hr />
            <div className={cx("top-table")}>
                <table>
                    <thead>
                        <tr>
                            <td>Họ và tên sinh viên</td>
                            <td>
                                {userInfo !== null
                                    ? userInfo.firstName +
                                      " " +
                                      userInfo.lastName
                                    : ""}
                            </td>
                        </tr>
                        <tr>
                            <td>Mã sinh viên</td>
                            <td>
                                {userInfo !== null ? userInfo.userCode : ""}
                            </td>
                        </tr>
                        <tr>
                            <td>Lớp</td>
                            <td>
                                {/* {userInfo !== null &&
                                userInfo.classroom !== null &&
                                userInfo.classroom.classRoomName !== null
                                    ? userInfo.classroom.classRoomName
                                    : ""} */}
                                {userInfo !== undefined &&
                                userInfo.classroom !== undefined &&
                                userInfo.classroom.classRoomName !== undefined
                                    ? userInfo.classroom.classRoomName
                                    : ""}
                            </td>
                        </tr>
                        <tr>
                            <td>GVCN</td>
                            <td>
                                {userInfo !== undefined &&
                                userInfo.classroom !== undefined &&
                                userInfo.classroom.teacher !== undefined &&
                                userInfo.classroom.teacher.teacherName !==
                                    undefined
                                    ? userInfo.classroom.teacher.teacherName
                                    : ""}
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>

            <div>
                <table className={cx("table-subject")}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên môn</th>
                            <th>Mã môn</th>
                            <th>Điểm TX1</th>
                            <th>Điểm TX2</th>
                            <th>Điểm giữa kì</th>
                            <th>Điểm cuối kì</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.subject.subjectName}</td>
                                    {/* <Link
                                        to={`/chi-tiet-mon-hoc/${item.subject.subjectID}`}
                                    >
                                        {item.subject.subjectName}
                                    </Link> */}
                                    <td>{item.subject.subjectCode}</td>
                                    <td>
                                        {item.regularPoint1 === null
                                            ? "-"
                                            : item.regularPoint1}
                                    </td>
                                    <td>
                                        {item.regularPoint2 === null
                                            ? "-"
                                            : item.regularPoint2}
                                    </td>
                                    <td>
                                        {item.midtermScore === null
                                            ? "-"
                                            : item.midtermScore}
                                    </td>
                                    <td>
                                        {item.finalScore === null
                                            ? "-"
                                            : item.finalScore}
                                    </td>
                                    <td>{""}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: "center" }}>
                                    Chưa có môn học
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudyResult;
