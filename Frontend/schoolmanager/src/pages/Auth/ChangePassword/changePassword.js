import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Toaster } from "react-hot-toast";

import styles from "./ChangePassword.module.scss";
import config from "../../../config";
import userApi from "../../../services/api/userApi";

const cx = classNames.bind(styles);

function ChangePassword(props) {
    console.log(props);
    const { className } = props;
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [showPassword, setShowPassword] = useState(false);
    const [check, setCheck] = useState(false);
    const [showMessageOldPassword, setShowMessageOldPassword] = useState(true);
    const [showMessageNewPassword, setShowMessageNewPassword] = useState(true);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
        setCheck(!check);
    };

    const handleChecked = () => {
        setCheck(!check);
        handleTogglePassword();
    };

    const [passwordInfo, setPasswordInfo] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleChange = (e) => {
        setPasswordInfo({
            ...passwordInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const handleFocusPassword = () => {
        setShowMessageNewPassword(true);
        setShowMessageOldPassword(true);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            if (passwordInfo.newPassword === passwordConfirm) {
                await userApi.changePassword(passwordInfo);
                setShowMessageNewPassword(true);
                setShowMessageOldPassword(true);

                setPasswordInfo({ oldPassword: "", newPassword: "" });
                setPasswordConfirm("");
                toggle();
                <Toaster />;
            } else {
                setShowMessageNewPassword(!showMessageNewPassword);
            }
        } catch (error) {
            console.error("Error ", error);
            setShowMessageOldPassword(!showMessageOldPassword);
        }
    };

    const wrapperClassName = cx("wrapper", {
        "extra-height": !showMessageOldPassword || !showMessageNewPassword,
    });

    return (
        <div className={cx("pages")}>
            <div className={wrapperClassName}>
                <div className={"container"}>
                    <header className={cx("header")}>
                        <h3 className={cx("h2")}>
                            Mời bạn nhập thông tin để đổi mật khẩu
                        </h3>
                    </header>

                    <form
                        className={cx("forgot-form")}
                        onSubmit={handleChangePassword}
                    >
                        <label htmlFor="password" className={cx("label")}>
                            Mật khẩu cũ
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="oldPassword"
                            placeholder="Nhập mật khẩu cũ"
                            className={cx("input-text")}
                            value={passwordInfo.oldPassword}
                            onChange={handleChange}
                            onFocus={handleFocusPassword}
                            required
                        />
                        <span
                            className={cx("password-error-message")}
                            hidden={showMessageOldPassword}
                        >
                            Mật khẩu không chính xác
                        </span>
                        <label htmlFor="password" className={cx("label")}>
                            Mật khẩu mới
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="Nhập mật mới"
                            className={cx("input-text")}
                            value={passwordInfo.newPassword}
                            onChange={handleChange}
                            onFocus={handleFocusPassword}
                            required
                        />

                        <label htmlFor="password" className={cx("label")}>
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmNewPassword"
                            placeholder="Xác nhận mật khẩu mới"
                            className={cx("input-text")}
                            value={passwordConfirm}
                            onChange={handleChangePasswordConfirm}
                            onFocus={handleFocusPassword}
                            required
                        />
                        <span
                            className={cx("password-error-message")}
                            hidden={showMessageNewPassword}
                        >
                            Mật khẩu mới và xác nhận phải giống nhau
                        </span>
                        <div className={cx("toggle-password")}>
                            <input
                                type="checkbox"
                                id="showPasswordCheckbox"
                                onChange={handleTogglePassword}
                                checked={check}
                            />{" "}
                            <label onClick={handleChecked}>Hiện mật khẩu</label>
                        </div>
                        <button type="submit" className={cx("btn-forgot")}>
                            Đổi mật khẩu
                        </button>
                    </form>
                    <br />
                    <Link className={cx("btn-back")} to={config.routes.profile}>
                        <span>
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                            ></FontAwesomeIcon>
                        </span>{" "}
                        Quay lại
                    </Link>

                    <div>
                        <Modal
                            isOpen={modal}
                            modalTransition={{ timeout: 500 }}
                            backdropTransition={{ timeout: 100 }}
                            toggle={toggle}
                            className={className}
                        >
                            <ModalHeader toggle={toggle}>
                                Thành công
                            </ModalHeader>
                            <ModalBody>Thay đổi mật khẩu thành công</ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle}>
                                    Đóng
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
