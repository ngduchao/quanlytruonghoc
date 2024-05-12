import classNames from "classnames/bind";

import styles from "./Manager.module.scss";
import Sidebar from "../components/Sidebar/Sidebar";

const cx = classNames.bind(styles);

function ManagerLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Sidebar />
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default ManagerLayout;
