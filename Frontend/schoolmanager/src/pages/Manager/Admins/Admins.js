import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
    faMagnifyingGlass,
    faPlus,
    faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";

import {
    addUserAction,
    deleteUserAction,
    getListUserAction,
    updateUserAction,
} from "../../../redux/actions/userAction";
import SubHeader from "../SubHeader/SubHeader";
import styles from "./Admins.module.scss";
import {
    selectUsers,
    selectPage,
    selectSize,
    selectTotalElement,
} from "../../../redux/selectors/userSelector";
import userApi from "../../../services/api/userApi";

const cx = classNames.bind(styles);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy"); // Định dạng ngày tháng thành dd-MM-yyyy
};

function Admins(props) {
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
        setSortField("userID");
        setSortType("asc");

        const url = new URL(window.location);
        url.searchParams.delete("search");
        window.history.replaceState({}, "", url.toString());
    }, [refresh]);

    const getListAdmin = props.getListUserAction;

    // const url = new URL(window.location).searchParams.get("search");
    const url = useMemo(
        () => new URL(window.location).searchParams.get("search"),
        []
    );

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

    const role = "ADMIN";

    // const handleSuccessSearch = async () => {
    //     const url = new URL(window.location);
    //     url.searchParams.set("search", search); // Thêm hoặc thay đổi giá trị của biến "search" trong URL
    //     window.history.replaceState({}, "", url.toString()); // Cập nhật URL mà không tải lại trang

    //     const admins = await userApi.getAllUsers(
    //         page,
    //         size,
    //         sortField,
    //         sortType,
    //         role,
    //         search
    //     );
    //     getListAdmin(admins.content);
    // };

    // const size = props.size;
    const size = useMemo(() => props.size, [props.size]);
    const [page, setPage] = useState(1);

    const [sortField, setSortField] = useState("");
    const [sortType, setSortType] = useState("");

    const handleSuccessSearch = useCallback(async () => {
        const url = new URL(window.location);
        url.searchParams.set("search", search); // Thêm hoặc thay đổi giá trị của biến "search" trong URL
        window.history.replaceState({}, "", url.toString()); // Cập nhật URL mà không tải lại trang

        const admins = await userApi.getAllUsers(
            page,
            size,
            sortField,
            sortType,
            role,
            search
        );
        getListAdmin(admins.content);
    }, [getListAdmin, page, search, size, sortField, sortType]);

    const handleSetSort = useCallback((sortField, sortType) => {
        if (
            sortField === null ||
            sortField === undefined ||
            sortType === null ||
            sortType === null
        ) {
            setSortField("userID");
            setSortType("asc");
        }
        setSortField(sortField);
        setSortType(sortType);
    }, []);

    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        handleSetSort(sortField, sortType);

        const getAllAdmins = async () => {
            const result = await userApi.getAllUsers(
                page,
                size,
                sortField,
                sortType,
                role,
                search
            );

            const admins = result.content;
            const totalElements = result.totalElements;

            setTotalElements(totalElements);
            setSuccessSearch(!successSearch);
            getListAdmin(admins);
        };

        getAllAdmins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getListAdmin, page, search]);

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
        gender: "",
        role: role,
    });

    const handleChangeSelected = (e) => {
        setAddForm({
            ...addForm,
            gender: e.target.value, // Gán giá trị của thẻ option vào addForm
        });
    };

    const handleAddChange = (e) => {
        setAddForm({
            ...addForm,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "gender") {
            handleChangeSelected(e); // Cập nhật giá trị từ option
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
                setUserCodeError("Mã Admin không hợp lệ! (từ 6 đến 20 kí tự)");
            } else if (userCode) {
                setUserCodeError("Mã Admin đã tồn tại!");
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

            const data = await userApi.createAdmin(addForm);
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
                gender: "",
                role: role,
            });

            setShowAddForm(!showAddForm);
            notify("Thêm mới thành công");

            handleFocus();
        } catch (error) {
            console.error("Error creating data: ", error);
            if (error.status === 500) {
                notify("Thêm mới bại");
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
            gender: "",
            role: role,
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
        gender: "",
        userID: "",
    });

    const [checkUpdateForm, setCheckUpdateForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        birthDay: "",
        homeTown: "",
        gender: "",
        userID: "",
    });

    const handleChangeSelectedUpdate = (e) => {
        setUpdateForm({
            ...updateForm,
            gender: e.target.value, // Gán giá trị của thẻ option vào addForm
        });
    };

    const handleChange = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "gender") {
            handleChangeSelected(e); // Cập nhật giá trị từ option
        }
    };

    const handleShowUpdateModel = (
        firstName,
        lastName,
        email,
        phoneNumber,
        birthDay,
        homeTown,
        gender,
        userID
    ) => {
        setUpdateForm({
            firstName,
            lastName,
            email,
            phoneNumber,
            birthDay,
            homeTown,
            gender,
            userID,
        });

        setCheckUpdateForm({
            firstName,
            lastName,
            email,
            phoneNumber,
            birthDay,
            homeTown,
            gender,
            userID,
        });
        setShowUpdateForm(!showUpdateForm);
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        console.log(updateForm);
        try {
            const email = await userApi.checkEmailExist(
                updateForm.email.trim()
            );
            const phoneNumber = await userApi.checkPhoneNumberExist(
                updateForm.phoneNumber.trim()
            );
            if (
                checkUpdateForm.email !== updateForm.email ||
                checkUpdateForm.phoneNumber !== updateForm.phoneNumber
            ) {
                if (!isValidEmail(updateForm.email.trim())) {
                    // Kiểm tra tính hợp lệ của email
                    setEmailError("Email không hợp lệ!");
                }
                if (email && checkUpdateForm.email !== updateForm.email) {
                    setEmailError("Email đã tồn tại!");
                }
                if (!isValidPhoneNumber(updateForm.phoneNumber.trim())) {
                    // Kiểm tra tính hợp lệ của sdt
                    setPhoneNumberError("Số điện thoại không hợp lệ!");
                }
                if (
                    phoneNumber &&
                    checkUpdateForm.phoneNumber !== updateForm.phoneNumber
                ) {
                    setPhoneNumberError("Số điện thoại đã tồn tại!");
                }
                return;
            }

            if (isValidBirthDay(updateForm.birthDay) === 0) {
                setBirthDayError("Ngày sinh không hợp lệ!");
                return;
            }

            const data = await userApi.updateAdmin(updateForm);
            props.updateUserAction(data);

            setUpdateForm({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                birthDay: "",
                homeTown: "",
                gender: "",
                userID: "",
            });
            setShowUpdateForm(!showUpdateForm);
            notify("Cập nhật thành công!");

            handleFocus();
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
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            birthDay: "",
            homeTown: "",
            gender: "",
            userID: "",
        });
        handleFocus();
    };

    const [userDelete, setUserDelete] = useState({ fullName: "", id: "" });

    const [idDelete, setIdDelete] = useState(0);

    const handleDelete = (fullName, id) => {
        setUserDelete({ fullName: fullName, id: id });
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
            const data = await userApi.deleteUser(idDelete);
            props.deleteUserAction(data);
            setShowDeleteForm(!showDeleteForm);
            notify("Xóa thành công");
        } catch (error) {
            console.error("Error deleting data: ", error);
            if (error.status === 400) {
                notify("Tài khoản đang đăng nhập. Không thể xóa");
                setShowDeleteForm(!showDeleteForm);
            }
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
                    <h4>QUẢN LÝ ADMIN</h4>

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
                                    <th>Mã Admin</th>
                                    <th>Tên Admin</th>
                                    <th>Tên Tài Khoản</th>
                                    <th>Email</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Ngày Sinh</th>
                                    <th>Giới tính</th>
                                    <th>Quê Quán</th>
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
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{formatDate(item.birthDay)}</td>
                                            <td>
                                                {item.gender === "MALE"
                                                    ? "Nam"
                                                    : "Nữ"}
                                            </td>
                                            <td>{item.homeTown}</td>

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
                                                            item.gender,
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
                                        <td
                                            colSpan="11"
                                            style={{ textAlign: "center" }}
                                        >
                                            Chưa có admin
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
                    <h3>THÊM MỚI ADMIN</h3>
                    <form className={cx("form")} onSubmit={handleSubmitCreate}>
                        <label className={cx("label")}>Mã Admin</label>
                        <input
                            type="text"
                            name="userCode"
                            placeholder="Nhập mã admin"
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

                        <label className={cx("user-Error")}></label>

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

                        <label className={cx("user-Error")}></label>

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

                        <label className={cx("user-Error")}> </label>

                        <label className={cx("label")}>Giới tính</label>
                        <select
                            className={cx("selection")}
                            name="gender"
                            value={addForm.gender || ""}
                            onChange={handleChangeSelected}
                            onFocus={handleFocus}
                            required
                        >
                            <option value={""}>Chọn Giới Tính</option>
                            <option value={"MALE"}>Nam</option>
                            <option value={"FEMALE"}>Nữ</option>
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
                    <h3>CẬP NHẬT THÔNG TIN ADMIN</h3>
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

                        <label className={cx("user-Error")}></label>

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

                        <label className={cx("user-Error")}></label>

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

                        <label className={cx("user-Error")}></label>

                        <label className={cx("label")}>Giới tính</label>
                        <select
                            className={cx("selection")}
                            name="gender"
                            value={updateForm.gender || ""}
                            onChange={handleChangeSelectedUpdate}
                            onFocus={handleFocus}
                            required
                        >
                            <option value={""}>Chọn Giới Tính</option>
                            <option value={"MALE"}>Nam</option>
                            <option value={"FEMALE"}>Nữ</option>
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
                            Bạn có chắc chắn xóa Admin {userDelete.fullName}
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

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Admins);
