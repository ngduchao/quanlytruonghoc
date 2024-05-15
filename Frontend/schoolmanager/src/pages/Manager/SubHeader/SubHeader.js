import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import classNames from "classnames/bind";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./SubHeader.module.scss";
import Menu from "../../../components/Popper/Menu/Menu";
import config from "../../../config";
import Storage from "../../../storage/Storages";
import userApi from "../../../services/api/userApi";

const cx = classNames.bind(styles);

function SubHeader() {
    // const currentUser = useState(Storage.getUserInfo().username);
    const [profile, setProfile] = useState({});
    useEffect(() => {
        const getProfile = async () => {
            const data = await userApi.getProfile();
            // console.log(data);
            setProfile(data);
        };
        getProfile();
    }, []);

    let navigate = useNavigate();

    const handleCurrentUser = () => {
        Storage.removeToken();
        Storage.removeUserInfo();
        navigate("/");
    };

    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: "Trang cá nhân",
            to: config.routes.profile,
        },
        {
            icon: <FontAwesomeIcon icon={faSignIn} />,
            title: "Đăng xuất",
            to: config.routes.home,
            onclick: handleCurrentUser,
        },
    ];

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <p className={cx("title")}>TRANG QUẢN LÝ</p>

                <div className={cx("action")}>
                    <Menu items={MENU_ITEMS}>
                        <button className={cx("more-btn")}>
                            <span className={cx("name")}>
                                {profile.firstName} {profile.lastName}
                            </span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={cx("icon")}
                            ></FontAwesomeIcon>
                        </button>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default SubHeader;
