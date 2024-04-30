import classNames from "classnames/bind";

import styles from "./StudyResult.module.scss";
import { useEffect, useState } from "react";
import registrationSubjectApi from "../../../services/api/registrationSubjectApi";

const cx = classNames.bind(styles);

function StudyResult() {
    const [data, setData] = useState({});

    useEffect(() => {
        const getAllInfo = async () => {
            const result =
                await registrationSubjectApi.getListRegistrationSubjectsByUser();

            setData(result);
        };
        getAllInfo();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <h2>Kết quả học tập</h2>
            <hr />
            <div className={cx("top-table")}>
                <table>
                    <tr>
                        <td>Họ và tên sinh viên</td>
                        <td>
                            {data &&
                                data[0] &&
                                data[0].user &&
                                data[0].user.fullName}
                        </td>
                    </tr>
                    <tr>
                        <td>Mã sinh viên</td>
                        <td>
                            {data &&
                                data[0] &&
                                data[0].user &&
                                data[0].user.userCode}
                        </td>
                    </tr>
                    <tr>
                        <td>Lớp</td>
                        <td>
                            {data &&
                                data[0] &&
                                data[0].user &&
                                data[0].user.classroom &&
                                data[0].user.classroom.classRoomName}
                        </td>
                    </tr>
                    <tr>
                        <td>GVCN</td>
                        <td>
                            {data &&
                                data[0] &&
                                data[0].subject &&
                                data[0].subject.teacher &&
                                data[0].subject.teacher.teacherName}
                        </td>
                    </tr>
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
                                    <td>{item.subject.subjectCode}</td>
                                    <td>{item.regularPoint1}</td>
                                    <td>{item.regularPoint2}</td>
                                    <td>{item.midtermScore}</td>
                                    <td>{item.finalScore}</td>
                                    <td>{""}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">Chưa có môn học</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudyResult;
