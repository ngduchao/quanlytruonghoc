import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import styles from "./Login.module.scss";
import config from "../../../config";
import Storage from "../../../storage/Storages";
import loginApi from "../../../services/api/loginApi";
import {
    setTokenInfo,
    setUserLoginInfo,
} from "../../../redux/actions/loginAction";

const cx = classNames.bind(styles);

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [check, setCheck] = useState(false);
    const [checkRememberMe, setCheckRememberMe] = useState(
        Storage.isRememberMe()
    );

    const [showMessage, setShowMessage] = useState(true);

    const handleFocus = () => {
        setShowMessage(true);
    };

    let navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
        setCheck(!check);
    };

    const handleChecked = () => {
        setCheck(!check);
        handleTogglePassword();
    };

    const handleCheckedRememberMe = () => {
        setCheckRememberMe(!checkRememberMe);
    };

    const handleChangeLoginForm = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleShowMessage = () => {
        setShowMessage(!showMessage);
        setLoginForm({ username: "", password: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginApi.login(
                loginForm.username,
                loginForm.password
            );

            Storage.setRememberMe(checkRememberMe);

            //set token
            Storage.setToken(result.token);

            //set username && role
            Storage.setUserInfo(
                result.userDetails,
                result.userDetails.authorities[0].authority
            );

            setLoginForm({ username: "", password: "" });

            navigate("/");
        } catch (error) {
            // console.error("Error: ", error.status);
            if (error.status === 500) {
                handleShowMessage();
            }
        }
    };

    const wrapperClassName = cx("wrapper", {
        "extra-height": !showMessage,
    });

    return (
        <div className={cx("pages")}>
            <div className={wrapperClassName}>
                <div className={"container"}>
                    <header className={cx("header")}>
                        <h2 className={cx("h2")}>CHÀO MỪNG ĐẾN VỚI EDUHUB</h2>
                        <p className={cx("p")}>Mời bạn đăng nhập để tiếp tục</p>
                    </header>

                    <form
                        action=""
                        className={cx("login-form")}
                        onSubmit={handleSubmit}
                    >
                        <label className={cx("label")}>Tài khoản</label>
                        {/* <br /> */}
                        <input
                            type="text"
                            name="username"
                            placeholder="Nhập tài khoản"
                            className={cx("input-text")}
                            value={loginForm.username}
                            onChange={handleChangeLoginForm}
                            onFocus={handleFocus}
                            required
                        />
                        <label className={cx("label")}>Mật khẩu</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Nhập mật khẩu"
                            className={cx("input-text")}
                            value={loginForm.password}
                            onChange={handleChangeLoginForm}
                            onFocus={handleFocus}
                            required
                        />
                        <span
                            className={cx("password-error-message")}
                            hidden={showMessage}
                        >
                            Tài khoản hoặc mật khẩu không chính xác
                        </span>
                        <div className={cx("toggle-password")}>
                            <input
                                type="checkbox"
                                id="showPasswordCheckbox"
                                onChange={handleTogglePassword}
                                checked={check}
                                className={cx("check-box")}
                            />{" "}
                            <label onClick={handleChecked}>Hiện mật khẩu</label>
                            <input
                                type="checkbox"
                                id="isRememberMe"
                                onChange={handleCheckedRememberMe}
                                checked={checkRememberMe}
                                style={{ marginLeft: "200px" }}
                                className={cx("check-box")}
                            />
                            <label onClick={handleCheckedRememberMe}>
                                Ghi nhớ tôi
                            </label>
                        </div>

                        <br />
                        <button type="submit" className={cx("btn-login")}>
                            Đăng nhập
                        </button>
                        <br />
                        <br />
                        <div className={cx("horizontal")}>
                            <hr className={cx("horizontal-lines")}></hr>
                            <p className={cx("text-or")}>hoặc</p>
                            <hr className={cx("horizontal-lines")}></hr>
                        </div>
                        <br />
                        <div className={cx("wrapper-forgot-password")}>
                            <Link
                                className={cx("forgot-password")}
                                to={config.routes.forgotPassword}
                            >
                                Quên mật khẩu
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
        </div>
    );
}

export default connect(null, { setTokenInfo, setUserLoginInfo })(Login);
