import classNames from "classnames/bind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";
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

import styles from "./Subject.module.scss";
import SubHeader from "../SubHeader/SubHeader";
import {
    addSubjectAction,
    deleteSubjectAction,
    getListSubjectAction,
    updateSubjectAction,
} from "../../../redux/actions/subjectAction";
import {
    selectSubjects,
    selectPage,
    selectSize,
    selectTotalElement,
} from "../../../redux/selectors/subjectSelector";
import subjectApi from "../../../services/api/subjectApi";
import teacherApi from "../../../services/api/teacherApi";

import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles);

function Subject(props) {
    const notify = (values) => {
        toast(values);
    };
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const [filter, setFilter] = useState("");

    const handleChangeFilter = (e) => {
        setFilter(e.target.value);
    };

    const [refresh, setRefresh] = useState(false);

    const handleRefresh = useCallback(() => {
        setRefresh(!refresh);
        setPage(1);
        setSearch("");
        setFilter("");
        setSortField("subjectID");
        setSortType("asc");
    }, [refresh]);

    const [isAscendingSubjectCode, setIsAscendingSubjectCode] = useState(true);
    const [isAscendingSubjectName, setIsAscendingSubjectName] = useState(true);

    // Hàm xử lý khi nhấp vào tiêu đề bảng
    const handleHeaderClickSubjectCode = () => {
        setIsAscendingSubjectCode(!isAscendingSubjectCode);
        if (isAscendingSubjectCode) {
            setSortField("subjectCode");
            setSortType("desc");
        } else {
            setSortField("subjectCode");
            setSortType("asc");
        }
    };

    const handleHeaderClickSubjectName = () => {
        setIsAscendingSubjectName(!isAscendingSubjectName);
        if (isAscendingSubjectName) {
            setSortField("subjectName");
            setSortType("desc");
        } else {
            setSortField("subjectName");
            setSortType("asc");
        }
    };

    const getListSubjects = props.getListSubjectAction;

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

        const subjects = await subjectApi.getAllSubjects(search);
        getListSubjects(subjects.content);
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
            setSortField("subjectID");
            setSortType("asc");
        }
        setSortField(sortField);
        setSortType(sortType);
    };

    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        handleSetSort(sortField, sortType);

        const getAllMajors = async () => {
            const result = await subjectApi.getAllSubjects(
                page,
                size,
                sortField,
                sortType,
                search,
                filter
            );
            const subjects = result.content;
            const totalElements = result.totalElements;

            setTotalElements(totalElements);
            setSuccessSearch(!successSearch);
            getListSubjects(subjects, page, totalElements);
        };

        getAllMajors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        getListSubjects,
        refresh,
        page,
        search,
        filter,
        isAscendingSubjectCode,
        isAscendingSubjectName,
    ]);

    const [addForm, setAddForm] = useState({
        subjectCode: "",
        subjectName: "",
        numberOfCredit: "",
        teacherID: "",
    });

    const handleChangeSelected = (e) => {
        setAddForm({
            ...addForm,
            teacherID: e.target.value, // Gán giá trị của thẻ option vào addForm
        });
    };

    const handleAddChange = (e) => {
        setAddForm({
            ...addForm,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "teacherID") {
            handleChangeSelected(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowAddModel = () => {
        setShowAddForm(!showAddForm);
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        try {
            const data = await subjectApi.createSubject(addForm);
            props.addSubjectAction(data);

            setAddForm({
                subjectCode: "",
                subjectName: "",
                numberOfCredit: "",
                teacherID: "",
            });
            setShowAddForm(!showAddForm);
            notify("Thêm mới thành công");
        } catch (error) {
            console.error("Error creating data: ", error);
        }
    };

    const [updateForm, setUpdateForm] = useState({
        subjectCode: "",
        subjectName: "",
        numberOfCredit: "",
        teacherID: "",
        subjectID: "",
    });

    const handleChangeSelectedUpdate = (e) => {
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
        if (e.target.name === "teacherID") {
            handleChangeSelectedUpdate(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowUpdateModel = (
        subjectCode,
        subjectName,
        numberOfCredit,
        teacherID,
        subjectID
    ) => {
        setUpdateForm({
            subjectCode,
            subjectName,
            numberOfCredit,
            teacherID,
            subjectID,
        });
        setShowUpdateForm(!showUpdateForm);
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log(updateForm);
            const data = await subjectApi.updateSubject(updateForm);
            props.updateSubjectAction(data);

            setUpdateForm({
                subjectCode: "",
                subjectName: "",
                numberOfCredit: "",
                teacherID: "",
                subjectID: "",
            });
            setShowUpdateForm(!showUpdateForm);
            notify("Cập nhật thành công");
        } catch (error) {
            console.error("Error updating data: ", error);
        }
    };

    const [subjectDelete, setSubjectDelete] = useState({
        subjectName: "",
        subjectID: "",
    });

    const handleDelete = (subjectName, subjectID) => {
        setSubjectDelete({ subjectName: subjectName, subjectID: subjectID });
        setShowDeleteForm(!showDeleteForm);
    };

    const handleShowDeleteModel = (subjectName, subjectID) => {
        handleDelete(subjectName, subjectID);
        setShowDeleteForm(!showDeleteForm);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await subjectApi.deleteSubject(
                subjectDelete.subjectID
            );
            props.deleteSubjectAction(data);

            setShowDeleteForm(!showDeleteForm);
            notify("Xóa thành công");
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
    };

    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => {
        const getAllTeachers = async () => {
            const teachers = await teacherApi.getAllTeachers();
            setTeacherList(teachers.content);
        };
        getAllTeachers();
    }, []);

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
                    <h4>QUẢN LÝ MÔN HỌC</h4>

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
                                name="teacherName"
                                value={filter}
                                onChange={handleChangeFilter}
                            >
                                <option value={""}>Chọn Giáo Viên</option>
                                {teacherList.map((teacher, index) => (
                                    <option
                                        key={index}
                                        value={teacher.teacherName}
                                    >
                                        {teacher.teacherName}
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
                                        onClick={handleHeaderClickSubjectCode}
                                    >
                                        <div className={cx("header-container")}>
                                            Mã Môn
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingSubjectCode ? (
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
                                        onClick={handleHeaderClickSubjectName}
                                    >
                                        <div className={cx("header-container")}>
                                            Tên Môn
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingSubjectName ? (
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
                                    <th>Số tín chỉ</th>
                                    <th>Số Lượng Đăng Ký</th>
                                    <th>Giáo Viên</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.subjects.length > 0 ? (
                                    props.subjects.map((item) => (
                                        <tr key={item.subjectID}>
                                            <td>{item.subjectCode}</td>
                                            <td>{item.subjectName}</td>
                                            <td>{item.numberOfCredit}</td>
                                            <td>
                                                {item.actualQuantity}
                                                {"/"}
                                                {item.maxQuantity}
                                            </td>
                                            <td>
                                                {item.teacher !== null
                                                    ? item.teacher.teacherName
                                                    : "Chưa có giáo viên"}
                                            </td>

                                            <td>
                                                <button
                                                    className={cx("btn-update")}
                                                    onClick={() =>
                                                        handleShowUpdateModel(
                                                            item.subjectCode,
                                                            item.subjectName,
                                                            item.numberOfCredit,
                                                            item.teacher !==
                                                                null
                                                                ? item.teacher
                                                                      .teacherID
                                                                : "",
                                                            item.subjectID
                                                        )
                                                    }
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className={cx("btn-delete")}
                                                    onClick={() =>
                                                        handleShowDeleteModel(
                                                            item.subjectName,
                                                            item.subjectID
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
                                        <td colSpan="11">Chưa có môn học</td>
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
                    <h3>THÊM MỚI MÔN HỌC</h3>
                    <form className={cx("form")} onSubmit={handleSubmitCreate}>
                        <label className={cx("label")}>Mã môn</label>
                        <input
                            type="text"
                            name="subjectCode"
                            placeholder="Nhập mã môn"
                            className={cx("input-text")}
                            value={addForm.subjectCode}
                            onChange={handleAddChange}
                            required
                        />
                        <span
                            className={cx("majorCode-error-message")}
                            hidden
                        ></span>
                        <label className={cx("label")}>Tên môn</label>
                        <input
                            type="text"
                            name="subjectName"
                            placeholder="Nhập tên môn"
                            className={cx("input-text")}
                            value={addForm.subjectName}
                            onChange={handleAddChange}
                            required
                        />
                        <span
                            className={cx("majorName-error-message")}
                            hidden
                        ></span>

                        <label className={cx("label")}>Số tín chỉ</label>
                        <input
                            type="number"
                            name="numberOfCredit"
                            placeholder="Nhập số tín chỉ"
                            className={cx("input-text")}
                            value={addForm.numberOfCredit}
                            onChange={handleAddChange}
                            required
                        />

                        <label className={cx("label")}>Chọn giáo viên</label>
                        <select
                            className={cx("selection")}
                            name="teacherID"
                            value={addForm.teacherID || ""}
                            onChange={handleChangeSelected}
                            required
                        >
                            <option value={""}>Chọn giáo viên</option>
                            {teacherList.map((teacher, index) => (
                                <option key={index} value={teacher.teacherID}>
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
                    <h3>CẬP NHẬT THÔNG TIN MÔN HỌC</h3>
                    <form className={cx("form")} onSubmit={handleSubmitUpdate}>
                        <label htmlFor="subjectCode" className={cx("label")}>
                            Mã môn
                        </label>
                        <input
                            type="text"
                            name="subjectCode"
                            placeholder="Nhập mã môn"
                            className={cx("input-text")}
                            value={updateForm.subjectCode}
                            onChange={handleChange}
                        />
                        <span
                            className={cx("majorCode-error-message")}
                            hidden
                        ></span>
                        <label htmlFor="subjectName" className={cx("label")}>
                            Tên môn
                        </label>
                        <input
                            type="text"
                            name="subjectName"
                            placeholder="Nhập tên môn"
                            className={cx("input-text")}
                            value={updateForm.subjectName}
                            onChange={handleChange}
                        />
                        <span
                            className={cx("majorName-error-message")}
                            hidden
                        ></span>

                        <label htmlFor="numberOfCredit" className={cx("label")}>
                            Số tín chỉ
                        </label>
                        <input
                            type="number"
                            name="numberOfCredit"
                            placeholder="Nhập số tín chỉ"
                            className={cx("input-text")}
                            value={updateForm.numberOfCredit}
                            onChange={handleChange}
                        />

                        <label className={cx("label")}>Chọn giáo viên</label>
                        <select
                            className={cx("selection")}
                            name="teacherID"
                            value={updateForm.teacherID || ""}
                            onChange={handleChangeSelectedUpdate}
                            required
                        >
                            <option value="">Chọn giáo viên</option>
                            {teacherList.map((teacher, index) => (
                                <option key={index} value={teacher.teacherID}>
                                    {teacher.teacherName}
                                </option>
                            ))}
                        </select>

                        <div className={cx("btn")}>
                            <button type="submit" className={cx("btn-add")}>
                                Sửa
                            </button>
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
                            Bạn có chắc chắn xóa ngành{" "}
                            {subjectDelete.subjectName}
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

// export default Subject;

const mapGlobalStateToProps = (state) => {
    // console.log(state.Subject.totalElements);
    return {
        subjects: selectSubjects(state.Subject.subjects),
        page: selectPage(state.Subject.page),
        size: selectSize(state.Subject.size),
        totalElements: selectTotalElement(state.Subject.totalElements),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListSubjectAction: bindActionCreators(
            getListSubjectAction,
            dispatch
        ),
        updateSubjectAction: bindActionCreators(updateSubjectAction, dispatch),
        deleteSubjectAction: bindActionCreators(deleteSubjectAction, dispatch),
        addSubjectAction: bindActionCreators(addSubjectAction, dispatch),
    };
};

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Subject);
