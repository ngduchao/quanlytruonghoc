import classNames from "classnames/bind";
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
import { useCallback, useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";

import styles from "./Major.module.scss";
import SubHeader from "../SubHeader/SubHeader";
import majorApi from "../../../services/api/majorApi";
import {
    addMajorAction,
    deleteMajorAction,
    getListMajorAction,
    updateMajorAction,
} from "../../../redux/actions/majorAction";
import {
    selectMajors,
    selectPage,
    selectTotalElement,
    selectSize,
} from "../../../redux/selectors/majorSelector";
import facultyApi from "../../../services/api/facultyApi";
import fileDownload from "js-file-download";

const cx = classNames.bind(styles);

function Major(props) {
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
        setSortField("majorName");
        setSortType("asc");
    }, [refresh]);

    const [isAscendingMajorCode, setIsAscendingMajorCode] = useState(true);
    const [isAscendingMajorName, setIsAscendingMajorName] = useState(true);

    // Hàm xử lý khi nhấp vào tiêu đề bảng
    const handleHeaderClickMajorCode = () => {
        setIsAscendingMajorCode(!isAscendingMajorCode);
        if (isAscendingMajorCode) {
            setSortField("majorCode");
            setSortType("desc");
        } else {
            setSortField("majorCode");
            setSortType("asc");
        }
    };

    const handleHeaderClickMajorName = () => {
        setIsAscendingMajorName(!isAscendingMajorName);
        if (isAscendingMajorName) {
            setSortField("majorName");
            setSortType("desc");
        } else {
            setSortField("majorName");
            setSortType("asc");
        }
    };

    const getListMajors = props.getListMajorAction;

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

        const majors = await majorApi.getAllMajors(search);
        getListMajors(majors.content);
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
            setSortField("majorID");
            setSortType("asc");
        }
        setSortField(sortField);
        setSortType(sortType);
    };

    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        handleSetSort(sortField, sortType);

        const getAllMajors = async () => {
            const result = await majorApi.getAllMajors(
                page,
                size,
                sortField,
                sortType,
                search,
                filter
            );

            const majors = result.content;
            const totalElements = result.totalElements;

            setTotalElements(totalElements);
            setSuccessSearch(!successSearch);
            getListMajors(majors);
        };

        getAllMajors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        getListMajors,
        refresh,
        page,
        search,
        filter,
        isAscendingMajorName,
        isAscendingMajorCode,
    ]);

    //export
    const handleExport = async (e) => {
        const res = await majorApi.exportToCSV(search, filter);
        // console.log(res);
        const blob = new Blob(["\uFEFF" + res], {
            type: "text/csv;charset=utf-8;",
        });
        fileDownload(blob, "DSNganh.csv");
    };

    const isValidMajorCode = (majorCode) => {
        return majorCode.length >= 4 && majorCode.length <= 30;
    };

    const isValidMajorName = (majorName) => {
        return majorName.length >= 6 && majorName.length <= 100;
    };

    const [majorCodeError, setMajorCodeError] = useState("");
    const [majorNameError, setMajorNameError] = useState("");

    const handleFocus = () => {
        setMajorCodeError("");
        setMajorNameError("");
    };

    const [addForm, setAddForm] = useState({
        majorCode: "",
        majorName: "",
        facultyID: "",
    });

    const handleChangeSelected = (e) => {
        setAddForm({
            ...addForm,
            facultyID: e.target.value, // Gán giá trị của thẻ option vào addForm
        });
    };

    const handleAddChange = (e) => {
        setAddForm({
            ...addForm,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "facultyID") {
            handleChangeSelected(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowAddModel = () => {
        setShowAddForm(!showAddForm);
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        let isValid = true;
        try {
            const majorCode = await majorApi.checkMajorCodeExist(
                addForm.majorCode.trim()
            );

            const majorName = await majorApi.checkMajorNameExist(
                addForm.majorName.trim()
            );

            if (!isValidMajorCode(addForm.majorCode.trim())) {
                setMajorCodeError("Mã ngành không hợp lệ! (từ 4 đến 30 kí tự)");
                isValid = false;
            }
            if (majorCode) {
                setMajorCodeError("Mã ngành đã tồn tại!");
                isValid = false;
            }

            if (!isValidMajorName(addForm.majorName.trim())) {
                setMajorNameError(
                    "Tên ngành không hợp lệ! (từ 6 đến 100 kí tự)"
                );
                isValid = false;
            }
            if (majorName) {
                setMajorNameError("Tên ngành đã tồn tại!");
                isValid = false;
            }

            if (isValid) {
                const data = await majorApi.createMajor(addForm);
                props.addMajorAction(data);

                setAddForm({ majorCode: "", majorName: "", facultyID: "" });
                setShowAddForm(!showAddForm);
                notify("Thêm mới thành công");

                handleFocus();
            }
        } catch (error) {
            console.error("Error creating data: ", error);

            if (error.status === 500) {
                notify("Thêm mới thất bại!");
            }
        }
    };

    const handleCloseModalAdd = () => {
        setShowAddForm(!showAddForm);
        setAddForm({ majorCode: "", majorName: "", facultyID: "" });
        handleFocus();
    };

    const [updateForm, setUpdateForm] = useState({
        majorCode: "",
        majorName: "",
        facultyID: "",
        majorID: "",
    });

    const [checkUpdateForm, setCheckUpdateForm] = useState({
        majorCode: "",
        majorName: "",
        facultyID: "",
        majorID: "",
    });

    const handleChangeSelectedUpdate = (e) => {
        setUpdateForm({
            ...updateForm,
            facultyID: e.target.value, // Gán giá trị của thẻ option vào updateForm
        });
    };

    const handleChange = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "facultyID") {
            handleChangeSelectedUpdate(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowUpdateModel = (
        majorCode,
        majorName,
        facultyID,
        majorID
    ) => {
        setUpdateForm({
            majorCode,
            majorName,
            facultyID,
            majorID,
        });
        setCheckUpdateForm({
            majorCode,
            majorName,
            facultyID,
            majorID,
        });
        setShowUpdateForm(!showUpdateForm);
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        let isValid = true;
        try {
            const majorCode = await majorApi.checkMajorCodeExist(
                updateForm.majorCode.trim()
            );

            const majorName = await majorApi.checkMajorNameExist(
                updateForm.majorName.trim()
            );

            if (checkUpdateForm.majorCode !== updateForm.majorCode) {
                if (!isValidMajorCode(updateForm.majorCode.trim())) {
                    setMajorCodeError(
                        "Mã ngành không hợp lệ! (từ 4 đến 30 kí tự)"
                    );
                    isValid = false;
                }
                if (
                    majorCode &&
                    checkUpdateForm.majorCode !== updateForm.majorCode
                ) {
                    setMajorCodeError("Mã ngành đã tồn tại!");
                    isValid = false;
                }
            }

            if (checkUpdateForm.majorName !== updateForm.majorName) {
                if (!isValidMajorName(updateForm.majorName.trim())) {
                    setMajorNameError(
                        "Tên ngành không hợp lệ! (từ 6 đến 100 kí tự)"
                    );
                    isValid = false;
                }
                if (
                    majorName &&
                    checkUpdateForm.majorName !== updateForm.majorName
                ) {
                    setMajorNameError("Tên ngành đã tồn tại!");
                    isValid = false;
                }
            }

            if (isValid) {
                const data = await majorApi.updateMajor(updateForm);
                props.updateMajorAction(data);

                setUpdateForm({
                    majorCode: "",
                    majorName: "",
                    facultyID: "",
                    majorID: "",
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
        }
    };

    const [majorDelete, setMajorDelete] = useState({
        majorName: "",
        majorID: "",
    });

    const [idDelete, setIdDelete] = useState(0);

    const handleDelete = (majorName, majorID) => {
        setMajorDelete({ majorName: majorName, majorID: majorID });
        setShowDeleteForm(!showDeleteForm);
    };

    const handleShowDeleteModel = (majorName, majorID) => {
        handleDelete(majorName, majorID);
        setIdDelete(majorID);
        setShowDeleteForm(!showDeleteForm);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await majorApi.deleteMajor(idDelete);

            props.deleteMajorAction(data);

            setShowDeleteForm(!showDeleteForm);
            notify("Xóa thành công");
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
    };

    const [facultyList, setFacultyList] = useState([]);

    useEffect(() => {
        const getAllFaculties = async () => {
            const faculties = await facultyApi.getAllFaculties();
            // console.log(typeof faculties);
            setFacultyList(faculties.content);
        };
        getAllFaculties();
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
                    <h4>QUẢN LÝ NGÀNH</h4>

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
                                name="facultyName"
                                value={filter}
                                onChange={handleChangeFilter}
                            >
                                <option value={""}>Chọn Khoa</option>
                                {facultyList.map((faculty, index) => (
                                    <option
                                        key={index}
                                        value={faculty.facultyName}
                                    >
                                        {faculty.facultyName}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleExport}
                                className={cx("btn-export")}
                            >
                                <span>
                                    <FontAwesomeIcon icon={faFileExport} />
                                </span>
                                Export to CSV
                            </button>
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
                                        onClick={handleHeaderClickMajorCode}
                                    >
                                        <div className={cx("header-container")}>
                                            Mã Ngành
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingMajorCode ? (
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
                                        onClick={handleHeaderClickMajorName}
                                    >
                                        <div className={cx("header-container")}>
                                            Tên Môn
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingMajorName ? (
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
                                    <th>Khoa</th>
                                    <th className={cx("action-row")}>
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.majors.length > 0 ? (
                                    props.majors.map((item, index) => (
                                        <tr key={index}>
                                            <td
                                                className={cx("facultyCodeRow")}
                                            >
                                                {item.majorCode}
                                            </td>
                                            <td>{item.majorName}</td>
                                            <td>
                                                {item.faculty !== null
                                                    ? item.faculty.facultyName
                                                    : "Chưa có khoa"}
                                            </td>

                                            <td className={cx("action-row")}>
                                                <button
                                                    className={cx("btn-update")}
                                                    onClick={() =>
                                                        handleShowUpdateModel(
                                                            item.majorCode,
                                                            item.majorName,
                                                            item.faculty !==
                                                                null
                                                                ? item.faculty
                                                                      .facultyID
                                                                : "",
                                                            item.majorID
                                                        )
                                                    }
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className={cx("btn-delete")}
                                                    onClick={() =>
                                                        handleShowDeleteModel(
                                                            item.majorName,
                                                            item.majorID
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
                                        <td colSpan="11">Chưa có ngành</td>
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
                    <h3>THÊM MỚI NGÀNH</h3>
                    <form className={cx("form")} onSubmit={handleSubmitCreate}>
                        <label className={cx("label")}>Mã ngành</label>
                        <input
                            type="text"
                            name="majorCode"
                            placeholder="Nhập mã ngành"
                            className={cx("input-text")}
                            value={addForm.majorCode}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {majorCodeError}
                        </label>

                        <label className={cx("label")}>Tên ngành</label>
                        <input
                            type="text"
                            name="majorName"
                            placeholder="Nhập tên ngành"
                            className={cx("input-text")}
                            value={addForm.majorName}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {majorNameError}
                        </label>

                        <label className={cx("label")}>Chọn khoa</label>
                        <select
                            className={cx("selection")}
                            name="facultyID"
                            value={addForm.facultyID || ""}
                            onChange={handleChangeSelected}
                            onFocus={handleFocus}
                            required
                        >
                            <option value={""}>Chọn khoa</option>
                            {facultyList.map((faculty, index) => (
                                <option key={index} value={faculty.facultyID}>
                                    {faculty.facultyName}
                                </option>
                            ))}
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
                    <h3>CẬP NHẬT THÔNG TIN NGÀNH</h3>
                    <form className={cx("form")} onSubmit={handleSubmitUpdate}>
                        <label htmlFor="majorCode" className={cx("label")}>
                            Mã ngành
                        </label>
                        <input
                            type="text"
                            name="majorCode"
                            placeholder="Nhập mã ngành"
                            className={cx("input-text")}
                            value={updateForm.majorCode}
                            onChange={handleChange}
                        />
                        <label className={cx("user-Error")}>
                            {majorCodeError}
                        </label>
                        <label htmlFor="majorName" className={cx("label")}>
                            Tên ngành
                        </label>
                        <input
                            type="text"
                            name="majorName"
                            placeholder="Nhập tên ngành"
                            className={cx("input-text")}
                            value={updateForm.majorName}
                            onChange={handleChange}
                        />
                        <label className={cx("user-Error")}>
                            {majorNameError}
                        </label>

                        <label className={cx("label")}>Chọn khoa</label>
                        <select
                            className={cx("selection")}
                            name="facultyID"
                            value={updateForm.facultyID || ""}
                            onChange={handleChangeSelectedUpdate}
                            required
                        >
                            {facultyList.map((faculty, index) => (
                                <option key={index} value={faculty.facultyID}>
                                    {faculty.facultyName}
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
                            Bạn có chắc chắn xóa ngành {majorDelete.majorName}
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

const mapGlobalStateToProps = (state) => {
    // console.log(state);
    return {
        majors: selectMajors(state.Major.majors),
        page: selectPage(state.Major.page),
        size: selectSize(state.Major.size),
        totalElements: selectTotalElement(state.Major.totalElements),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListMajorAction: bindActionCreators(getListMajorAction, dispatch),
        updateMajorAction: bindActionCreators(updateMajorAction, dispatch),
        deleteMajorAction: bindActionCreators(deleteMajorAction, dispatch),
        addMajorAction: bindActionCreators(addMajorAction, dispatch),
    };
};

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Major);
