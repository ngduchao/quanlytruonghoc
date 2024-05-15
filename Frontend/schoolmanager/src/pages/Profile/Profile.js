import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

import styles from "./Profile.module.scss";
import config from "../../config";
import userApi from "../../services/api/userApi";
import filesApi from "../../services/api/filesApi";
import avatarDefault from "../../../src/assets/images/ad.png";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const cx = classNames.bind(styles);

function Profile(props) {
    const notify = (values) => {
        toast(values);
    };

    const { className } = props;

    const [modal, setModal] = useState(false);

    const [messageEmailError, setMessageEmailError] = useState("");

    const [messagePhoneNumberError, setMessagePhoneNumberError] = useState("");

    const [openModel, setOpenModel] = useState(true);

    const [profile, setProfile] = useState({});

    const [image, setImage] = useState();

    const [previewImage, setPreviewImage] = useState();

    const [updateForm, setUpdateForm] = useState({});

    const [checkEmailUpdate, setCheckEmailUpdate] = useState("");
    const [checkPhoneNumberUpdate, setCheckPhoneNumberUpdate] = useState("");

    const toggle = () => {
        setModal(!modal);
        setPreviewImage();
    };

    useEffect(() => {
        const getProfile = async () => {
            const data = await userApi.getProfile();
            setProfile(data);
            // console.log(data);
        };
        getProfile();
    }, []);

    const isValidEmail = (email) => {
        const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return vnf_regex.test(phoneNumber);
    };

    const handleFocus = () => {
        setMessageEmailError("");
        setMessagePhoneNumberError("");
    };

    useEffect(() => {
        setUpdateForm(profile);
        setCheckEmailUpdate(profile.email);
        setCheckPhoneNumberUpdate(profile.phoneNumber);
    }, [profile]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(file);
            setPreviewImage(reader.result);
        };

        if (file && file.type.match("image.*")) {
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault();

        try {
            let updatedProfile = { ...updateForm };

            if (image) {
                const uploadResult = await filesApi.upload(image, "users");

                updatedProfile = {
                    ...updatedProfile,
                    image: uploadResult.url,
                };

                await userApi.uploadProfileImage(
                    profile.userID,
                    uploadResult.url
                );
            }

            setProfile(updatedProfile);

            toggle();

            notify("Cập nhật ảnh thành công!");
        } catch (error) {
            console.error("Error", error);
            if (error.status === 500) {
                notify("Cập nhật thông tin thất bại!");
            }
        }
    };

    const handleOpenModel = () => {
        setOpenModel(!openModel);
    };

    const handleChangeUpdateForm = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSuccessChange = async (e) => {
        e.preventDefault();
        let isValid = true;
        try {
            const email = await userApi.checkEmailExist(updateForm.email);

            const phoneNumber = await userApi.checkPhoneNumberExist(
                updateForm.phoneNumber
            );

            if (
                checkEmailUpdate !== updateForm.email ||
                checkPhoneNumberUpdate !== updateForm.phoneNumber
            ) {
                if (!isValidEmail(updateForm.email.trim())) {
                    setMessageEmailError("Email không hợp lệ!");
                    isValid = false;
                } else if (email && checkEmailUpdate !== updateForm.email) {
                    setMessageEmailError("Email đã tồn tại!");
                    isValid = false;
                }

                if (!isValidPhoneNumber(updateForm.phoneNumber.trim())) {
                    setMessagePhoneNumberError("Số điện thoại không hợp lệ!");
                    isValid = false;
                } else if (
                    phoneNumber &&
                    checkPhoneNumberUpdate !== updateForm.phoneNumber
                ) {
                    setMessagePhoneNumberError("Số điện thoại đã tồn tại!");
                    isValid = false;
                }
            }

            if (isValid) {
                await userApi.updateUser(updateForm);

                setProfile(updateForm);
                // console.log(updateForm);
                setOpenModel(true);
                notify("Cập nhật thông tin thành công!");
                handleFocus();
            }
        } catch (error) {
            console.error("Error", error);

            if (error.status === 500) {
                notify("Cập nhật thất bại!");
            }
        }
    };

    const formattedBirthDay = profile.birthDay
        ? format(new Date(profile.birthDay), "dd-MM-yyyy")
        : "";

    return (
        <div className={cx("wrapper")}>
            <Toaster />
            <div className={cx("container")}>
                <div className={cx("content")} hidden={!openModel}>
                    <h3>THÔNG TIN CÁ NHÂN</h3>
                    <hr className={cx("horizontal-line")} />
                    <div>
                        <div className={cx("image-avatar")}>
                            <img
                                src={
                                    profile.image !== null
                                        ? profile.image
                                        : avatarDefault
                                }
                                alt="avatar"
                                className={cx("avatar")}
                            />
                        </div>
                        <button
                            onClick={toggle}
                            className={cx("btn-update-image")}
                        >
                            Thay đổi ảnh
                        </button>

                        <div className={cx("main-content")}>
                            <div className={cx("sub-content")}>
                                <label className={cx("label")}>Họ tên</label>
                                <span className={cx("dots-mark")}>{":"}</span>
                                <span>
                                    {profile.firstName} {profile.lastName}
                                </span>
                            </div>

                            {profile.role === "USER" ? (
                                <div className={cx("sub-content")}>
                                    <label className={cx("label")}>
                                        Mã sinh viên
                                    </label>
                                    <span className={cx("dots-mark")}>
                                        {":"}
                                    </span>
                                    <span>{profile.userCode}</span>
                                </div>
                            ) : (
                                ""
                            )}

                            <div className={cx("sub-content")}>
                                <label className={cx("label")}>Username</label>
                                <span className={cx("dots-mark")}>{":"}</span>
                                <span>{profile.username}</span>
                            </div>

                            <div className={cx("sub-content")}>
                                <label className={cx("label")}>Email</label>
                                <span className={cx("dots-mark")}>{":"}</span>
                                <span>{profile.email}</span>
                            </div>

                            <div className={cx("sub-content")}>
                                <label className={cx("label")}>
                                    Số điện thoại
                                </label>
                                <span className={cx("dots-mark")}>{":"}</span>
                                <span>{profile.phoneNumber}</span>
                            </div>

                            <div className={cx("sub-content")}>
                                <label className={cx("label")}>Ngày sinh</label>
                                <span className={cx("dots-mark")}>{":"}</span>
                                <span>{formattedBirthDay}</span>
                            </div>

                            <div className={cx("sub-content")}>
                                <label className={cx("label")}>Quê quán</label>
                                <span className={cx("dots-mark")}>{":"}</span>
                                <span>{profile.homeTown}</span>
                            </div>

                            <div className={cx("sub-content")}>
                                <label className={cx("label")}>Mật khẩu</label>
                                <span className={cx("dots-mark")}>{":"}</span>
                                <Link
                                    className={cx("change-password")}
                                    to={config.routes.changePassword}
                                >
                                    Đổi mật khẩu
                                </Link>
                            </div>
                        </div>
                    </div>
                    <button
                        className={cx("btn-update")}
                        onClick={handleOpenModel}
                    >
                        Cập nhật thông tin
                    </button>
                </div>

                <div className={cx("model")} hidden={openModel}>
                    <h3>THAY ĐỔI THÔNG TIN</h3>
                    <hr className={cx("horizontal-line")} />
                    <form onSubmit={handleSuccessChange}>
                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Email</label>
                            <span>{":"}</span>
                            <input
                                type="text"
                                name="email"
                                value={updateForm.email || ""}
                                onChange={handleChangeUpdateForm}
                                onFocus={handleFocus}
                            />
                        </div>

                        <label className={cx("user-Error")}>
                            {messageEmailError}
                        </label>

                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Số điện thoại</label>
                            <span>{":"}</span>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={updateForm.phoneNumber || ""}
                                onChange={handleChangeUpdateForm}
                                onFocus={handleFocus}
                            />
                        </div>

                        <label className={cx("user-Error")}>
                            {messagePhoneNumberError}
                        </label>

                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Quê quán</label>
                            <span>{":"}</span>
                            <input
                                type="text"
                                name="homeTown"
                                value={updateForm.homeTown || ""}
                                onChange={handleChangeUpdateForm}
                            />
                        </div>
                        <button type="submit" className={cx("btn")}>
                            Lưu thay đổi
                        </button>
                        <button
                            type="button"
                            className={cx("btn")}
                            onClick={handleOpenModel}
                        >
                            Hủy
                        </button>
                    </form>
                </div>

                <div>
                    <Modal
                        isOpen={modal}
                        modalTransition={{ timeout: 500 }}
                        backdropTransition={{ timeout: 100 }}
                        toggle={toggle}
                        className={className}
                    >
                        <ModalHeader toggle={toggle}>
                            Vui lòng chọn ảnh
                        </ModalHeader>
                        <ModalBody>
                            <p className={cx("ms")}>
                                <input
                                    type="file"
                                    name="input-file"
                                    onChange={handleImageUpload}
                                />
                            </p>
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    style={{
                                        maxWidth: "100px",
                                        maxHeight: "100px",
                                    }}
                                />
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Link
                                onClick={handleConfirm}
                                // to={config.routes.profile}
                                className={cx("btn-re-login")}
                            >
                                Xác nhận
                            </Link>
                            <Button color="secondary" onClick={toggle}>
                                Đóng
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Profile;
