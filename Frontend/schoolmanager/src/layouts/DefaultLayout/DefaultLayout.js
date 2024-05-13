import classNames from "classnames/bind";

import styles from "./DefaultLayout.module.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <Header />
            </div>
            <div className={cx("container")}>
                <div className={cx("content")}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
