import classNames from "classnames/bind";
import {
    faServer,
    faBook,
    faPeopleRoof,
    faUsers,
    faUserTie,
    faUserGraduate,
    faList,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "./Sidebar.module.scss";
import Menu from "./Menu";
import { MenuItem } from "./Menu";
import config from "../../../config";
import logo from "../../../assets/images/logo.jpg";

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx("wrapper")}>
            <Link className={cx("logo")} to={config.routes.home}>
                <img src={logo} alt="EduHub" />
            </Link>

            <div className={cx("container")}>
                <Menu>
                    <MenuItem
                        title="QUẢN LÝ KHOA"
                        to={config.routes.managerFaculty}
                        icon={faServer}
                    />
                    <MenuItem
                        title="QUẢN LÝ NGÀNH"
                        to={config.routes.managerMajor}
                        icon={faBook}
                    />
                    <MenuItem
                        title="QUẢN LÝ MÔN HỌC"
                        to={config.routes.managerSubject}
                        icon={faList}
                    />
                    <MenuItem
                        title="QUẢN LÝ LỚP"
                        to={config.routes.managerClassroom}
                        icon={faPeopleRoof}
                    />
                    <MenuItem
                        title="QUẢN LÝ GIÁO VIÊN"
                        to={config.routes.managerTeachers}
                        icon={faUserGraduate}
                    />
                    <MenuItem
                        title="QUẢN LÝ HỌC SINH"
                        to={config.routes.managerUsers}
                        icon={faUsers}
                    />
                    <MenuItem
                        title="QUẢN LÝ ADMIN"
                        to={config.routes.managerAdmins}
                        icon={faUserTie}
                    />
                </Menu>
            </div>
        </aside>
    );
}

export default Sidebar;
