import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import classNames from "classnames/bind";

import styles from "./RegistrationSubject.module.scss";
import subjectApi from "../../../services/api/subjectApi";
import userApi from "../../../services/api/userApi";
import Storage from "../../../storage/Storages";
import registrationSubjectApi from "../../../services/api/registrationSubjectApi";
import { selectSubjects } from "../../../redux/selectors/subjectSelector";
import { getListSubjectNotPageAction } from "../../../redux/actions/subjectAction";
import { selectRegistrationSubjects } from "../../../redux/selectors/registrationSubjectSelector";
import { getListRegistrationSubjectAction } from "../../../redux/actions/registrationSubjectAction";

const cx = classNames.bind(styles);

function RegistrationSubject(props) {
    const { className } = props;
    const [userInfo, setUserInfo] = useState({});

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const notify = (values) => {
        toast(values);
    };

    const [reRender, setReRender] = useState(false);

    const username = Storage.getUserInfo().username;

    const [majorID, setMajorID] = useState(null);

    useEffect(() => {
        const getMajor = async () => {
            const result = await userApi.getUserByUsername(username);
            // console.log(result);
            setUserInfo(result);
            setMajorID(result.classroom.major.majorID);
        };
        getMajor();
    }, [username]);

    useEffect(() => {
        if (majorID !== null) {
            const getListSubjects = async () => {
                const result = await subjectApi.getListSubjectsBySubjectStatus(
                    majorID,
                    "OPEN"
                );
                props.getListSubjectNotPageAction(result);
            };

            getListSubjects();
        }
    }, [username, reRender, majorID, props]);

    const [registerForm, setRegisterForm] = useState({
        userCode: "",
        subjectID: "",
    });

    const [subjectName, setSubjectName] = useState("");

    const handleShowRegisterModel = (subjectName, subjectID) => {
        setRegisterForm({
            userCode: userInfo.userCode,
            subjectID: subjectID,
        });
        setSubjectName(subjectName);
        toggle();
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            await registrationSubjectApi.createRegistrationSubject(
                registerForm
            );
            setReRender(true);
            notify("Đăng ký thành công!");
            setRegisterForm({ userCode: "", subjectID: "" });
            toggle();
        } catch (error) {
            console.error("Error creating data: ", error);

            if (error.status === 500) {
                notify("Đăng ký thất bại!");
            }

            if (error.status === 400) {
                if (error.data === "Students already exist in class!") {
                    notify("Đăng ký thất bại!\n Bạn đã đăng ký môn này rồi");
                    toggle();
                }
            }
        }
    };

    return (
        <div className={cx("wrapper")}>
            <Toaster />
            <h2>Đăng ký môn</h2>
            <hr />
            <div className={cx("top-table")}>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Họ và tên sinh viên</td>
                            <td>
                                {userInfo.firstName} {userInfo.lastName}
                            </td>
                        </tr>
                        <tr>
                            <td>Mã sinh viên</td>
                            <td>{userInfo.userCode}</td>
                        </tr>
                        <tr>
                            <td>Lớp</td>
                            <td>
                                {userInfo &&
                                    userInfo.classroom &&
                                    userInfo.classroom.classRoomName}{" "}
                                {"- K"}
                                {userInfo &&
                                    userInfo.classroom &&
                                    userInfo.classroom.course}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={cx("table-subject")}>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã môn</th>
                            <th>Tên môn</th>
                            <th>Số tín chỉ</th>
                            <th>Số lượng</th>
                            <th>Giáo viên</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.subjects.length > 0 ? (
                            props.subjects.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.subjectCode}</td>
                                    <td>{item.subjectName}</td>
                                    <td>{item.numberOfCredit}</td>
                                    <td>
                                        {item.actualQuantity}/{item.maxQuantity}
                                    </td>
                                    <td>{item.teacher.teacherName}</td>
                                    <td className={cx("btn-add")}>
                                        <button
                                            className={cx("btn-register")}
                                            onClick={() =>
                                                handleShowRegisterModel(
                                                    item.subjectName,
                                                    item.subjectID
                                                )
                                            }
                                        >
                                            Đăng ký
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center" }}>
                                    Chưa có môn học
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div>
                <Modal
                    isOpen={modal}
                    modalTransition={{ timeout: 500 }}
                    backdropTransition={{ timeout: 100 }}
                    toggle={toggle}
                    className={className}
                >
                    <ModalHeader toggle={toggle}>Xác nhận</ModalHeader>
                    <ModalBody>
                        Bạn có chắc chắn đăng ký môn {subjectName}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleRegisterSubmit}>
                            Đồng ý
                        </Button>
                        <Button color="secondary" onClick={toggle}>
                            Hủy
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>

            <div>
                <Modal
                    isOpen={modal}
                    modalTransition={{ timeout: 500 }}
                    backdropTransition={{ timeout: 100 }}
                    toggle={toggle}
                    className={className}
                >
                    <ModalHeader toggle={toggle}>Xác nhận</ModalHeader>
                    <ModalBody>
                        Bạn có chắc chắn đăng ký môn {subjectName}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleRegisterSubmit}>
                            Đồng ý
                        </Button>
                        <Button color="secondary" onClick={toggle}>
                            Hủy
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}

const mapGlobalStateToProps = (state) => {
    // console.log(state.Subject.totalElements);
    return {
        subjects: selectSubjects(state.Subject.subjects),
        registrationSubjects: selectRegistrationSubjects(
            state.RegistrationSubject.registrationSubjects
        ),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListSubjectNotPageAction: bindActionCreators(
            getListSubjectNotPageAction,
            dispatch
        ),
        getListRegistrationSubjectAction: bindActionCreators(
            getListRegistrationSubjectAction,
            dispatch
        ),
    };
};

// export default RegistrationSubject;
export default connect(
    mapGlobalStateToProps,
    mapDispatchToProps
)(RegistrationSubject);
