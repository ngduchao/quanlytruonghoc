import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import logo from "../../../assets/images/logo.jpg";
import Button from "../../../components/Button/Button";
import Menu from "../../../components/Popper/Menu/Menu";
import config from "../../../config";
import Storage from "../../../storage/Storages";
import userApi from "../../../services/api/userApi";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: "Ngôn ngữ",
        to: "/change-language",
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: "Phản hồi và trợ giúp",
        to: config.routes.feedback,
    },
];

function Header() {
    const currentUser = Storage.getUserInfo().username;

    const [profile, setProfile] = useState({});

    useEffect(() => {
        const getProfile = async () => {
            const data = await userApi.getProfile();
            // console.log("abs");
            setProfile(data);
        };
        if (currentUser !== null || currentUser !== undefined) {
            getProfile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const role = profile.role;

    const handleCurrentUser = () => {
        Storage.removeToken();
        Storage.removeUserInfo();
        window.location.reload();
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: "Trang cá nhân",
            to: config.routes.profile,
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignIn} />,
            title: "Đăng xuất",
            to: config.routes.home,
            onclick: handleCurrentUser,
        },
    ];

    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Link className={cx("logo")} to={config.routes.home}>
                    <img src={logo} alt="EduHub" className={cx("img")} />
                </Link>

                <div className={cx("generic")}>
                    <NavLink
                        className={(nav) => cx("btn", { active: nav.isActive })}
                        to={config.routes.home}
                    >
                        TRANG CHỦ
                    </NavLink>

                    <NavLink
                        className={(nav) => cx("btn", { active: nav.isActive })}
                        to={config.routes.contactUs}
                    >
                        LIÊN HỆ CHÚNG TÔI
                    </NavLink>
                    <NavLink
                        className={(nav) => cx("btn", { active: nav.isActive })}
                        to={config.routes.servicePage}
                    >
                        DỊCH VỤ
                    </NavLink>
                    <NavLink
                        className={(nav) => cx("btn", { active: nav.isActive })}
                        to={config.routes.documentPage}
                    >
                        TÀI LIỆU
                    </NavLink>
                    <NavLink
                        className={(nav) => cx("btn", { active: nav.isActive })}
                        to={config.routes.support}
                    >
                        HỖ TRỢ
                    </NavLink>
                    {role === undefined ? (
                        <div></div>
                    ) : role === "ADMIN" ? (
                        <NavLink
                            className={cx("btn")}
                            to={config.routes.managerFaculty}
                        >
                            QUẢN LÝ
                        </NavLink>
                    ) : (
                        <span>
                            <NavLink
                                className={cx("btn")}
                                to={config.routes.studyResult}
                            >
                                KQ HỌC TẬP
                            </NavLink>

                            <NavLink
                                className={cx("btn")}
                                to={config.routes.registrationSubject}
                            >
                                ĐĂNG KÝ MÔN
                            </NavLink>
                        </span>
                    )}
                </div>

                <div className={cx("action")}>
                    {currentUser !== null ? (
                        <>
                            <div className={cx("current-user")}></div>
                        </>
                    ) : (
                        <>
                            <Button primary>
                                <Link
                                    style={{ color: "white" }}
                                    to={config.routes.login}
                                >
                                    Đăng nhập
                                </Link>
                            </Button>
                        </>
                    )}

                    <Menu items={profile !== null ? userMenu : MENU_ITEMS}>
                        {profile ? (
                            <div className={cx("user-name")}>
                                {profile.firstName} {profile.lastName}
                            </div>
                        ) : (
                            <button className={cx("more-btn")}>
                                <FontAwesomeIcon
                                    icon={faEllipsisVertical}
                                ></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
