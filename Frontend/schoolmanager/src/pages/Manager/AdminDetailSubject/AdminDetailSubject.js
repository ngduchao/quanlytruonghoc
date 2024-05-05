import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import classNames from "classnames/bind";

import styles from "./AdminDetailSubject.module.scss";
import {
    getListRegistrationSubjectAction,
    addRegistrationSubjectAction,
    deleteRegistrationSubjectAction,
    updateRegistrationSubjectAction,
} from "../../../redux/actions/registrationSubjectAction";
import { selectRegistrationSubjects } from "../../../redux/selectors/registrationSubjectSelector";
import registrationSubjectApi from "../../../services/api/registrationSubjectApi";
import subjectApi from "../../../services/api/subjectApi";
import fileDownload from "js-file-download";

const cx = classNames.bind(styles);

function AdminDetailSubject(props) {
    const { subjectID } = useParams();

    const notify = (values) => {
        toast(values);
    };

    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const [subjectInfo, setSubjectInfo] = useState({});
    const [teacherInfo, setTeacherInfo] = useState({});

    const getListResgistrationSubject = props.getListRegistrationSubjectAction;

    useEffect(() => {
        const getAllInfo = async () => {
            const result =
                await registrationSubjectApi.getAllRegistrationSubjects(
                    subjectID
                );

            getListResgistrationSubject(result);
        };

        const getSubjectInfo = async () => {
            const result = await subjectApi.getById(subjectID);

            setSubjectInfo(result);
            setTeacherInfo(result.teacher);
        };
        getAllInfo();
        getSubjectInfo();
    }, [getListResgistrationSubject, subjectID]);

    const [userCodeError, setUserCodeError] = useState("");

    const handleFocus = () => {
        setUserCodeError("");
    };

    //export
    const handleExport = async (e) => {
        const res = await registrationSubjectApi.exportCSV(subjectID);
        // console.log(res);
        const blob = new Blob(["\uFEFF" + res], {
            type: "text/csv;charset=utf-8;",
        });
        fileDownload(
            blob,
            subjectInfo.subjectName + "_" + subjectInfo.subjectCode + ".csv"
        );
    };

    //thêm mới
    const [addForm, setAddForm] = useState({
        subjectID: subjectID,
        userCode: "",
    });

    const handleAddChange = async (e) => {
        setAddForm({
            ...addForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleShowAddModel = () => {
        setShowAddForm(!showAddForm);
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        let isValid = true;
        try {
            const userCodeExists =
                await registrationSubjectApi.checkRegistrationSubjectExistsByUserIDAndSubjectID(
                    addForm.userCode.trim(),
                    addForm.subjectID
                );

            // console.log(userCodeExists);
            if (userCodeExists) {
                setUserCodeError("Sinh viên đã có trong lớp!");
                isValid = false;
            }

            if (
                addForm.userCode.trim() === null ||
                addForm.userCode.trim().length < 6
            ) {
                setUserCodeError("Mã sinh viên không hợp lệ!");
                isValid = false;
            }

            if (isValid) {
                const data =
                    await registrationSubjectApi.createRegistrationSubject(
                        addForm
                    );

                props.addRegistrationSubjectAction(data);

                setAddForm({ userCode: "" });
                setShowAddForm(!showAddForm);
                notify("Thêm mới thành công!");
                handleFocus();
            }
        } catch (error) {
            console.error("Error creating data: ", error);

            if (error.status === 500) {
                notify("Thêm mới thất bại!");
                setUserCodeError("Mã sinh viên chưa tồn tại!");
            }

            if (error.status === 403) {
                notify("Lớp đã đủ sinh viên!");
            }
        }
    };

    const handleCloseModalAdd = () => {
        setShowAddForm(!showAddForm);
        setAddForm({ userCode: "" });
        handleFocus();
    };

    //cập nhật
    const [updateForm, setUpdateForm] = useState({
        regularPoint1: "",
        regularPoint2: "",
        midtermScore: "",
        finalScore: "",
        registrationSubjectID: "",
    });

    const handleShowUpdateModel = (
        regularPoint1,
        regularPoint2,
        midtermScore,
        finalScore,
        registrationSubjectID
    ) => {
        setUpdateForm({
            regularPoint1,
            regularPoint2,
            midtermScore,
            finalScore,
            registrationSubjectID,
        });
        setShowUpdateForm(!showUpdateForm);
    };

    const handleChange = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            const data = await registrationSubjectApi.updateRegistrationSubject(
                updateForm
            );
            props.updateRegistrationSubjectAction(data);
            setUpdateForm({
                regularPoint1: "",
                regularPoint2: "",
                midtermScore: "",
                finalScore: "",
                registrationSubjectID: "",
            });
            setShowUpdateForm(!showUpdateForm);
            notify("Cập nhật thành công");
        } catch (error) {
            console.error("Error updating data: ", error);

            if (error.status === 500) {
                notify("Cập nhật thất bại!");
            }
        }
    };

    //xóa
    const [registrationSubjectDelete, setRegistrationSubjectDelete] = useState({
        fullName: "",
        registrationSubjectID: "",
    });

    const [idDelete, setIdDelete] = useState(0);

    const handleDelete = (fullName, registrationSubjectID) => {
        setRegistrationSubjectDelete({
            fullName: fullName,
            registrationSubjectID: registrationSubjectID,
        });
        try {
            setShowDeleteForm(!showDeleteForm);
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
    };

    const handleShowDeleteModel = (fullName, registrationSubjectID) => {
        handleDelete(fullName, registrationSubjectID);
        setIdDelete(registrationSubjectID);
        setShowDeleteForm(!showDeleteForm);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registrationSubjectApi.deleteRegistrationSubject(
                idDelete
            );
            props.deleteRegistrationSubjectAction(data);
            setShowDeleteForm(!showDeleteForm);
            notify("Xóa thành công!");
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
    };

    return (
        <div>
            <div
                className={cx(
                    showAddForm || showUpdateForm || showDeleteForm
                        ? "blur"
                        : "wrapper"
                )}
            >
                <Toaster />
                <h2>Kết quả học tập môn {subjectInfo.subjectName}</h2>
                <hr />
                <div className={cx("table")}>
                    <table>
                        <tr>
                            <td>Mã môn</td>
                            <td>{subjectInfo.subjectCode}</td>
                        </tr>
                        <tr>
                            <td>Tên môn</td>
                            <td>{subjectInfo.subjectName}</td>
                        </tr>
                        <tr>
                            <td>Số tín chỉ</td>
                            <td>{subjectInfo.numberOfCredit}</td>
                        </tr>
                        <tr>
                            <td>Giáo viên</td>
                            <td>
                                {teacherInfo.teacherName} {" - "}{" "}
                                {teacherInfo.phoneNumber}
                            </td>
                        </tr>
                        <tr>
                            <td>Số lượng</td>
                            <td>{props.registrationSubjects.length}</td>
                        </tr>
                    </table>
                </div>

                <div className={cx("top-container")}>
                    <button
                        onClick={handleShowAddModel}
                        className={cx("btn-add")}
                        title="Thêm mới"
                    >
                        <span className={cx("icons")}>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        Thêm sinh viên vào lớp
                    </button>

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
                                <th>Tên sinh viên</th>
                                <th>Điểm TX1</th>
                                <th>Điểm TX2</th>
                                <th>Điểm giữa kì</th>
                                <th>Điểm cuối kì</th>
                                <th>Ghi chú</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.registrationSubjects.length > 0 ? (
                                props.registrationSubjects.map(
                                    (item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.user.userCode}</td>
                                            <td>{item.user.fullName}</td>
                                            <td>{item.regularPoint1}</td>
                                            <td>{item.regularPoint2}</td>
                                            <td>{item.midtermScore}</td>
                                            <td>{item.finalScore}</td>
                                            <td>{""}</td>
                                            <td>
                                                <button
                                                    className={cx("btn-update")}
                                                    onClick={() =>
                                                        handleShowUpdateModel(
                                                            item.regularPoint1,
                                                            item.regularPoint2,
                                                            item.midtermScore,
                                                            item.finalScore,
                                                            item.registrationSubjectID
                                                        )
                                                    }
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className={cx("btn-delete")}
                                                    onClick={() =>
                                                        handleShowDeleteModel(
                                                            item.fullName,
                                                            item.registrationSubjectID
                                                        )
                                                    }
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td colSpan="9">Chưa có học sinh</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showAddForm && !showUpdateForm && !showDeleteForm && (
                <div className={cx("addition-form")}>
                    <h3>THÊM SINH VIÊN VÀO LỚP</h3>
                    <form className={cx("form")} onSubmit={handleSubmitCreate}>
                        <label className={cx("label")}>Mã sinh viên</label>
                        <input
                            type="text"
                            name="userCode"
                            placeholder="Nhập mã sinh viên"
                            className={cx("input-text")}
                            value={addForm.userCode}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />

                        <label className={cx("user-Error")}>
                            {userCodeError}
                        </label>

                        <div className={cx("btn")}>
                            <button className={cx("btn-add")}>Thêm</button>
                            <button
                                className={cx("btn-cancel")}
                                onClick={handleCloseModalAdd}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {showUpdateForm && !showAddForm && (
                <div className={cx("update-form")}>
                    <h3>CẬP NHẬT ĐIỂM</h3>
                    <form className={cx("form")} onSubmit={handleSubmitUpdate}>
                        <label htmlFor="regularPoint1" className={cx("label")}>
                            Điểm TX1
                        </label>
                        <input
                            type="text"
                            name="regularPoint1"
                            placeholder="Nhập điểm thường xuyên 1"
                            className={cx("input-text")}
                            value={updateForm.regularPoint1}
                            onChange={handleChange}
                            // onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>
                            {/* {facultyCodeError} */}
                        </label>
                        <label htmlFor="regularPoint2" className={cx("label")}>
                            Điểm TX2
                        </label>
                        <input
                            type="text"
                            name="regularPoint2"
                            placeholder="Nhập điểm thường xuyên 2"
                            className={cx("input-text")}
                            value={updateForm.regularPoint2}
                            onChange={handleChange}
                            // onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>
                            {/* {facultyCodeError} */}
                        </label>

                        <label htmlFor="midtermScore" className={cx("label")}>
                            Điểm giữa kỳ
                        </label>
                        <input
                            type="text"
                            name="midtermScore"
                            placeholder="Nhập điểm giữa kỳ"
                            className={cx("input-text")}
                            value={updateForm.midtermScore}
                            onChange={handleChange}
                            // onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>
                            {/* {facultyCodeError} */}
                        </label>

                        <label htmlFor="finalScore" className={cx("label")}>
                            Điểm cuối kỳ
                        </label>
                        <input
                            type="text"
                            name="finalScore"
                            placeholder="Nhập điểm cuối kỳ"
                            className={cx("input-text")}
                            value={updateForm.finalScore}
                            onChange={handleChange}
                            // onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>
                            {/* {facultyCodeError} */}
                        </label>

                        <div className={cx("btn")}>
                            <button type="submit" className={cx("btn-add")}>
                                Sửa
                            </button>
                            <button
                                className={cx("btn-cancel")}
                                onClick={() =>
                                    setShowUpdateForm(!showUpdateForm)
                                }
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {showDeleteForm && !showUpdateForm && !showAddForm && (
                <div className={cx("delete-model")}>
                    <div className={cx("content")}>
                        <h3>XÁC NHẬN</h3>
                        <p>
                            Bạn có chắc chắn xóa{" "}
                            {registrationSubjectDelete.fullName} ra khỏi lớp
                            <span>?</span>
                        </p>
                    </div>
                    <div className={cx("btn")}>
                        <button
                            className={cx("btn-confirm")}
                            onClick={handleDeleteSubmit}
                        >
                            Xác nhận
                        </button>
                        <button
                            className={cx("btn-cancel")}
                            onClick={() => {
                                setShowDeleteForm(!showDeleteForm);
                            }}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// export default AdminDetailSubject;
const mapGlobalStateToProps = (state) => {
    // console.log(state);
    return {
        registrationSubjects: selectRegistrationSubjects(
            state.RegistrationSubject.registrationSubjects
        ),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListRegistrationSubjectAction: bindActionCreators(
            getListRegistrationSubjectAction,
            dispatch
        ),
        updateRegistrationSubjectAction: bindActionCreators(
            updateRegistrationSubjectAction,
            dispatch
        ),
        deleteRegistrationSubjectAction: bindActionCreators(
            deleteRegistrationSubjectAction,
            dispatch
        ),
        addRegistrationSubjectAction: bindActionCreators(
            addRegistrationSubjectAction,
            dispatch
        ),
    };
};

export default connect(
    mapGlobalStateToProps,
    mapDispatchToProps
)(AdminDetailSubject);
