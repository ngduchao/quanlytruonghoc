import classNames from "classnames/bind";

import Button from "../../Button/Button";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    return (
        <Button
            className={cx("items")}
            leftIcon={data.icon}
            to={data.to}
            // onClick={onClick}
            onClick={data.onclick}
        >
            {data.title}
        </Button>
    );
}

export default MenuItem;
