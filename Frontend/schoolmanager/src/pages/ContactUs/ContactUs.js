import { useEffect } from "react";
import { useLocation } from "react-router";
import classNames from "classnames/bind";

import styles from "./ContactUs.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ContactUs() {
    const location = useLocation();

    useEffect(() => {
        document.title = "Liên hệ chúng tôi - EduHub";
    }, [location.pathname]);

    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("title")}>LIÊN HỆ CHÚNG TÔI</h2>
            <div className={cx("container")}>
                <h3 className={cx("content1")}>
                    Bạn đang cần một trang web để quản lý trường học của bạn?
                    Hãy liên hệ ngay cho chúng tôi để được tư vấn, sử dụng dịch
                    vụ và đáp ứng nhu cầu của bạn.
                </h3>

                <div className={cx("content2")}>
                    <div className={cx("call")}>
                        <span>
                            <FontAwesomeIcon icon={faPhone} />
                        </span>
                        <h1>Gọi cho chúng tôi</h1>
                        <h3>(+84) 396 180 331</h3>
                    </div>
                    <div className={cx("email")}>
                        <span>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <h1>Email</h1>
                        <h3>duchao0202@gmail.com</h3>
                    </div>
                    <div className={cx("location")}>
                        <span>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </span>
                        <h1>Địa chỉ</h1>
                        <h3>Số 298 đường Cầu Diễn, quận Bắc Từ Liêm, Hà Nội</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
