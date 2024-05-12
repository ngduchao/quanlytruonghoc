import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

import styles from "./Profile.module.scss";
import config from "../../config";
import userApi from "../../services/api/userApi";

const cx = classNames.bind(styles);

function Profile(props) {
    const notify = (values) => {
        toast(values);
    };
    const [openModel, setOpenModel] = useState(true);

    const [profile, setProfile] = useState({});

    const [updateForm, setUpdateForm] = useState({});

    useEffect(() => {
        const getProfile = async () => {
            const data = await userApi.getProfile();
            // console.log("abc");
            setProfile(data);
        };
        getProfile();
    }, []);

    useEffect(() => {
        setUpdateForm(profile); // Đảm bảo rằng updateForm được cập nhật khi profile thay đổi
    }, [profile]);

    const handleOpenModel = () => {
        setOpenModel(!openModel);
        // setUpdateForm(profile);
        // console.log(profile);
        console.log(updateForm);
    };

    const handleChangeUpdateForm = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSuccessChange = async (e) => {
        e.preventDefault();
        try {
            await userApi.updateUser(updateForm);

            setProfile(updateForm);
            // console.log(data);
            setOpenModel(true);
            notify("Cập nhật thành công!");
        } catch (error) {
            console.error("Error", error);
        }
    };

    const formattedBirthDay = profile.birthDay
        ? format(new Date(profile.birthDay), "dd-MM-yyyy")
        : "";

    return (
        <div className={cx("wrapper")}>
            <Toaster />
            <div className={cx("container")}>
                <div className={cx("content")} hidden={!openModel}>
                    <h3>THÔNG TIN CÁ NHÂN</h3>
                    <hr className={cx("horizontal-line")} />
                    <div className={cx("main-content")}>
                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Họ tên</label>
                            <span className={cx("dots-mark")}>{":"}</span>
                            <span>
                                {profile.firstName} {profile.lastName}
                            </span>
                        </div>

                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Mã sinh viên</label>
                            <span className={cx("dots-mark")}>{":"}</span>
                            <span>{profile.userCode}</span>
                        </div>

                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Username</label>
                            <span className={cx("dots-mark")}>{":"}</span>
                            <span>{profile.username}</span>
                        </div>

                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Email</label>
                            <span className={cx("dots-mark")}>{":"}</span>
                            <span>{profile.email}</span>
                        </div>

                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Số điện thoại</label>
                            <span className={cx("dots-mark")}>{":"}</span>
                            <span>{profile.phoneNumber}</span>
                        </div>

                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Ngày sinh</label>
                            <span className={cx("dots-mark")}>{":"}</span>
                            <span>{formattedBirthDay}</span>
                        </div>

                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Quê quán</label>
                            <span className={cx("dots-mark")}>{":"}</span>
                            <span>{profile.homeTown}</span>
                        </div>

                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Mật khẩu</label>
                            <span className={cx("dots-mark")}>{":"}</span>
                            <Link
                                className={cx("change-password")}
                                to={config.routes.changePassword}
                            >
                                Đổi mật khẩu
                            </Link>
                        </div>
                    </div>
                    <button
                        className={cx("btn-update")}
                        onClick={handleOpenModel}
                    >
                        Cập nhật thông tin
                    </button>
                </div>

                <div className={cx("model")} hidden={openModel}>
                    <h3>THAY ĐỔI THÔNG TIN</h3>
                    <hr className={cx("horizontal-line")} />
                    <form onSubmit={handleSuccessChange}>
                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Email</label>
                            <span>{":"}</span>
                            <input
                                type="text"
                                name="email"
                                value={updateForm.email || ""}
                                onChange={handleChangeUpdateForm}
                            />
                        </div>
                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Số điện thoại</label>
                            <span>{":"}</span>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={updateForm.phoneNumber || ""}
                                onChange={handleChangeUpdateForm}
                            />
                        </div>
                        <div className={cx("sub-content")}>
                            <label className={cx("label")}>Quê quán</label>
                            <span>{":"}</span>
                            <input
                                type="text"
                                name="homeTown"
                                value={updateForm.homeTown || ""}
                                onChange={handleChangeUpdateForm}
                            />
                        </div>
                        <button type="submit" className={cx("btn")}>
                            Lưu thay đổi
                        </button>
                        <button
                            type="button"
                            className={cx("btn")}
                            onClick={handleOpenModel}
                        >
                            Hủy
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
