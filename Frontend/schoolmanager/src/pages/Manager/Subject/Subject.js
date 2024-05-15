import { useCallback, useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classNames from "classnames/bind";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCaretUp,
    faChevronLeft,
    faChevronRight,
    faFileExport,
    faMagnifyingGlass,
    faPlus,
    faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";

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
import majorApi from "../../../services/api/majorApi";
import fileDownload from "js-file-download";

const cx = classNames.bind(styles);

function Subject(props) {
    const notify = (values) => {
        toast(values);
    };
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const [filterTeacherName, setFilterTeacherName] = useState("");
    const handleChangeFilter = (e) => {
        setFilterTeacherName(e.target.value);
    };

    const [filterStatusSubject, setFilterStatusSubject] = useState("");
    const handleChangeStatusFilter = (e) => {
        setFilterStatusSubject(e.target.value);
    };

    const [filterMajor, setFilterMajor] = useState("");
    const handleChangeMajorFilter = (e) => {
        setFilterMajor(e.target.value);
    };

    const [refresh, setRefresh] = useState(false);

    const handleRefresh = useCallback(() => {
        setRefresh(!refresh);
        setPage(1);
        setSearch("");
        setFilterTeacherName("");
        setFilterStatusSubject("");
        setFilterMajor("");
        setSortField("subjectName");
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

    let navigate = useNavigate();
    useEffect(() => {
        handleSetSort(sortField, sortType);

        const getAllSubjects = async () => {
            const result = await subjectApi.getAllSubjects(
                page,
                size,
                sortField,
                sortType,
                search,
                filterTeacherName,
                filterStatusSubject,
                filterMajor
            );
            const subjects = result.content;
            const totalElements = result.totalElements;

            setTotalElements(totalElements);
            setSuccessSearch(!successSearch);
            getListSubjects(subjects, page, totalElements);
        };

        getAllSubjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        getListSubjects,
        refresh,
        page,
        search,
        filterTeacherName,
        filterStatusSubject,
        filterMajor,
        isAscendingSubjectCode,
        isAscendingSubjectName,
    ]);

    //export
    const handleExport = async (e) => {
        const res = await subjectApi.exportToCSV(
            search,
            filterTeacherName,
            filterStatusSubject,
            filterMajor
        );
        // console.log(res);
        const blob = new Blob(["\uFEFF" + res], {
            type: "text/csv;charset=utf-8;",
        });
        fileDownload(blob, "DSMon.csv");
    };

    const isValidSubjectCode = (subjectCode) => {
        return subjectCode.length >= 6 && subjectCode.length <= 30;
    };

    const isValidSubjectName = (subjectName) => {
        return subjectName.length >= 6 && subjectName.length <= 100;
    };

    const [subjectCodeError, setSubjectCodeError] = useState("");
    const [subjectNameError, setSubjectNameError] = useState("");

    const handleFocus = () => {
        setSubjectCodeError("");
        setSubjectNameError("");
    };

    const [addForm, setAddForm] = useState({
        subjectCode: "",
        subjectName: "",
        numberOfCredit: "",
        subjectStatus: "",
        teacherID: "",
        majorID: "",
    });

    const handleChangeSelected = (e) => {
        setAddForm({
            ...addForm,
            teacherID: e.target.value, // Gán giá trị của thẻ option vào addForm
        });
    };

    const handleChangeSelectedMajor = (e) => {
        setAddForm({
            ...addForm,
            majorID: e.target.value, // Gán giá trị của thẻ option vào addForm
        });
    };

    const handleChangeSelectedSubjectStatus = (e) => {
        setAddForm({
            ...addForm,
            subjectStatus: e.target.value, // Gán giá trị của thẻ option vào addForm
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
        if (e.target.name === "majorID") {
            handleChangeSelectedMajor(e); // Cập nhật giá trị từ option
        }
        if (e.target.name === "subjectStatus") {
            handleChangeSelectedSubjectStatus(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowAddModel = () => {
        setShowAddForm(!showAddForm);
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        let isValid = true;
        try {
            const subjectCode = await subjectApi.checkSubjectCodeExist(
                addForm.subjectCode.trim()
            );
            const subjectName = await subjectApi.checkSubjectNameExist(
                addForm.subjectName.trim()
            );
            if (!isValidSubjectCode(addForm.subjectCode.trim())) {
                setSubjectCodeError("Mã môn không hợp lệ! (từ 6 đến 30 kí tự)");
                isValid = false;
            } else if (subjectCode && subjectName) {
                setSubjectNameError(
                    "Môn học " + addForm.subjectName + " đã tồn tại!"
                );
                setSubjectCodeError("");
                isValid = false;
            } else if (!subjectCode && subjectName) {
                isValid = true;
            } else if (subjectCode) {
                setSubjectCodeError("Mã môn đã tồn tại!");
                isValid = false;
            }

            if (!isValidSubjectName(addForm.subjectName.trim())) {
                setSubjectNameError(
                    "Tên môn không hợp lệ! (từ 6 đến 100 kí tự)"
                );
                isValid = false;
            }

            if (isValid) {
                const data = await subjectApi.createSubject(addForm);
                props.addSubjectAction(data);

                setAddForm({
                    subjectCode: "",
                    subjectName: "",
                    numberOfCredit: "",
                    subjectStatus: "",
                    teacherID: "",
                    majorID: "",
                });
                setShowAddForm(!showAddForm);
                notify("Thêm mới thành công");

                handleFocus();
            }
        } catch (error) {
            console.error("Error creating data: ", error);

            if (error.status === 500) {
                notify("Thêm mới thất bại!");
            }

            if (error.status === 404) {
                navigate("/error-404-page");
            }
        }
    };

    const handleCloseModalAdd = () => {
        setShowAddForm(!showAddForm);
        setAddForm({
            subjectCode: "",
            subjectName: "",
            numberOfCredit: "",
            subjectStatus: "",
            teacherID: "",
            majorID: "",
        });
        handleFocus();
    };

    const [updateForm, setUpdateForm] = useState({
        subjectCode: "",
        subjectName: "",
        numberOfCredit: "",
        subjectStatus: "",
        teacherID: "",
        majorID: "",
        subjectID: "",
    });

    const [checkUpdateForm, setCheckUpdateForm] = useState({
        subjectCode: "",
        subjectName: "",
        numberOfCredit: "",
        subjectStatus: "",
        teacherID: "",
        majorID: "",
        subjectID: "",
    });

    const handleChangeSelectedUpdate = (e) => {
        setUpdateForm({
            ...updateForm,
            teacherID: e.target.value, // Gán giá trị của thẻ option vào updateForm
        });
    };

    const handleChangeSelectedMajorUpdate = (e) => {
        setUpdateForm({
            ...updateForm,
            majorID: e.target.value, // Gán giá trị của thẻ option vào updateForm
        });
    };

    const handleChangeSelectedUpdateSubjectStatus = (e) => {
        setUpdateForm({
            ...updateForm,
            subjectStatus: e.target.value, // Gán giá trị của thẻ option vào updateForm
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
        if (e.target.name === "majorID") {
            handleChangeSelectedMajorUpdate(e); // Cập nhật giá trị từ option
        }
        if (e.target.name === "subjectStatus") {
            handleChangeSelectedUpdateSubjectStatus(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowUpdateModel = (
        subjectCode,
        subjectName,
        numberOfCredit,
        subjectStatus,
        teacherID,
        majorID,
        subjectID
    ) => {
        setUpdateForm({
            subjectCode,
            subjectName,
            numberOfCredit,
            subjectStatus,
            teacherID,
            majorID,
            subjectID,
        });
        setCheckUpdateForm({
            subjectCode,
            subjectName,
            numberOfCredit,
            subjectStatus,
            teacherID,
            majorID,
            subjectID,
        });
        setShowUpdateForm(!showUpdateForm);
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        let isValid = true;
        try {
            const subjectCode = await subjectApi.checkSubjectCodeExist(
                updateForm.subjectCode.trim()
            );
            const subjectName = await subjectApi.checkSubjectNameExist(
                updateForm.subjectName.trim()
            );
            if (updateForm.subjectCode !== checkUpdateForm.subjectCode) {
                if (!isValidSubjectCode(updateForm.subjectCode.trim())) {
                    setSubjectCodeError(
                        "Mã môn không hợp lệ! (từ 6 đến 30 kí tự)"
                    );
                    isValid = false;
                } else if (subjectCode && subjectName) {
                    setSubjectNameError(
                        "Môn học " + updateForm.subjectName + " đã tồn tại!"
                    );
                    setSubjectCodeError("");
                    isValid = false;
                } else if (!subjectCode && subjectName) {
                    isValid = true;
                }
                if (
                    subjectCode &&
                    checkUpdateForm.subjectCode !== updateForm.subjectCode
                ) {
                    setSubjectCodeError("Mã môn đã tồn tại!");
                    isValid = false;
                }
            }

            const subjectCodeAndSubjectName =
                await subjectApi.checkSubjectCodeAndSubjectNameExist(
                    updateForm.subjectCode.trim(),
                    updateForm.subjectName.trim()
                );
            if (updateForm.subjectName !== checkUpdateForm.subjectName) {
                if (!isValidSubjectName(updateForm.subjectName.trim())) {
                    setSubjectNameError(
                        "Tên môn không hợp lệ! (từ 6 đến 100 kí tự)"
                    );
                    isValid = false;
                } else if (
                    subjectCodeAndSubjectName &&
                    updateForm.subjectName !== checkUpdateForm.subjectName
                ) {
                    subjectNameError("Đã có môn " + updateForm.subjectName);
                    isValid = false;
                }
            }

            if (isValid) {
                const data = await subjectApi.updateSubject(updateForm);
                props.updateSubjectAction(data);

                setUpdateForm({
                    subjectCode: "",
                    subjectName: "",
                    numberOfCredit: "",
                    subjectStatus: "",
                    teacherID: "",
                    majorID: "",
                    subjectID: "",
                });
                setShowUpdateForm(!showUpdateForm);
                notify("Cập nhật thành công");

                handleFocus();
            }
        } catch (error) {
            console.error("Error updating data: ", error);

            if (error.status === 500) {
                notify("Cập nhật thất bại!");
            }

            if (error.status === 404) {
                navigate("/error-404-page");
            }
        }
    };

    const handleCloseModalUpdate = () => {
        setShowUpdateForm(!showUpdateForm);
        setUpdateForm({
            subjectCode: "",
            subjectName: "",
            numberOfCredit: "",
            subjectStatus: "",
            teacherID: "",
            majorID: "",
            subjectID: "",
        });
        handleFocus();
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

            if (error.status === 500) {
                notify("Xóa thất bại!");
            }
            if (error.status === 404) {
                navigate("/error-404-page");
            }
        }
    };

    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => {
        const getAllTeachers = async () => {
            const teachers = await teacherApi.getList();
            setTeacherList(teachers);
        };
        getAllTeachers();
    }, []);

    const [majorList, setMajorList] = useState([]);

    useEffect(() => {
        const getAllMajors = async () => {
            const majors = await majorApi.getList();

            setMajorList(majors);
        };
        getAllMajors();
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
                    <h4>QUẢN LÝ HỌC PHẦN</h4>

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

                            <button
                                onClick={handleExport}
                                className={cx("btn-export")}
                            >
                                <span>
                                    <FontAwesomeIcon icon={faFileExport} />
                                </span>
                                Export to CSV
                            </button>

                            <select
                                className={cx("selection")}
                                name="majorCode"
                                value={filterMajor}
                                onChange={handleChangeMajorFilter}
                            >
                                <option value="">Chọn Ngành</option>
                                {majorList.map((major, index) => (
                                    <option key={index} value={major.majorCode}>
                                        {major.majorName}
                                    </option>
                                ))}
                            </select>

                            <select
                                className={cx("selection")}
                                name="teacherName"
                                value={filterTeacherName}
                                onChange={handleChangeFilter}
                            >
                                <option value={""}>Chọn Giảng Viên</option>
                                {teacherList.map((teacher, index) => (
                                    <option
                                        key={index}
                                        value={teacher.teacherName}
                                    >
                                        {teacher.teacherName}
                                    </option>
                                ))}
                            </select>

                            <select
                                className={cx("selection")}
                                name="statusSubject"
                                value={filterStatusSubject}
                                onChange={handleChangeStatusFilter}
                            >
                                <option value={""}>
                                    Chọn Trạng Thái Đăng Ký
                                </option>
                                <option value="OPEN">Mở Đăng Ký</option>
                                <option value="CLOSE">Đóng Đăng Ký</option>
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
                                    <th>Giảng Viên</th>
                                    <th>Ngành</th>
                                    <th>Trạng thái đăng ký</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.subjects.length > 0 ? (
                                    props.subjects.map((item) => (
                                        <tr key={item.subjectID}>
                                            <td>{item.subjectCode}</td>
                                            <td>
                                                <Link
                                                    to={`/chi-tiet-mon-hoc/${item.subjectID}`}
                                                >
                                                    {item.subjectName}
                                                </Link>
                                            </td>

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
                                            <td>{item.major.majorName}</td>
                                            <td>
                                                {item.subjectStatus === "OPEN"
                                                    ? "Mở"
                                                    : "Đóng"}
                                            </td>

                                            <td>
                                                <button
                                                    className={cx("btn-update")}
                                                    onClick={() =>
                                                        handleShowUpdateModel(
                                                            item.subjectCode,
                                                            item.subjectName,
                                                            item.numberOfCredit,
                                                            item.subjectStatus,
                                                            item.teacher !==
                                                                null
                                                                ? item.teacher
                                                                      .teacherID
                                                                : "",
                                                            item.major.majorID,
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
                                        <td
                                            colSpan="11"
                                            style={{ textAlign: "center" }}
                                        >
                                            Chưa có môn học
                                        </td>
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
                    <h3>THÊM MỚI HỌC PHẦN</h3>
                    <form className={cx("form")} onSubmit={handleSubmitCreate}>
                        <label className={cx("label")}>Mã môn</label>
                        <input
                            type="text"
                            name="subjectCode"
                            placeholder="Nhập mã môn"
                            className={cx("input-text")}
                            value={addForm.subjectCode}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {subjectCodeError}
                        </label>

                        <label className={cx("label")}>Tên môn</label>
                        <input
                            type="text"
                            name="subjectName"
                            placeholder="Nhập tên môn"
                            className={cx("input-text")}
                            value={addForm.subjectName}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {subjectNameError}
                        </label>

                        <label className={cx("label")}>Số tín chỉ</label>
                        <input
                            type="number"
                            name="numberOfCredit"
                            placeholder="Nhập số tín chỉ"
                            className={cx("input-text")}
                            value={addForm.numberOfCredit}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}></label>

                        <label className={cx("label")}>Chọn giảng viên</label>
                        <select
                            className={cx("selection")}
                            name="teacherID"
                            value={addForm.teacherID || ""}
                            onChange={handleChangeSelected}
                            onFocus={handleFocus}
                            required
                        >
                            <option value={""}>Chọn giảng viên</option>
                            {teacherList.map((teacher, index) => (
                                <option key={index} value={teacher.teacherID}>
                                    {teacher.teacherName}
                                </option>
                            ))}
                        </select>
                        <label className={cx("user-Error")}></label>

                        <label className={cx("label")}>Chọn ngành</label>
                        <select
                            className={cx("selection")}
                            name="majorID"
                            value={addForm.majorID || ""}
                            onChange={handleChangeSelectedMajor}
                            onFocus={handleFocus}
                            required
                        >
                            <option value={""}>Chọn Ngành</option>
                            {majorList.map((major, index) => (
                                <option key={index} value={major.majorID}>
                                    {major.majorName}
                                </option>
                            ))}
                        </select>
                        <label className={cx("user-Error")}></label>

                        <label className={cx("label")}>Trạng thái</label>
                        <select
                            className={cx("selection")}
                            name="subjectStatus"
                            value={addForm.subjectStatus || ""}
                            onChange={handleChangeSelectedSubjectStatus}
                            onFocus={handleFocus}
                            required
                        >
                            <option value={""}>Chọn Trạng thái</option>
                            <option value={"OPEN"}>Mở đăng ký</option>
                            <option value={"CLOSE"}>Đóng đăng ký</option>
                        </select>

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
                    <h3>CẬP NHẬT THÔNG TIN HỌC PHẦN</h3>
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
                            onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>
                            {subjectCodeError}
                        </label>
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
                            onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>
                            {subjectNameError}
                        </label>

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
                            onFocus={handleFocus}
                        />

                        <label className={cx("user-Error")}></label>

                        <label className={cx("label")}>Chọn giảng viên</label>
                        <select
                            className={cx("selection")}
                            name="teacherID"
                            value={updateForm.teacherID || ""}
                            onChange={handleChangeSelectedUpdate}
                            onFocus={handleFocus}
                            required
                        >
                            <option value="">Chọn giảng viên</option>
                            {teacherList.map((teacher, index) => (
                                <option key={index} value={teacher.teacherID}>
                                    {teacher.teacherName}
                                </option>
                            ))}
                        </select>
                        <label className={cx("user-Error")}></label>

                        <label className={cx("label")}>Chọn ngành</label>
                        <select
                            className={cx("selection")}
                            name="majorID"
                            value={updateForm.majorID || ""}
                            onChange={handleChangeSelectedMajorUpdate}
                            onFocus={handleFocus}
                            required
                        >
                            {majorList.map((major, index) => (
                                <option key={index} value={major.majorID}>
                                    {major.majorName}
                                </option>
                            ))}
                        </select>

                        <label className={cx("user-Error")}></label>

                        <label className={cx("label")}>Trạng thái</label>
                        <select
                            className={cx("selection")}
                            name="subjectStatus"
                            value={updateForm.subjectStatus || ""}
                            onChange={handleChangeSelectedUpdateSubjectStatus}
                            onFocus={handleFocus}
                            required
                        >
                            <option value={"OPEN"}>Mở đăng ký</option>
                            <option value={"CLOSE"}>Đóng đăng ký</option>
                        </select>

                        <div className={cx("btn")}>
                            <button type="submit" className={cx("btn-add")}>
                                Sửa
                            </button>
                            <button
                                className={cx("btn-cancel")}
                                onClick={handleCloseModalUpdate}
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
                            Bạn có chắc chắn xóa học phần{" "}
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
