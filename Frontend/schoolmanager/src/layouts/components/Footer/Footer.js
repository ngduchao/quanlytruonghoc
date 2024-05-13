import classNames from "classnames/bind";

import styles from "./Footer.module.scss";
import logo from "../../../assets/images/logo-footer.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faGithub,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div>
                    <img
                        src={logo}
                        alt="EduHub"
                        className={cx("logo")}
                        title="EduHub"
                    />
                </div>
                <div className={cx("content")}>
                    <p>&copy; Copyright 2024</p>
                    <p>Designed and Developed by Nguyen Duc Hao</p>
                </div>

                <div className={cx("social-link")}>
                    <Link
                        to={"https://www.facebook.com/ngduchao"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span
                            className={cx("btn-social-facebook")}
                            title="Facebook"
                        >
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className={cx("icon")}
                            />
                        </span>
                    </Link>
                    <Link
                        to={"https://www.instagram.com/ngduchao.__/"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span
                            className={cx("btn-social-instagram")}
                            title="Instagram"
                        >
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className={cx("icon")}
                            />
                        </span>
                    </Link>
                    <Link
                        to={"https://github.com/ngduchao"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span
                            className={cx("btn-social-github")}
                            title="Github"
                        >
                            <FontAwesomeIcon
                                icon={faGithub}
                                className={cx("icon")}
                            />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;
