import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon }) {
    return (
        <NavLink
            className={(nav) => cx("menu-item", { active: nav.isActive })}
            to={to}
        >
            <FontAwesomeIcon icon={icon} className={cx("icons")} />
            <span className={cx("title")}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
