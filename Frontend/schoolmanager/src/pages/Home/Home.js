import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import classNames from "classnames/bind";

import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
    const location = useLocation();

    useEffect(() => {
        document.title = "EduHub - Quản lý trường học";
    }, [location.pathname]);

    return (
        <div>
            {/* <Link to={config.routes.managerFaculty}>Manager Page</Link>
            <br />
            <Link to={config.routes.profile}>Profile Page</Link>
            <br />
            <Link to={config.routes.login}>Login Page</Link>
            <br />
            <Link to={config.routes.feedback}>Feedback Page</Link> */}

            <div className={cx("container")}>
                <h1 className={cx("title")}>EduHub</h1>

                <h2 className={cx("sub-title")}>
                    Một nền tảng giáo dục chuyên dụng cung cấp nhiều dịch vụ và
                    hỗ trợ cho trường học và giáo viên
                </h2>

                <h3 className={cx("content1")}>
                    EduHub cung cấp cho các trường học một nền tảng an toàn, bảo
                    mật để quản lý.
                </h3>
                <div className="sub-content">
                    <h3 className={cx("content2")}>
                        EduHub tập hợp các tài nguyên giáo dục tốt nhất có sẵn
                        trực tuyến vào một nền tảng có thể tìm kiếm đơn giản,
                        cho phép bạn tìm thấy những ý tưởng và tài liệu mới để
                        hỗ trợ việc giảng dạy của mình một cách nhanh chóng và
                        đơn giản.
                    </h3>
                    <h3 className={cx("content3")}>
                        Các tài nguyên mới đang được bổ sung thường xuyên để đảm
                        bảo bạn có quyền truy cập vào các tài nguyên mới nhất và
                        thậm chí bạn có thể tải lên và tạo tài nguyên của riêng
                        mình để chia sẻ với cộng đồng nếu muốn.
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Home;
