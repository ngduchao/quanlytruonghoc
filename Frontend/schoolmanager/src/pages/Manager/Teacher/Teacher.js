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
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";

import SubHeader from "../SubHeader/SubHeader";
import styles from "./Teacher.module.scss";
import {
    selectTeachers,
    selectPage,
    selectSize,
    selectTotalElement,
} from "../../../redux/selectors/teacherSelector";
import {
    addTeacherAction,
    deleteTeacherAction,
    getListTeacherAction,
    updateTeacherAction,
} from "../../../redux/actions/teacherAction";
import teacherApi from "../../../services/api/teacherApi";
import fileDownload from "js-file-download";

const cx = classNames.bind(styles);

function Teachers(props) {
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
        setSortField("teacherID");
        setSortType("asc");
    }, [refresh]);

    const [isAscendingTeacherCode, setIsAscendingTeacherCode] = useState(true);
    const [isAscendingTeacherName, setIsAscendingTeacherName] = useState(true);
    const [isAscendingBirthDay, setIsAscendingBirthDay] = useState(true);

    // Hàm xử lý khi nhấp vào tiêu đề bảng
    const handleHeaderClickTeacherCode = () => {
        setIsAscendingTeacherCode(!isAscendingTeacherCode);
        if (isAscendingTeacherCode) {
            setSortField("teacherCode");
            setSortType("desc");
        } else {
            setSortField("teacherCode");
            setSortType("asc");
        }
    };

    const handleHeaderClickTeacherName = () => {
        setIsAscendingTeacherName(!isAscendingTeacherName);
        if (isAscendingTeacherName) {
            setSortField("teacherName");
            setSortType("desc");
        } else {
            setSortField("teacherName");
            setSortType("asc");
        }
    };

    const handleHeaderClickBirthDay = () => {
        setIsAscendingBirthDay(!isAscendingBirthDay);
        if (isAscendingBirthDay) {
            setSortField("birthDay");
            setSortType("asc");
        } else {
            setSortField("birthDay");
            setSortType("desc");
        }
    };

    const getListTeachers = props.getListTeacherAction;

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

        const teachers = await teacherApi.getAllTeachers(search);
        getListTeachers(teachers.content);
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

        const getAllTeachers = async () => {
            const result = await teacherApi.getAllTeachers(
                page,
                size,
                sortField,
                sortType,
                search,
                filter
            );

            const teachers = result.content;
            const totalElements = result.totalElements;

            setTotalElements(totalElements);

            setSuccessSearch(!successSearch);
            getListTeachers(teachers);
        };

        getAllTeachers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        getListTeachers,
        refresh,
        filter,
        page,
        search,
        isAscendingBirthDay,
        isAscendingTeacherCode,
        isAscendingTeacherName,
    ]);

    //export
    const handleExport = async (e) => {
        const res = await teacherApi.exportToCSV(search, filter);
        // console.log(res);
        const blob = new Blob(["\uFEFF" + res], {
            type: "text/csv;charset=utf-8;",
        });
        fileDownload(blob, "DSGiangVien.csv");
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const isValidTeacherCode = (teacherCode) => {
        return teacherCode.length >= 6 && teacherCode.length <= 20;
    };

    const isValidPhoneNumber = (phoneNumber) => {
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return vnf_regex.test(phoneNumber);
    };

    const isValidBirthDay = (birthDay) => {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Chuyển đổi cả hai ngày về đầu ngày để so sánh
        let birthDayDate = new Date(birthDay);
        birthDayDate.setHours(0, 0, 0, 0);
        yesterday.setHours(0, 0, 0, 0);

        // So sánh ngày sinh với ngày hôm qua
        if (birthDayDate.getTime() > yesterday.getTime()) {
            return 0; // Ngày sinh là ngày hôm qua
        } else {
            return 1; // Ngày sinh không phải là ngày hôm qua
        }
    };

    //Validate
    const [teacherCodeError, setTeacherCodeError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [birthDayError, setBirthDayError] = useState("");

    const handleFocus = () => {
        setTeacherCodeError("");
        setEmailError("");
        setPhoneNumberError("");
        setBirthDayError("");
    };

    const [addForm, setAddForm] = useState({
        teacherCode: "",
        teacherName: "",
        email: "",
        phoneNumber: "",
        birthDay: "",
        homeTown: "",
        specializeLevel: "",
    });

    const handleChangeSelected = (e) => {
        setAddForm({
            ...addForm,
            specializeLevel: e.target.value, // Gán giá trị của thẻ option vào addForm
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
            const teacherCode = await teacherApi.checkTeacherCodeExist(
                addForm.teacherCode.trim()
            );
            if (!isValidTeacherCode(addForm.teacherCode.trim())) {
                setTeacherCodeError(
                    "Mã giáo viên không hợp lệ! (từ 6 đến 20 kí tự)"
                );
                isValid = false;
            } else if (teacherCode) {
                setTeacherCodeError("Mã giáo viên đã tồn tại!");
                isValid = false;
            }

            const email = await teacherApi.checkEmailExist(
                addForm.email.trim()
            );
            if (!isValidEmail(addForm.email.trim())) {
                // Kiểm tra tính hợp lệ của email
                setEmailError("Email không hợp lệ!");
                isValid = false;
            } else if (email) {
                setEmailError("Email đã tồn tại!");
                isValid = false;
            }

            const phoneNumber = await teacherApi.checkPhoneNumberExist(
                addForm.phoneNumber.trim()
            );
            if (!isValidPhoneNumber(addForm.phoneNumber.trim())) {
                // Kiểm tra tính hợp lệ của sdt
                setPhoneNumberError("Số điện thoại không hợp lệ!");
                isValid = false;
            } else if (phoneNumber) {
                setPhoneNumberError("Số điện thoại đã tồn tại!");
                isValid = false;
            }

            if (isValidBirthDay(addForm.birthDay) === 0) {
                setBirthDayError("Ngày sinh không hợp lệ!");
                isValid = false;
            }

            if (isValid) {
                const data = await teacherApi.createTeacher(addForm);
                props.addTeacherAction(data);

                setAddForm({
                    teacherCode: "",
                    teacherName: "",
                    email: "",
                    phoneNumber: "",
                    birthDay: "",
                    homeTown: "",
                    specializeLevel: "",
                });
                setShowAddForm(!showAddForm);
                notify("Thêm mới thành công");

                handleFocus();
            }
        } catch (error) {
            console.error("Error creating data: ", error);

            if (error.status === 500) {
                notify("Thêm mới bại!");
            }
        }
    };

    const handleCloseModalAdd = () => {
        setShowAddForm(!showAddForm);
        setAddForm({
            teacherCode: "",
            teacherName: "",
            email: "",
            phoneNumber: "",
            birthDay: "",
            homeTown: "",
            specializeLevel: "",
        });
        handleFocus();
    };

    const [updateForm, setUpdateForm] = useState({
        teacherCode: "",
        teacherName: "",
        email: "",
        phoneNumber: "",
        birthDay: "",
        homeTown: "",
        specializeLevel: "",
        teacherID: "",
    });

    const [checkUpdateForm, setCheckUpdateForm] = useState({
        teacherCode: "",
        teacherName: "",
        email: "",
        phoneNumber: "",
        birthDay: "",
        homeTown: "",
        specializeLevel: "",
        teacherID: "",
    });

    const handleChangeSelectedUpdate = (e) => {
        setUpdateForm({
            ...updateForm,
            specializeLevel: e.target.value, // Gán giá trị của thẻ option vào addForm
        });
    };

    const handleChange = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "specializeLevel") {
            handleChangeSelected(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowUpdateModel = (
        teacherCode,
        teacherName,
        email,
        phoneNumber,
        birthDay,
        homeTown,
        specializeLevel,
        teacherID
    ) => {
        setUpdateForm({
            teacherCode,
            teacherName,
            email,
            phoneNumber,
            birthDay,
            homeTown,
            specializeLevel,
            teacherID,
        });
        setCheckUpdateForm({
            teacherCode,
            teacherName,
            email,
            phoneNumber,
            birthDay,
            homeTown,
            specializeLevel,
            teacherID,
        });
        setShowUpdateForm(!showUpdateForm);
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        let isValid = true;
        try {
            const teacherCode = await teacherApi.checkTeacherCodeExist(
                updateForm.teacherCode.trim()
            );
            if (!isValidTeacherCode(updateForm.teacherCode.trim())) {
                setTeacherCodeError(
                    "Mã giáo viên không hợp lệ! (từ 6 đến 20 kí tự)"
                );
                isValid = false;
            } else if (
                teacherCode &&
                updateForm.teacherCode !== checkUpdateForm.teacherCode
            ) {
                setTeacherCodeError("Mã giáo viên đã tồn tại!");
                isValid = false;
            }

            const email = await teacherApi.checkEmailExist(
                updateForm.email.trim()
            );
            if (!isValidEmail(updateForm.email.trim())) {
                // Kiểm tra tính hợp lệ của email
                setEmailError("Email không hợp lệ!");
                isValid = false;
            } else if (email && checkUpdateForm.email !== updateForm.email) {
                setEmailError("Email đã tồn tại!");
                isValid = false;
            }

            const phoneNumber = await teacherApi.checkPhoneNumberExist(
                updateForm.phoneNumber.trim()
            );
            if (!isValidPhoneNumber(updateForm.phoneNumber.trim())) {
                // Kiểm tra tính hợp lệ của sdt
                setPhoneNumberError("Số điện thoại không hợp lệ!");
                isValid = false;
            } else if (
                phoneNumber &&
                checkUpdateForm.phoneNumber !== updateForm.phoneNumber
            ) {
                setPhoneNumberError("Số điện thoại đã tồn tại!");
                isValid = false;
            }

            if (isValidBirthDay(updateForm.birthDay) === 0) {
                setBirthDayError("Ngày sinh không hợp lệ!");
                isValid = false;
            }

            if (isValid) {
                const data = await teacherApi.updateTeacher(updateForm);
                props.updateTeacherAction(data);

                setUpdateForm({
                    teacherCode: "",
                    teacherName: "",
                    email: "",
                    phoneNumber: "",
                    birthDay: "",
                    homeTown: "",
                    specializeLevel: "",
                    teacherID: "",
                });
                setShowUpdateForm(!showUpdateForm);
                notify("Cập nhật thành công");

                handleFocus();
            }
        } catch (error) {
            console.error("Error updating data: ", error);

            if (error.status === 500) {
                notify("Cập nhật mới bại!");
            }
        }
    };

    const handleCloseModalUpdate = () => {
        setShowUpdateForm(!showUpdateForm);
        setUpdateForm({
            teacherCode: "",
            teacherName: "",
            email: "",
            phoneNumber: "",
            birthDay: "",
            homeTown: "",
            specializeLevel: "",
            teacherID: "",
        });
        handleFocus();
    };

    const [teacherDelete, setTeacherDelete] = useState({
        teacherName: "",
        teacherID: "",
    });

    const [idDelete, setIdDelete] = useState(0);

    const handleDelete = (teacherName, teacherID) => {
        setTeacherDelete({ teacherName: teacherName, teacherID: teacherID });
        setShowDeleteForm(!showDeleteForm);
    };

    const handleShowDeleteModel = (teacherName, teacherID) => {
        handleDelete(teacherName, teacherID);
        setIdDelete(teacherID);
        setShowDeleteForm(!showDeleteForm);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await teacherApi.deleteTeacher(idDelete);

            props.deleteTeacherAction(data);

            setShowDeleteForm(!showDeleteForm);
            notify("Xóa thành công");
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
    };

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
                    <h4>QUẢN LÝ GIÁO VIÊN</h4>

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
                                name="specializeLevel"
                                value={filter}
                                onChange={handleChangeFilter}
                            >
                                <option value={""}>Chọn Trình Độ</option>
                                <option value={"TIENSI"}>Tiến Sĩ</option>
                                <option value={"THACSI"}>Thạc Sĩ</option>
                                <option value={"DAIHOC"}>Đại Học</option>
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
                                        onClick={handleHeaderClickTeacherCode}
                                    >
                                        <div className={cx("header-container")}>
                                            Mã Giáo Viên
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingTeacherCode ? (
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
                                        onClick={handleHeaderClickTeacherName}
                                    >
                                        <div className={cx("header-container")}>
                                            Tên Giáo Viên
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingTeacherName ? (
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
                                    <th>Email</th>
                                    <th>Số Điện Thoại</th>
                                    <th
                                        className={cx("subject-code-header")}
                                        onClick={handleHeaderClickBirthDay}
                                    >
                                        <div className={cx("header-container")}>
                                            Ngày Sinh
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingBirthDay ? (
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
                                    <th>Quê Quán</th>
                                    <th>Trình Độ</th>
                                    <th className={cx("action-row")}>
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.teachers.length > 0 ? (
                                    props.teachers.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.teacherCode}</td>
                                            <td>{item.teacherName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{formatDate(item.birthDay)}</td>
                                            <td>{item.homeTown}</td>
                                            <td>
                                                {item.specializeLevel !== null
                                                    ? item.specializeLevel ===
                                                      "TIENSI"
                                                        ? "Tiến Sĩ"
                                                        : item.specializeLevel ===
                                                          "THACSI"
                                                        ? "Thạc Sĩ"
                                                        : "Đại Học"
                                                    : "null"}
                                            </td>

                                            <td>
                                                <button
                                                    className={cx("btn-update")}
                                                    onClick={() =>
                                                        handleShowUpdateModel(
                                                            item.teacherCode,
                                                            item.teacherName,
                                                            item.email,
                                                            item.phoneNumber,
                                                            item.birthDay,
                                                            item.homeTown,
                                                            item.specializeLevel,
                                                            item.teacherID
                                                        )
                                                    }
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className={cx("btn-delete")}
                                                    onClick={() =>
                                                        handleShowDeleteModel(
                                                            item.teacherName,
                                                            item.teacherID
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
                                        <td colSpan="11">Chưa có giáo viên</td>
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
                    <h3>THÊM MỚI GIÁO VIÊN</h3>
                    <form className={cx("form")} onSubmit={handleSubmitCreate}>
                        <label className={cx("label")}>Mã giáo viên</label>
                        <input
                            type="text"
                            placeholder="Nhập mã giáo viên"
                            className={cx("input-text")}
                            name="teacherCode"
                            value={addForm.teacherCode}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {teacherCodeError}
                        </label>

                        <label className={cx("label")}>Tên giáo viên</label>
                        <input
                            type="text"
                            placeholder="Nhập tên giáo viên"
                            className={cx("input-text")}
                            name="teacherName"
                            value={addForm.teacherName}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}></label>

                        <label className={cx("label")}>Email</label>
                        <input
                            type="text"
                            placeholder="Nhập email"
                            className={cx("input-text")}
                            name="email"
                            value={addForm.email}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>{emailError}</label>

                        <label className={cx("label")}>Số điện thoại</label>
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            className={cx("input-text")}
                            name="phoneNumber"
                            value={addForm.phoneNumber}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {phoneNumberError}
                        </label>

                        <label className={cx("label")}>Ngày sinh</label>
                        <input
                            type="date"
                            placeholder="Nhập ngày sinh"
                            data-date-format="DD MMMM YYYY"
                            className={cx("input-text")}
                            name="birthDay"
                            value={addForm.birthDay}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />

                        <label className={cx("user-Error")}>
                            {birthDayError}
                        </label>

                        <label className={cx("label")}>Quê quán</label>
                        <input
                            type="text"
                            placeholder="Nhập quê quán"
                            className={cx("input-text")}
                            name="homeTown"
                            value={addForm.homeTown}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}></label>

                        <label className={cx("label")}>Trình độ</label>
                        <select
                            className={cx("selection")}
                            name="specializeLevel"
                            value={addForm.specializeLevel || ""}
                            onChange={handleChangeSelected}
                            onFocus={handleFocus}
                            required
                        >
                            <option value={""}>Chọn Trình Độ</option>
                            <option value={"TIENSI"}>Tiến Sĩ</option>
                            <option value={"THACSI"}>Thạc Sĩ</option>
                            <option value={"DAIHOC"}>Đại Học</option>
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
                    <h3>CẬP NHẬT THÔNG TIN GIÁO VIÊN</h3>
                    <form className={cx("form")} onSubmit={handleSubmitUpdate}>
                        <label htmlFor="teacherCode" className={cx("label")}>
                            Mã giáo viên
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập mã giáo viên"
                            className={cx("input-text")}
                            name="teacherCode"
                            value={updateForm.teacherCode}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>
                            {teacherCodeError}
                        </label>

                        <label htmlFor="teacherName" className={cx("label")}>
                            Tên giáo viên
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập tên giáo viên"
                            className={cx("input-text")}
                            name="teacherName"
                            value={updateForm.teacherName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}></label>

                        <label htmlFor="email" className={cx("label")}>
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập email"
                            className={cx("input-text")}
                            name="email"
                            value={updateForm.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>{emailError}</label>

                        <label htmlFor="phoneNumber" className={cx("label")}>
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            className={cx("input-text")}
                            name="phoneNumber"
                            value={updateForm.phoneNumber}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}>
                            {phoneNumberError}
                        </label>

                        <label htmlFor="birthDay" className={cx("label")}>
                            Ngày sinh
                        </label>
                        <input
                            type="date"
                            placeholder="Nhập ngày sinh"
                            data-date-format="DD MMMM YYYY"
                            className={cx("input-text")}
                            name="birthDay"
                            value={updateForm.birthDay}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />

                        <label className={cx("user-Error")}>
                            {birthDayError}
                        </label>

                        <label htmlFor="homeTown" className={cx("label")}>
                            Quê quán
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập quê quán"
                            className={cx("input-text")}
                            name="homeTown"
                            value={updateForm.homeTown}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        <label className={cx("user-Error")}></label>

                        <label
                            htmlFor="specializeLevel"
                            className={cx("label")}
                        >
                            Trình độ
                        </label>
                        <select
                            className={cx("selection")}
                            name="specializeLevel"
                            value={updateForm.specializeLevel || ""}
                            onChange={handleChangeSelectedUpdate}
                            onFocus={handleFocus}
                        >
                            <option value={""}>Chọn Trình Độ</option>
                            <option value={"TIENSI"}>Tiến Sĩ</option>
                            <option value={"THACSI"}>Thạc Sĩ</option>
                            <option value={"DAIHOC"}>Đại Học</option>
                        </select>

                        <div className={cx("btn")}>
                            <button className={cx("btn-add")}>Sửa</button>
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
                        <h3>XÁC NHẬN</h3>
                        <p>
                            Bạn có chắc chắn xóa giáo viên{" "}
                            {teacherDelete.teacherName}
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

// export default Teachers;

const mapGlobalStateToProps = (state) => {
    // console.log(state);
    return {
        teachers: selectTeachers(state.Teacher.teachers),
        page: selectPage(state.Teacher.page),
        size: selectSize(state.Teacher.size),
        totalElements: selectTotalElement(state.Teacher.totalElements),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListTeacherAction: bindActionCreators(
            getListTeacherAction,
            dispatch
        ),
        updateTeacherAction: bindActionCreators(updateTeacherAction, dispatch),
        deleteTeacherAction: bindActionCreators(deleteTeacherAction, dispatch),
        addTeacherAction: bindActionCreators(addTeacherAction, dispatch),
    };
};

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Teachers);
