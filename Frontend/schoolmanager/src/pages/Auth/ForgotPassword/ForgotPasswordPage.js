import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import styles from "./ForgotPassword.module.scss";
import config from "../../../config";

import userApi from "../../../services/api/userApi";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const cx = classNames.bind(styles);

function ForgotPassword(props) {
    const { className } = props;
    const [modal, setModal] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [showMessage, setShowMessage] = useState(true);

    const handleFocus = () => {
        setShowMessage(true);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const toggleAndClear = () => {
        setModal(!modal);
        setEmail({ email: "" });
    };

    const [email, setEmail] = useState({ email: "" });

    const handleChange = (e) => {
        setEmail({
            ...email,
            [e.target.name]: e.target.value,
        });
        // setEmailError("");
    };

    const checkEmailExists = async () => {
        return await userApi.checkEmailExist(email.email);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const emailExists = await checkEmailExists(email.email.trim());
            if (!isValidEmail(email.email.trim())) {
                // Kiểm tra tính hợp lệ của email
                setEmailError("Email không hợp lệ!");
                setShowMessage(false);
                // console.log(checkEmailExists);
                // return;
            } else if (!emailExists) {
                setEmailError("Email chưa tồn tại!");
                setShowMessage(false);
            } else {
                await userApi.resetPassword(email);
                toggle();
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div className={cx("pages")}>
            <div className={cx("wrapper")}>
                <div className={"container"}>
                    <header className={cx("header")}>
                        <h3 className={cx("h2")}>
                            Mời bạn nhập thông tin để lấy lại mật khẩu
                        </h3>
                    </header>

                    <form
                        className={cx("forgot-form")}
                        onSubmit={handleResetPassword}
                    >
                        <label htmlFor="email" className={cx("label")}>
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={email.email}
                            placeholder="Nhập email"
                            className={cx("input-text")}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                        {/* {emailError && (
                            <span className={cx("email-error-message")}>
                                {emailError}
                            </span>
                        )} */}

                        <span
                            className={cx("email-error-message")}
                            hidden={showMessage}
                        >
                            {emailError}
                        </span>
                        <br />
                        <button type="submit" className={cx("btn-forgot")}>
                            Quên mật khẩu
                        </button>
                        <br />
                        <br />
                        <div className={cx("horizontal")}>
                            <hr className={cx("horizontal-lines")}></hr>
                            <p className={cx("text-or")}>hoặc</p>
                            <hr className={cx("horizontal-lines")}></hr>
                        </div>
                        <br />
                        <div className={cx("wrapper-login-password")}>
                            <Link
                                className={cx("login-password")}
                                to={config.routes.login}
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    </form>
                    <br />
                    <br />
                    <Link className={cx("btn-back")} to={config.routes.home}>
                        <span>
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                            ></FontAwesomeIcon>
                        </span>{" "}
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
            <div>
                <Modal
                    isOpen={modal}
                    modalTransition={{ timeout: 500 }}
                    backdropTransition={{ timeout: 100 }}
                    toggle={toggle}
                    className={className}
                >
                    <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
                    <ModalBody>
                        <p className={cx("ms")}>
                            Chúng tôi đã gửi mật khẩu đến email: {email.email}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Link
                            onClick={toggle}
                            to={config.routes.login}
                            className={cx("btn-re-login")}
                        >
                            Đăng nhập
                        </Link>
                        <Button color="secondary" onClick={toggleAndClear}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}

export default ForgotPassword;
