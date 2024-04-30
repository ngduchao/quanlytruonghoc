import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import thump from "../../../src/assets/images/thump.jpg";
import config from "../../config/index";

const cx = classNames.bind(styles);

function Home() {
    const location = useLocation();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title = "EduHub - Quản lý trường học";
        setTimeout(() => {
            setLoaded(true);
        }, 100);
    }, [location.pathname]);

    return (
        <div className={cx("wrapper", { active: loaded })}>
            <img src={thump} alt="" className={cx("thump")} />

            <div>
                <div className={cx("container")}>
                    <p className={cx("title1")}>Chào mừng đến với EduHub</p>
                    <p className={cx("title2")}>
                        Hãy bắt đầu hành trình của bạn ngay bây giờ
                    </p>
                    <p className={cx("title3")}>
                        Liên hệ với chúng tôi ngay hôm nay để có thể sử dụng
                        dịch vụ hoàn hảo cho việc quản lý trường học của bạn.
                    </p>

                    <Link
                        className={cx("contact-us")}
                        to={config.routes.contactUs}
                    >
                        Liên hệ chúng tôi
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
