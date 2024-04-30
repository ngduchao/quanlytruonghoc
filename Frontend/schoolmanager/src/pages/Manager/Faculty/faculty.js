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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";

import styles from "./Faculty.module.scss";
import SubHeader from "../SubHeader/SubHeader";
import {
    selectFaculties,
    selectPage,
    selectSize,
    selectTotalElement,
} from "../../../redux/selectors/facultySelector";
import {
    addFacultyAction,
    deleteFacultyAction,
    getListFacultyAction,
    updateFacultyAction,
} from "../../../redux/actions/facultyAction";
import facultyApi from "../../../services/api/facultyApi";

const cx = classNames.bind(styles);

function Faculty(props) {
    const notify = (values) => {
        toast(values);
    };

    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const handleRefresh = useCallback(() => {
        setRefresh(!refresh);
        setPage(1);
        setSearch("");
        setSortField("facultyID");
        setSortType("asc");
    }, [refresh]);

    const [isAscendingFacultyCode, setIsAscendingFacultyCode] = useState(true);
    const [isAscendingFacultyName, setIsAscendingFacultyName] = useState(true);

    // Hàm xử lý khi nhấp vào tiêu đề bảng
    const handleHeaderClickFacultyCode = () => {
        setIsAscendingFacultyCode(!isAscendingFacultyCode);
        if (isAscendingFacultyCode) {
            setSortField("facultyCode");
            setSortType("desc");
        } else {
            setSortField("facultyCode");
            setSortType("asc");
        }
    };

    const handleHeaderClickFacultyName = () => {
        setIsAscendingFacultyName(!isAscendingFacultyName);
        if (isAscendingFacultyName) {
            setSortField("facultyName");
            setSortType("desc");
        } else {
            setSortField("facultyName");
            setSortType("asc");
        }
    };

    const getListFaculties = props.getListFacultyAction;

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

        const faculties = await facultyApi.getAllFaculties(search);
        getListFaculties(faculties);
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
            setSortField("facultyID");
            setSortType("asc");
        }
        setSortField(sortField);
        setSortType(sortType);
    };

    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        handleSetSort(sortField, sortType);
        const getAllFaculties = async () => {
            const result = await facultyApi.getAllFaculties(
                page,
                size,
                sortField,
                sortType,
                search
            );
            const faculties = result.content;
            const totalElements = result.totalElements;

            setTotalElements(totalElements);
            setSuccessSearch(!successSearch);
            getListFaculties(faculties, page, totalElements);
        };

        getAllFaculties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        getListFaculties,
        refresh,
        page,
        search,
        isAscendingFacultyCode,
        isAscendingFacultyName,
    ]);

    const isValidFacultyCode = (facultyCode) => {
        return facultyCode.length >= 6 && facultyCode.length <= 30;
    };

    const isValidFacultyName = (facultyName) => {
        return facultyName.length >= 6 && facultyName.length <= 100;
    };

    const [facultyCodeError, setFacultyCodeError] = useState("");
    const [facultyNameError, setFacultyNameError] = useState("");

    const handleFocus = () => {
        setFacultyCodeError("");
        setFacultyNameError("");
    };

    const [addForm, setAddForm] = useState({
        facultyCode: "",
        facultyName: "",
    });

    const handleAddChange = (e) => {
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
            const facultyCode = await facultyApi.checkFacultyCodeExist(
                addForm.facultyCode.trim()
            );
            const facultyName = await facultyApi.checkFacultyNameExist(
                addForm.facultyName.trim()
            );
            if (!isValidFacultyCode(addForm.facultyCode.trim())) {
                setFacultyCodeError(
                    "Mã khoa không hợp lệ! (từ 6 đến 30 kí tự)"
                );
                isValid = false;
            }
            if (facultyCode) {
                setFacultyCodeError("Mã khoa đã tồn tại!");
                isValid = false;
            }

            if (!isValidFacultyName(addForm.facultyName.trim())) {
                setFacultyNameError(
                    "Tên khoa không hợp lệ! (từ 6 đến 100 kí tự)"
                );
                isValid = false;
            }
            if (facultyName) {
                setFacultyNameError("Tên khoa đã tồn tại!");
                isValid = false;
            }

            if (isValid) {
                const data = await facultyApi.createFaculty(addForm);
                props.addFacultyAction(data);

                setAddForm({
                    facultyCode: "",
                    facultyName: "",
                });
                setShowAddForm(!showAddForm);
                notify("Thêm mới thành công!");

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
        setAddForm({
            facultyCode: "",
            facultyName: "",
        });
        handleFocus();
    };

    const [updateForm, setUpdateForm] = useState({
        facultyCode: "",
        facultyName: "",
        facultyID: "",
    });

    const [checkUpdateForm, setCheckUpdateForm] = useState({
        facultyCode: "",
        facultyName: "",
        facultyID: "",
    });

    const handleShowUpdateModel = (facultyCode, facultyName, facultyID) => {
        setUpdateForm({
            facultyCode,
            facultyName,
            facultyID,
        });
        setCheckUpdateForm({
            facultyCode,
            facultyName,
            facultyID,
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
        let isValid = true;
        try {
            const facultyCode = await facultyApi.checkFacultyCodeExist(
                updateForm.facultyCode.trim()
            );
            const facultyName = await facultyApi.checkFacultyNameExist(
                updateForm.facultyName.trim()
            );
            if (checkUpdateForm.facultyCode !== updateForm.facultyCode) {
                if (!isValidFacultyCode(updateForm.facultyCode.trim())) {
                    setFacultyCodeError(
                        "Mã khoa không hợp lệ! (từ 6 đến 30 kí tự)"
                    );
                    isValid = false;
                }
                if (facultyCode) {
                    setFacultyCodeError("Mã khoa đã tồn tại!");
                    isValid = false;
                }
            }

            if (checkUpdateForm.facultyName !== updateForm.facultyName) {
                if (!isValidFacultyName(updateForm.facultyName.trim())) {
                    setFacultyNameError(
                        "Tên khoa không hợp lệ! (từ 6 đến 100 kí tự)"
                    );
                    isValid = false;
                }
                if (facultyName) {
                    setFacultyNameError("Tên khoa đã tồn tại!");
                    isValid = false;
                }
            }

            if (isValid) {
                const data = await facultyApi.updateFaculty(updateForm);
                props.updateFacultyAction(data);

                setUpdateForm({
                    facultyCode: "",
                    facultyName: "",
                    facultyID: "",
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

    const handleCloseModalUpdate = () => {
        setShowUpdateForm(!showUpdateForm);
        setUpdateForm({
            facultyCode: "",
            facultyName: "",
            facultyID: "",
        });
        handleFocus();
    };

    const [facultyDelete, setFacultyDelete] = useState({
        facultyName: "",
        facultyID: "",
    });

    const [idDelete, setIdDelete] = useState(0);

    const handleDelete = (facultyName, facultyID) => {
        setFacultyDelete({ facultyName: facultyName, facultyID: facultyID });
        try {
            setShowDeleteForm(!showDeleteForm);
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
    };

    const handleShowDeleteModel = (facultyName, facultyID) => {
        // console.log(facultyID);
        handleDelete(facultyName, facultyID);
        setIdDelete(facultyID);
        setShowDeleteForm(!showDeleteForm);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await facultyApi.deleteFaculty(idDelete);
            props.deleteFacultyAction(data);
            // console.log(idDelete);
            setShowDeleteForm(!showDeleteForm);
            notify("Xóa thành công");
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
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
                    <h4>QUẢN LÝ KHOA</h4>

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
                                        onClick={handleHeaderClickFacultyCode}
                                    >
                                        <div className={cx("header-container")}>
                                            Mã Khoa
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingFacultyCode ? (
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
                                        onClick={handleHeaderClickFacultyName}
                                    >
                                        <div className={cx("header-container")}>
                                            Tên Khoa
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingFacultyName ? (
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
                                    <th className={cx("action-row")}>
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.faculties.length > 0 ? (
                                    props.faculties.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.facultyCode}</td>
                                            <td>{item.facultyName}</td>

                                            <td>
                                                <button
                                                    className={cx("btn-update")}
                                                    onClick={() =>
                                                        handleShowUpdateModel(
                                                            item.facultyCode,
                                                            item.facultyName,
                                                            item.facultyID
                                                        )
                                                    }
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className={cx("btn-delete")}
                                                    onClick={() =>
                                                        handleShowDeleteModel(
                                                            item.facultyName,
                                                            item.facultyID
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
                                        <td colSpan="11">Chưa có khoa</td>
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
                    <h3>THÊM MỚI KHOA</h3>
                    <form className={cx("form")} onSubmit={handleSubmitCreate}>
                        <label className={cx("label")}>Mã khoa</label>
                        <input
                            type="text"
                            name="facultyCode"
                            placeholder="Nhập mã khoa"
                            className={cx("input-text")}
                            value={addForm.facultyCode}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {facultyCodeError}
                        </label>
                        <label className={cx("label")}>Tên khoa</label>
                        <input
                            type="text"
                            name="facultyName"
                            placeholder="Nhập tên khoa"
                            className={cx("input-text")}
                            value={addForm.facultyName}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {facultyNameError}
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
                    <h3>CẬP NHẬT KHOA</h3>
                    <form className={cx("form")} onSubmit={handleSubmitUpdate}>
                        <label htmlFor="facultyCode" className={cx("label")}>
                            Mã khoa
                        </label>
                        <input
                            type="text"
                            name="facultyCode"
                            placeholder="Nhập mã khoa"
                            className={cx("input-text")}
                            value={updateForm.facultyCode}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>
                            {facultyCodeError}
                        </label>
                        <label htmlFor="facultyName" className={cx("label")}>
                            Tên khoa
                        </label>
                        <input
                            type="text"
                            name="facultyName"
                            placeholder="Nhập tên khoa"
                            className={cx("input-text")}
                            value={updateForm.facultyName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>
                            {facultyNameError}
                        </label>

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
                            Bạn có chắc chắn xóa {facultyDelete.facultyName}
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
            {/* {!showAddForm && !showUpdateForm && !showDeleteForm && (
                <div>
                    <Modal
                        isOpen={modal}
                        modalTransition={{ timeout: 500 }}
                        backdropTransition={{ timeout: 100 }}
                        toggle={toggle}
                        className={className}
                    >
                        <ModalHeader toggle={toggle}>
                            {messageModal.header}
                        </ModalHeader>
                        <ModalBody>{messageModal.body}</ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>
                                Đóng
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )} */}
        </div>
    );
}

// export default Faculty;

const mapGlobalStateToProps = (state) => {
    // console.log(state);
    return {
        faculties: selectFaculties(state.Faculty.faculties),
        page: selectPage(state.Faculty.page),
        size: selectSize(state.Faculty.size),
        totalElements: selectTotalElement(state.Faculty.totalElements),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListFacultyAction: bindActionCreators(
            getListFacultyAction,
            dispatch
        ),
        updateFacultyAction: bindActionCreators(updateFacultyAction, dispatch),
        deleteFacultyAction: bindActionCreators(deleteFacultyAction, dispatch),
        addFacultyAction: bindActionCreators(addFacultyAction, dispatch),
    };
};

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Faculty);
