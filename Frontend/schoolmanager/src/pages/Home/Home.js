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

    // const handleExport = async (e) => {
    //     const res = await userApi.exportToExcel();
    //     // console.log(res);
    //     fileDownload(res, "AccountList.csv");
    //     // e.preventDefault();
    //     // try {
    //     //     await userApi.exportToExcel();
    //     //     console.log("Abc");
    //     // } catch (error) {
    //     //     console.error("Error creating data: ", error);
    //     // }
    // };

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
                        dịch vụ cho việc quản lý trường học của bạn.
                    </p>

                    <Link
                        className={cx("contact-us")}
                        to={config.routes.contactUs}
                    >
                        Liên hệ chúng tôi
                    </Link>
                </div>
            </div>

            {/* <button onClick={handleExport}>Export to Excel</button> */}

            <div className={cx("title-service")}>
                <p>CÁC DỊCH VỤ CỦA CHÚNG TÔI</p>
            </div>
            <div className={cx("services")}>
                <div className={cx("service1")}>
                    <h2>QUẢN LÝ</h2>
                    <p>
                        EduHub cung cấp cho các trường học một nền tảng an toàn,
                        bảo mật để quản lý.
                    </p>
                </div>
                <div className={cx("service2")}>
                    <h2>TÀI NGUYÊN</h2>
                    <p>
                        Tài nguyên EduHub tập hợp các tài nguyên giáo dục tốt
                        nhất có sẵn trực tuyến vào một nền tảng có thể tìm kiếm
                        đơn giản, cho phép bạn tìm thấy những ý tưởng và tài
                        liệu mới để hỗ trợ việc giảng dạy và học tập của mình
                        một cách nhanh chóng và đơn giản.
                    </p>
                </div>
                <div className={cx("service3")}>
                    <h2>HỖ TRỢ</h2>
                    <p>
                        EduHub hỗ trợ trực tiếp cộng đồng giáo dục thông qua
                        nhiều khoản giảm giá khác nhau, trên nhiều sản phẩm và
                        dịch vụ mà chúng tôi biết là quan trọng đối với bạn và
                        trường học của bạn.
                    </p>
                </div>
            </div>

            <div className={cx("sub-title1")}>
                EduHub sẵn sàng trả lời bất kỳ câu hỏi nào bạn có thể có và tiếp
                nhận những đóng góp từ bạn, cung cấp cho bạn lời khuyên và hướng
                dẫn chuyên môn trong toàn bộ quá trình.
            </div>
        </div>
    );
}

export default Home;
