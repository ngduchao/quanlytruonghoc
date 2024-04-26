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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";

import SubHeader from "../SubHeader/SubHeader";
import styles from "./User.module.scss";
import {
    getListUserAction,
    updateUserAction,
    addUserAction,
    deleteUserAction,
} from "../../../redux/actions/userAction";
import userApi from "../../../services/api/userApi";
import {
    selectUsers,
    selectPage,
    selectSize,
    selectTotalElement,
} from "../../../redux/selectors/userSelector";
import classroomApi from "../../../services/api/classroomApi";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy"); // Định dạng ngày tháng thành dd-MM-yyyy
};

function Users(props) {
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
        setSortField("userID");
        setSortType("asc");
    }, [refresh]);

    const [isAscendingUserCode, setIsAscendingUserCode] = useState(true);

    // Hàm xử lý khi nhấp vào tiêu đề bảng
    const handleHeaderClickUserCode = () => {
        setIsAscendingUserCode(!isAscendingUserCode);
        if (isAscendingUserCode) {
            setSortField("userCode");
            setSortType("desc");
        } else {
            setSortField("userCode");
            setSortType("asc");
        }
    };

    const getListUser = props.getListUserAction;

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

    const role = "USER";

    const handleSuccessSearch = async () => {
        const url = new URL(window.location);
        url.searchParams.set("search", search); // Thêm hoặc thay đổi giá trị của biến "search" trong URL
        window.history.replaceState({}, "", url.toString()); // Cập nhật URL mà không tải lại trang

        const users = await userApi.getAllUsers(role, search);
        getListUser(users.content);
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

        const getAllUser = async () => {
            const result = await userApi.getAllUsers(
                page,
                size,
                sortField,
                sortType,
                role,
                search,
                filter
            );

            const users = result.content;
            const totalElements = result.totalElements;

            setTotalElements(totalElements);
            setSuccessSearch(!successSearch);
            getListUser(users);
        };

        getAllUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getListUser, refresh, page, search, filter, isAscendingUserCode]);

    const isValidEmail = (email) => {
        const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const isValidUserCode = (userCode) => {
        return userCode.length >= 6 && userCode.length <= 20;
    };

    const isValidUsername = (username) => {
        return username.length >= 6 && username.length <= 50;
    };

    const isValidPhoneNumber = (phoneNumber) => {
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return vnf_regex.test(phoneNumber);
    };

    const isValidBirthDay = (birthDay) => {
        if (new Date() < new Date(birthDay)) {
            return 0;
        } else {
            return 1;
        }
    };

    //Validate
    const [userCodeError, setUserCodeError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [birthDayError, setBirthDayError] = useState("");

    const handleFocus = () => {
        setUserCodeError("");
        setUsernameError("");
        setPasswordError("");
        setEmailError("");
        setPhoneNumberError("");
        setBirthDayError("");
    };

    const [addForm, setAddForm] = useState({
        userCode: "",
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDay: "",
        homeTown: "",
        role: role,
        classRoomID: "",
        status: "STUDYING",
    });

    const handleChangeSelectedCreate = (e) => {
        setAddForm({
            ...addForm,
            classRoomID: e.target.value, // Gán giá trị của thẻ option vào addForm
        });
    };

    const handleAddChange = (e) => {
        setAddForm({
            ...addForm,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "classRoomID") {
            handleChangeSelectedCreate(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowAddModel = () => {
        setShowAddForm(!showAddForm);
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        try {
            const userCode = await userApi.checkUserCodeExist(
                addForm.userCode.trim()
            );
            if (!isValidUserCode(addForm.userCode.trim())) {
                setUserCodeError(
                    "Mã học sinh không hợp lệ! (từ 6 đến 20 kí tự)"
                );
            } else if (userCode) {
                setUserCodeError("Mã học sinh đã tồn tại!");
            }

            const username = await userApi.checkUsernameExist(
                addForm.username.trim()
            );
            if (!isValidUsername(addForm.username.trim())) {
                setUsernameError("Tài khoản không hợp lệ! (từ 6 đến 50 kí tự)");
            } else if (username) {
                setUsernameError("Tài khoản đã tồn tại!");
            }

            if (addForm.password.length < 6) {
                setPasswordError("Mật khẩu phải hơn 6 kí tự");
            }

            const email = await userApi.checkEmailExist(addForm.email.trim());
            if (!isValidEmail(addForm.email.trim())) {
                // Kiểm tra tính hợp lệ của email
                setEmailError("Email không hợp lệ!");
            } else if (email) {
                setEmailError("Email đã tồn tại!");
            }

            const phoneNumber = await userApi.checkPhoneNumberExist(
                addForm.phoneNumber.trim()
            );
            if (!isValidPhoneNumber(addForm.phoneNumber.trim())) {
                // Kiểm tra tính hợp lệ của sdt
                setPhoneNumberError("Số điện thoại không hợp lệ!");
            } else if (phoneNumber) {
                setPhoneNumberError("Số điện thoại đã tồn tại!");
            }

            if (isValidBirthDay(addForm.birthDay) === 0) {
                setBirthDayError("Ngày sinh không hợp lệ!");
            }

            const data = await userApi.createUser(addForm);
            props.addUserAction(data);

            setAddForm({
                userCode: "",
                username: "",
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                birthDay: "",
                homeTown: "",
                role: role,
                classRoomID: "",
                status: "STUDYING",
            });
            setShowAddForm(!showAddForm);
            notify("Thêm mới thành công");

            handleFocus();
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
            userCode: "",
            username: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDay: "",
            homeTown: "",
            role: role,
            classRoomID: "",
            status: "STUDYING",
        });
        handleFocus();
    };

    const [updateForm, setUpdateForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        birthDay: "",
        homeTown: "",
        classRoomID: "",
        userID: "",
    });

    const [checkUpdateForm, setCheckUpdateForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        birthDay: "",
        homeTown: "",
        classRoomID: "",
        userID: "",
    });

    const handleChangeSelectedUpdate = (e) => {
        setUpdateForm({
            ...updateForm,
            classRoomID: e.target.value, // Gán giá trị của thẻ option vào updateForm
        });
    };

    const handleChange = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "classRoomID") {
            handleChangeSelectedUpdate(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowUpdateModel = (
        firstName,
        lastName,
        email,
        phoneNumber,
        birthDay,
        homeTown,
        classRoomID,
        userID
    ) => {
        setUpdateForm({
            firstName,
            lastName,
            email,
            phoneNumber,
            birthDay,
            homeTown,
            classRoomID,
            userID,
        });
        setCheckUpdateForm({
            firstName,
            lastName,
            email,
            phoneNumber,
            birthDay,
            homeTown,
            classRoomID,
            userID,
        });
        setShowUpdateForm(!showUpdateForm);
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            const email = await userApi.checkEmailExist(
                updateForm.email.trim()
            );
            const phoneNumber = await userApi.checkPhoneNumberExist(
                updateForm.phoneNumber.trim()
            );
            if (
                checkUpdateForm.email !== updateForm.email ||
                checkUpdateForm.phoneNumber !== updateForm.phoneNumber ||
                checkUpdateForm.birthDay !== updateForm.birthDay
            ) {
                if (!isValidEmail(updateForm.email.trim())) {
                    // Kiểm tra tính hợp lệ của email
                    setEmailError("Email không hợp lệ!");
                }
                if (email) {
                    setEmailError("Email đã tồn tại!");
                }

                if (checkUpdateForm.phoneNumber !== updateForm.phoneNumber) {
                    if (!isValidPhoneNumber(updateForm.phoneNumber.trim())) {
                        // Kiểm tra tính hợp lệ của sdt
                        setPhoneNumberError("Số điện thoại không hợp lệ!");
                    }
                    if (phoneNumber) {
                        setPhoneNumberError("Số điện thoại đã tồn tại!");
                    }
                }

                if (isValidBirthDay(checkUpdateForm.birthDay) === 0) {
                    setBirthDayError("Ngày sinh không hợp lệ!");
                }
                return;
            }

            const data = await userApi.updateUser(updateForm);
            props.updateUserAction(data);

            setUpdateForm({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                birthDay: "",
                homeTown: "",
                classRoomID: "",
                userID: "",
            });
            setShowUpdateForm(!showUpdateForm);
            notify("Cập nhật thành công");

            handleFocus();
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
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            birthDay: "",
            homeTown: "",
            classRoomID: "",
            userID: "",
        });
        handleFocus();
    };

    const [userDelete, setUserDelete] = useState({ fullName: "" });

    const [idDelete, setIdDelete] = useState(0);

    const handleDelete = (fullName, id) => {
        setUserDelete({ fullName: fullName, id: id });
        try {
            setShowDeleteForm(!showDeleteForm);
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
    };

    const handleShowDeleteModel = (fullName, id) => {
        handleDelete(fullName, id);
        setIdDelete(id);
        setShowDeleteForm(!showDeleteForm);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await userApi.deleteUser(idDelete);
            props.deleteUserAction(data);
            setShowDeleteForm(!showDeleteForm);
            notify("Xóa thành công");
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
    };

    const [classroomList, setClassroomList] = useState([]);

    useEffect(() => {
        const getAllClassrooms = async () => {
            const classrooms = await classroomApi.getAllClassrooms();

            setClassroomList(classrooms.content);
        };
        getAllClassrooms();
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
                    <h4>QUẢN LÝ HỌC SINH</h4>

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
                                name="classRoomName"
                                value={filter}
                                onChange={handleChangeFilter}
                            >
                                <option value={""}>Chọn Lớp</option>
                                {classroomList.map((classroom, index) => (
                                    <option
                                        key={index}
                                        value={classroom.classRoomName}
                                    >
                                        {classroom.classRoomName}
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
                                        onClick={handleHeaderClickUserCode}
                                    >
                                        <div className={cx("header-container")}>
                                            Mã Học Sinh
                                            <span
                                                className={cx(
                                                    "caret-container"
                                                )}
                                            >
                                                {isAscendingUserCode ? (
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
                                    <th>Tên Học Sinh</th>
                                    <th>Tên Lớp</th>
                                    <th>Tên Tài Khoản</th>
                                    <th>Email</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Ngày Sinh</th>
                                    <th>Quê Quán</th>
                                    <th>Khóa</th>
                                    <th>Trạng Thái</th>
                                    <th className={cx("action-row")}>
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.users.length > 0 ? (
                                    props.users.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.userCode}</td>
                                            <td>
                                                {item.firstName} {item.lastName}
                                            </td>
                                            <td>
                                                {item.classroom !== null
                                                    ? item.classroom
                                                          .classRoomName
                                                    : "Chưa có lớp"}
                                            </td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{formatDate(item.birthDay)}</td>
                                            <td>{item.homeTown}</td>
                                            <td>
                                                {item.classroom !== null
                                                    ? item.classroom.course
                                                    : "null"}
                                            </td>
                                            <td>
                                                {item.status !== null
                                                    ? item.status === "STUDYING"
                                                        ? "Đang học"
                                                        : "Đã nghỉ"
                                                    : "null"}
                                            </td>
                                            <td>
                                                <button
                                                    className={cx("btn-update")}
                                                    onClick={() =>
                                                        handleShowUpdateModel(
                                                            item.firstName,
                                                            item.lastName,
                                                            item.email,
                                                            item.phoneNumber,
                                                            item.birthDay,
                                                            item.homeTown,
                                                            item.classroom
                                                                .classRoomID,
                                                            item.userID
                                                        )
                                                    }
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className={cx("btn-delete")}
                                                    onClick={() =>
                                                        handleShowDeleteModel(
                                                            item.firstName +
                                                                " " +
                                                                item.lastName,
                                                            item.userID
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
                                        <td colSpan="11">Chưa có học sinh</td>
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
                    <h3>THÊM MỚI HỌC SINH</h3>
                    <form className={cx("form")} onSubmit={handleSubmitCreate}>
                        <label className={cx("label")}>Mã học sinh</label>
                        <input
                            name="userCode"
                            type="text"
                            placeholder="Nhập mã học sinh"
                            className={cx("input-text")}
                            value={addForm.userCode}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {userCodeError}
                        </label>

                        <label className={cx("label")}>Tên tài khoản</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Nhập tên tài khoản"
                            className={cx("input-text")}
                            value={addForm.username}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {usernameError}
                        </label>

                        <label className={cx("label")}>Mật khẩu</label>
                        <input
                            type="text"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            className={cx("input-text")}
                            value={addForm.password}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>
                            {passwordError}
                        </label>

                        <label className={cx("label")}>Họ</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Nhập họ"
                            className={cx("input-text")}
                            value={addForm.firstName}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <span
                            className={cx("firstName-error-message")}
                            hidden
                        ></span>

                        <label className={cx("label")}>Tên</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Nhập tên"
                            className={cx("input-text")}
                            value={addForm.lastName}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <span
                            className={cx("lastName-error-message")}
                            hidden
                        ></span>

                        <label className={cx("label")}>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Nhập email"
                            className={cx("input-text")}
                            value={addForm.email}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("user-Error")}>{emailError}</label>

                        <label className={cx("label")}>Số điện thoại</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            className={cx("input-text")}
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
                            name="birthDay"
                            placeholder="Nhập ngày sinh"
                            className={cx("input-text")}
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
                            name="homeTown"
                            placeholder="Nhập quê quán"
                            className={cx("input-text")}
                            value={addForm.homeTown}
                            onChange={handleAddChange}
                            onFocus={handleFocus}
                            required
                        />

                        <label className={cx("label")}>Chọn lớp</label>
                        <select
                            className={cx("selection")}
                            name="classRoomID"
                            value={addForm.classRoomID || ""}
                            onChange={handleChangeSelectedCreate}
                            onFocus={handleFocus}
                            required
                        >
                            <option value={""}>Chọn lớp</option>
                            {classroomList.map((classroom, index) => (
                                <option
                                    key={index}
                                    value={classroom.classRoomID}
                                >
                                    {classroom.classRoomName} {" - K"}
                                    {classroom.course}
                                </option>
                            ))}
                        </select>

                        <div className={cx("btn")}>
                            <button type="submit" className={cx("btn-add")}>
                                Thêm
                            </button>
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
                    <h3>CẬP NHẬT THÔNG TIN HỌC SINH</h3>
                    <form className={cx("form")} onSubmit={handleSubmitUpdate}>
                        <label htmlFor="firstName" className={cx("label")}>
                            Họ
                        </label>

                        <input
                            name="firstName"
                            type="text"
                            placeholder="Nhập họ"
                            className={cx("input-text")}
                            value={updateForm.firstName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />

                        <label htmlFor="lastName" className={cx("label")}>
                            Tên
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Nhập tên"
                            className={cx("input-text")}
                            value={updateForm.lastName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />

                        <label htmlFor="email" className={cx("label")}>
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Nhập email"
                            className={cx("input-text")}
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
                            name="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            className={cx("input-text")}
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
                            name="birthDay"
                            data-date-format="DD MMMM YYYY"
                            placeholder="Nhập ngày sinh"
                            className={cx("input-text")}
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
                            name="homeTown"
                            placeholder="Nhập quê quán"
                            className={cx("input-text")}
                            value={updateForm.homeTown}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />

                        <label className={cx("label")}>Chọn lớp</label>
                        <select
                            className={cx("selection")}
                            name="classRoomID"
                            value={updateForm.classRoomID || ""}
                            onChange={handleChangeSelectedUpdate}
                            onFocus={handleFocus}
                            required
                        >
                            <option value="">Chọn lớp</option>
                            {classroomList.map((classroom, index) => (
                                <option
                                    key={index}
                                    value={classroom.classRoomID}
                                >
                                    {classroom.classRoomName}
                                </option>
                            ))}
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
                        <h3>XÁC NHẬN</h3>
                        <p>
                            Bạn có chắc chắn xóa học sinh {userDelete.fullName}
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
        users: selectUsers(state.User.users),
        page: selectPage(state.User.page),
        size: selectSize(state.User.size),
        totalElements: selectTotalElement(state.User.totalElements),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListUserAction: bindActionCreators(getListUserAction, dispatch),
        updateUserAction: bindActionCreators(updateUserAction, dispatch),
        deleteUserAction: bindActionCreators(deleteUserAction, dispatch),
        addUserAction: bindActionCreators(addUserAction, dispatch),
    };
};

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Users);
