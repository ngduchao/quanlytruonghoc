import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCaretUp,
    faChevronLeft,
    faChevronRight,
    faMagnifyingGlass,
    faPlus,
    faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SubHeader from "../SubHeader/SubHeader";
import styles from "./ClassRoom.module.scss";
import classroomApi from "../../../services/api/classroomApi";
import {
    addClassroomAction,
    deleteClassroomAction,
    getListClassroomAction,
    updateClassroomAction,
} from "../../../redux/actions/classroomAction";
import {
    selectClassrooms,
    selectPage,
    selectSize,
    selectTotalElement,
} from "../../../redux/selectors/classroomSelector";
import majorApi from "../../../services/api/majorApi";
import teacherApi from "../../../services/api/teacherApi";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles);

function ClassRoom(props) {
    const notify = (values) => {
        toast(values);
    };

    const [filter, setFilter] = useState("");

    const handleChangeFilter = (e) => {
        setFilter(e.target.value);
    };

    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const handleRefresh = useCallback(() => {
        setRefresh(!refresh);
        setPage(1);
        setSearch("");
        setFilter("");
        setSortField("classRoomID");
        setSortType("asc");
    }, [refresh]);

    const [isAscendingClassRoomCode, setIsAscendingClassRoomCode] =
        useState(true);
    const [isAscendingClassRoomName, setIsAscendingClassRoomName] =
        useState(true);
    const [isAscendingCourse, setIsAscendingCourse] = useState(true);

    // Hàm xử lý khi nhấp vào tiêu đề bảng
    const handleHeaderClickClassRoomCode = () => {
        setIsAscendingClassRoomCode(!isAscendingClassRoomCode);
        if (isAscendingClassRoomCode) {
            setSortField("classRoomCode");
            setSortType("desc");
        } else {
            setSortField("classRoomCode");
            setSortType("asc");
        }
    };

    const handleHeaderClickClassRoomName = () => {
        setIsAscendingClassRoomName(!isAscendingClassRoomName);
        if (isAscendingClassRoomName) {
            setSortField("classRoomName");
            setSortType("desc");
        } else {
            setSortField("classRoomName");
            setSortType("asc");
        }
    };

    const handleHeaderClickCourse = () => {
        setIsAscendingCourse(!isAscendingCourse);
        if (isAscendingCourse) {
            setSortField("course");
            setSortType("desc");
        } else {
            setSortField("course");
            setSortType("asc");
        }
    };

    const getListClassrooms = props.getListClassroomAction;

    const url = new URL(window.location).searchParams.get("search");

    const [search, setSearch] = useState(url === undefined ? "" : url);
    const [successSearch, setSuccessSearch] = useState(false);

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const url = new URL(window.location);
        const searchValue = url.searchParams.get("search");
        if (searchValue) {
            setSearch(searchValue); // Gán giá trị tìm kiếm ban đầu
        }
    }, []);

    const handleSuccessSearch = async () => {
        const url = new URL(window.location);
        url.searchParams.set("search", search); // Thêm hoặc thay đổi giá trị của biến "search" trong URL
        window.history.replaceState({}, "", url.toString()); // Cập nhật URL mà không tải lại trang

        const classrooms = await classroomApi.getAllClassrooms(search);
        getListClassrooms(classrooms.content);
    };

    const size = props.size;
    const [page, setPage] = useState(1);

    const [sortField, setSortField] = useState("");
    const [sortType, setSortType] = useState("");

    const handleSetSort = (sortField, sortType) => {
        if (
            sortField === null ||
            sortField === undefined ||
            sortType === null ||
            sortType === null
        ) {
            setSortField("classRoomID");
            setSortType("asc");
        }
        setSortField(sortField);
        setSortType(sortType);
    };

    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        handleSetSort(sortField, sortType);

        const getAllMajors = async () => {
            const result = await classroomApi.getAllClassrooms(
                page,
                size,
                sortField,
                sortType,
                search,
                filter
            );

            const classrooms = result.content;
            const totalElements = result.totalElements;

            setTotalElements(totalElements);
            setSuccessSearch(!successSearch);
            getListClassrooms(classrooms);
        };

        getAllMajors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        getListClassrooms,
        refresh,
        page,
        search,
        filter,
        isAscendingClassRoomCode,
        isAscendingClassRoomName,
        isAscendingCourse,
    ]);

    const [addForm, setAddForm] = useState({
        classRoomCode: "",
        classRoomName: "",
        course: "",
        majorCode: "",
        teacherCode: "",
    });

    const handleChangeSelectedMajor = (e) => {
        setAddForm({
            ...addForm,
            majorCode: e.target.value, // Gán giá trị của thẻ option vào addForm
        });
    };

    const handleChangeSelectedTeacher = (e) => {
        setAddForm({
            ...addForm,
            teacherCode: e.target.value, // Gán giá trị của thẻ option vào addForm
        });
    };

    const handleAddChange = (e) => {
        setAddForm({
            ...addForm,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "majorCode") {
            handleChangeSelectedMajor(e); // Cập nhật giá trị từ option
        }
        if (e.target.name === "teacherCode") {
            handleChangeSelectedMajor(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowAddModel = () => {
        setShowAddForm(!showAddForm);
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        console.log(addForm);
        try {
            const data = await classroomApi.createClassroom(addForm);
            props.addClassroomAction(data);

            setAddForm({
                classRoomCode: "",
                classRoomName: "",
                course: "",
                majorCode: "",
                teacherCode: "",
            });
            setShowAddForm(!showAddForm);
            notify("Thêm mới thành công");
        } catch (error) {
            console.error("Error creating data: ", error);
        }
    };

    const [updateForm, setUpdateForm] = useState({
        classRoomCode: "",
        classRoomName: "",
        course: "",
        majorID: "",
        teacherID: "",
        classRoomID: "",
    });

    const handleShowUpdateModel = (
        classRoomCode,
        classRoomName,
        course,
        majorID,
        teacherID,
        classRoomID
    ) => {
        setUpdateForm({
            classRoomCode,
            classRoomName,
            course,
            majorID,
            teacherID,
            classRoomID,
        });
        setShowUpdateForm(!showUpdateForm);
        console.log(updateForm);
    };

    const handleChangeSelectedUpdateMajor = (e) => {
        setUpdateForm({
            ...updateForm,
            majorID: e.target.value, // Gán giá trị của thẻ option vào updateForm
        });
    };

    const handleChangeSelectedUpdateTeacher = (e) => {
        setUpdateForm({
            ...updateForm,
            teacherID: e.target.value, // Gán giá trị của thẻ option vào updateForm
        });
    };

    const handleChange = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "majorID") {
            handleChangeSelectedUpdateMajor(e); // Cập nhật giá trị từ option
        }
        if (e.target.name === "teacherID") {
            handleChangeSelectedUpdateTeacher(e); // Cập nhật giá trị từ option
        }
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log(updateForm);
            const data = await classroomApi.updateClassroom(updateForm);
            props.updateClassroomAction(data);

            setUpdateForm({
                classRoomCode: "",
                classRoomName: "",
                course: "",
                majorID: "",
                teacherID: "",
                classRoomID: "",
            });
            setShowUpdateForm(!showUpdateForm);
            notify("Cập nhật thành công");
        } catch (error) {
            console.error("Error updating data: ", error);
        }
    };

    const [classRoomDelete, setClassRoomDelete] = useState({
        classRoomName: "",
        classRoomID: "",
    });

    const [idDelete, setIdDelete] = useState(0);

    const handleDelete = (classRoomName, classRoomID) => {
        setClassRoomDelete({
            classRoomName: classRoomName,
            classRoomID: classRoomID,
        });
        setShowDeleteForm(!showDeleteForm);
    };

    const handleShowDeleteModel = (fullName, id) => {
        handleDelete(fullName, id);
        setIdDelete(id);
        setShowDeleteForm(!showDeleteForm);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await classroomApi.deleteClassroom(idDelete);
            props.deleteClassroomAction(data);
            setShowDeleteForm(!showDeleteForm);
            notify("Xóa thành công");
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
    };

    const [majorList, setMajorList] = useState([]);

    useEffect(() => {
        const getAllMajors = async () => {
            const majors = await majorApi.getAllMajors();

            setMajorList(majors.content);
        };
        getAllMajors();
    }, []);

    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => {
        const getAllTeachers = async () => {
            const teachers = await teacherApi.getAllTeachers();

            setTeacherList(teachers.content);
        };
        getAllTeachers();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "dd-MM-yyyy"); // Định dạng ngày tháng thành dd-MM-yyyy
    };

    //phân trang
    const handlePageClick = (data) => {
        setPage(data.selected + 1); // `data.selected` là chỉ số của trang, cần cộng 1 để được số trang thực tế
    };

    return (
        <div>
            <SubHeader />
            <Toaster />

            <div
                className={cx(
                    showAddForm || showUpdateForm || showDeleteForm
                        ? "blur"
                        : "wrapper"
                )}
            >
                <div className={cx("container")}>
                    <h4>QUẢN LÝ LỚP</h4>

                    <div className={cx("top-container")}>
                        <div className={cx("search")}>
                            <input
                                type="text"
                                name="search"
                                placeholder="Tìm kiếm"
                                className={cx("search-input")}
                                value={search}
                                onChange={handleChangeSearch}
                                disabled={
                                    showAddForm ||
                                    showDeleteForm ||
                                    showUpdateForm
                                }
                            />
                            <button
                                className={cx("search-btn")}
                                title="Tìm kiếm"
                                onClick={handleSuccessSearch}
                            >
                                <span className={cx("icon-search")}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </span>
                                Tìm kiếm
                            </button>

                            <select
                                className={cx("selection")}
                                name="majorName"
                                value={filter}
                                onChange={handleChangeFilter}
                            >
                                <option value={""}>Chọn Ngành</option>
                                {majorList.map((major, index) => (
                                    <option key={index} value={major.majorName}>
                                        {major.majorName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleShowAddModel}
                            className={cx("btn-add")}
                            title="Thêm mới"
                        >
                            <span className={cx("icons")}>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            Thêm mới
                        </button>

                        <button
                            className={cx("btn-refresh")}
                            title="refresh"
                            onClick={handleRefresh}
                        >
                            <FontAwesomeIcon icon={faRefresh} />
                        </button>
                    </div>

                    <hr className={cx("horizontal-line")} />

                    <div className={cx("main-container")}>
                        <table className={cx("table")}>
                            <thead>
                                <tr>
                                    <th
                                        className={cx("subject-code-header")}
                                        onClick={handleHeaderClickClassRoomCode}
                                    >
                                        <div className={cx("header-container")}>
                                            Mã Lớp
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingClassRoomCode ? (
                                                    <FontAwesomeIcon
                                                        icon={faCaretUp}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faCaretDown}
                                                    />
                                                )}
                                            </span>
                                        </div>
                                    </th>
                                    <th
                                        className={cx("subject-code-header")}
                                        onClick={handleHeaderClickClassRoomName}
                                    >
                                        <div className={cx("header-container")}>
                                            Tên Lớp
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingClassRoomName ? (
                                                    <FontAwesomeIcon
                                                        icon={faCaretUp}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faCaretDown}
                                                    />
                                                )}
                                            </span>
                                        </div>
                                    </th>
                                    <th>Số lượng</th>
                                    <th
                                        className={cx("subject-code-header")}
                                        onClick={handleHeaderClickCourse}
                                    >
                                        <div className={cx("header-container")}>
                                            Khóa
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingCourse ? (
                                                    <FontAwesomeIcon
                                                        icon={faCaretUp}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faCaretDown}
                                                    />
                                                )}
                                            </span>
                                        </div>
                                    </th>
                                    <th>Ngành</th>
                                    <th>Ngày tạo</th>
                                    <th>GVCN</th>
                                    <th className={cx("action-row")}>
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.classrooms.length > 0 ? (
                                    props.classrooms.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.classRoomCode}</td>
                                            <td>{item.classRoomName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.course}</td>
                                            <td>
                                                {item.major !== null
                                                    ? item.major.majorName
                                                    : "Chưa có ngành"}
                                            </td>
                                            <td>
                                                {formatDate(item.createdDate)}
                                            </td>
                                            <td>
                                                {item.teacher !== null
                                                    ? item.teacher.teacherName
                                                    : "Chưa có GVCN"}
                                            </td>

                                            <td>
                                                <button
                                                    className={cx("btn-update")}
                                                    onClick={() =>
                                                        handleShowUpdateModel(
                                                            item.classRoomCode,
                                                            item.classRoomName,
                                                            item.course,
                                                            item.major.majorID,
                                                            item.teacher
                                                                .teacherID,
                                                            item.classRoomID
                                                        )
                                                    }
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className={cx("btn-delete")}
                                                    onClick={() =>
                                                        handleShowDeleteModel(
                                                            item.classRoomName,
                                                            item.classRoomID
                                                        )
                                                    }
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11">Chưa có lớp</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className={cx("pagination-container")}>
                            <ReactPaginate
                                previousLabel={
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                }
                                nextLabel={
                                    <FontAwesomeIcon icon={faChevronRight} />
                                }
                                breakLabel={"..."}
                                pageCount={Math.ceil(totalElements / size)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={cx("pagination")}
                                activeClassName={cx("active")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showAddForm && !showUpdateForm && !showDeleteForm && (
                <div className={cx("addition-form")}>
                    <h3>THÊM MỚI LỚP</h3>
                    <form className={cx("form")} onSubmit={handleSubmitCreate}>
                        <label className={cx("label")}>Mã lớp</label>
                        <input
                            type="text"
                            placeholder="Nhập mã lớp"
                            className={cx("input-text")}
                            name="classRoomCode"
                            value={addForm.classRoomCode}
                            onChange={handleAddChange}
                            required
                        />
                        <span
                            className={cx("classroomCode-error-message")}
                            hidden
                        ></span>
                        <label className={cx("label")}>Tên lớp</label>
                        <input
                            type="text"
                            placeholder="Nhập tên lớp"
                            className={cx("input-text")}
                            name="classRoomName"
                            value={addForm.classRoomName}
                            onChange={handleAddChange}
                            required
                        />
                        <span
                            className={cx("classroomName-error-message")}
                            hidden
                        ></span>

                        <label className={cx("label")}>Khóa</label>
                        <input
                            type="number"
                            placeholder="Nhập khóa"
                            className={cx("input-text")}
                            name="course"
                            value={addForm.course}
                            onChange={handleAddChange}
                            required
                        />

                        <label className={cx("label")}>Chọn ngành</label>
                        <select
                            className={cx("selection")}
                            name="majorCode"
                            value={addForm.majorCode || ""}
                            onChange={handleChangeSelectedMajor}
                            required
                        >
                            <option value={""}>Chọn Ngành</option>
                            {majorList.map((major, index) => (
                                <option key={index} value={major.majorCode}>
                                    {major.majorName}
                                </option>
                            ))}
                        </select>

                        <label className={cx("label")}>
                            Chọn giáo viên chủ nhiệm
                        </label>
                        <select
                            className={cx("selection")}
                            name="teacherCode"
                            value={addForm.teacherCode || ""}
                            onChange={handleChangeSelectedTeacher}
                            required
                        >
                            <option value={""}>Chọn GVCN</option>
                            {teacherList.map((teacher, index) => (
                                <option key={index} value={teacher.teacherCode}>
                                    {teacher.teacherName}
                                </option>
                            ))}
                        </select>

                        <div className={cx("btn")}>
                            <button className={cx("btn-add")}>Thêm</button>
                            <button
                                className={cx("btn-cancel")}
                                onClick={() => {
                                    setShowAddForm(!showAddForm);
                                }}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {showUpdateForm && !showAddForm && (
                <div className={cx("update-form")}>
                    <h3>CẬP NHẬT THÔNG TIN LỚP</h3>
                    <form className={cx("form")} onSubmit={handleSubmitUpdate}>
                        <label htmlFor="classroomCode" className={cx("label")}>
                            Mã lớp
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập mã lớp"
                            className={cx("input-text")}
                            name="classRoomCode"
                            value={updateForm.classRoomCode}
                            onChange={handleChange}
                        />
                        <span
                            className={cx("classroomCode-error-message")}
                            hidden
                        ></span>
                        <label htmlFor="classroomName" className={cx("label")}>
                            Tên lớp
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập tên lớp"
                            className={cx("input-text")}
                            name="classRoomName"
                            value={updateForm.classRoomName}
                            onChange={handleChange}
                        />
                        <span
                            className={cx("classroomName-error-message")}
                            hidden
                        ></span>

                        <label className={cx("label")}>Chọn ngành</label>
                        <select
                            className={cx("selection")}
                            name="majorID"
                            value={updateForm.majorID || ""}
                            onChange={handleChangeSelectedUpdateMajor}
                            required
                        >
                            {majorList.map((major, index) => (
                                <option key={index} value={major.majorID}>
                                    {major.majorName}
                                </option>
                            ))}
                        </select>

                        <label className={cx("label")}>
                            Chọn giáo viên chủ nhiệm
                        </label>
                        <select
                            className={cx("selection")}
                            name="teacherID"
                            value={updateForm.teacherID || ""}
                            onChange={handleChangeSelectedUpdateTeacher}
                            required
                        >
                            {teacherList.map((teacher, index) => (
                                <option key={index} value={teacher.teacherID}>
                                    {teacher.teacherName}
                                </option>
                            ))}
                        </select>

                        <div className={cx("btn")}>
                            <button className={cx("btn-add")}>Sửa</button>
                            <button
                                className={cx("btn-cancel")}
                                onClick={() => {
                                    setShowUpdateForm(!showUpdateForm);
                                }}
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
                        <h3>XÁC NHẬN </h3>
                        <p>
                            Bạn có chắc chắn xóa lớp{" "}
                            {classRoomDelete.classRoomName}
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

// export default ClassRoom;
const mapGlobalStateToProps = (state) => {
    // console.log(state);
    return {
        classrooms: selectClassrooms(state.Classroom.classrooms),
        page: selectPage(state.Classroom.page),
        size: selectSize(state.Classroom.size),
        totalElements: selectTotalElement(state.Classroom.totalElements),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListClassroomAction: bindActionCreators(
            getListClassroomAction,
            dispatch
        ),
        updateClassroomAction: bindActionCreators(
            updateClassroomAction,
            dispatch
        ),
        deleteClassroomAction: bindActionCreators(
            deleteClassroomAction,
            dispatch
        ),
        addClassroomAction: bindActionCreators(addClassroomAction, dispatch),
    };
};

export default connect(mapGlobalStateToProps, mapDispatchToProps)(ClassRoom);
