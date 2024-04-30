import config from "../config";

//Pages
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Auth/Login/Login";
import Feedback from "../pages/Feedback/Feedback";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPasswordPage";
import {
    Admins,
    Classroom,
    Faculty,
    Major,
    Users,
    Teacher,
    Subject,
    AdminDetailClassroom,
    AdminDetailSubject,
    StudyResult,
    RegistrationSubject,
} from "../pages/Manager";
import ChangePassword from "../pages/Auth/ChangePassword/changePassword";
import Introduce from "../pages/Introduce/Introduce";
import ContactUs from "../pages/ContactUs/ContactUs";
import Service from "../pages/Service/Service";
import Document from "../pages/Document/Document";

//Layouts
import { DefaultLayout, ManagerLayout } from "../layouts";

import withAuth from "../hooks/withAuth";

export const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    {
        path: config.routes.introduce,
        component: Introduce,
        layout: DefaultLayout,
    },
    {
        path: config.routes.contactUs,
        component: ContactUs,
        layout: DefaultLayout,
    },
    {
        path: config.routes.servicePage,
        component: Service,
        layout: DefaultLayout,
    },
    {
        path: config.routes.documentPage,
        component: Document,
        layout: DefaultLayout,
    },

    { path: config.routes.login, component: Login, layout: null },
    {
        path: config.routes.forgotPassword,
        component: ForgotPassword,
        layout: null,
    },
    { path: config.routes.feedback, component: Feedback, layout: null },
];

export const privateRoutes = [
    {
        path: config.routes.profile,
        component: withAuth(Profile),
        layout: DefaultLayout,
    },
    {
        path: config.routes.managerFaculty,
        component: withAuth(Faculty),
        layout: ManagerLayout,
    },
    {
        path: config.routes.managerMajor,
        component: withAuth(Major),
        layout: ManagerLayout,
    },
    {
        path: config.routes.managerSubject,
        component: withAuth(Subject),
        layout: ManagerLayout,
    },
    {
        path: config.routes.managerClassroom,
        component: withAuth(Classroom),
        layout: ManagerLayout,
    },
    {
        path: config.routes.managerTeachers,
        component: withAuth(Teacher),
        layout: ManagerLayout,
    },
    {
        path: config.routes.managerUsers,
        component: withAuth(Users),
        layout: ManagerLayout,
    },
    {
        path: config.routes.managerAdmins,
        component: withAuth(Admins),
        layout: ManagerLayout,
    },
    {
        path: config.routes.changePassword,
        component: withAuth(ChangePassword),
        layout: null,
    },
    {
        path: config.routes.adminDetailClassRoom,
        component: withAuth(AdminDetailClassroom),
        layout: ManagerLayout,
    },
    {
        path: config.routes.adminDetailSubject,
        component: withAuth(AdminDetailSubject),
        layout: ManagerLayout,
    },
    {
        path: config.routes.studyResult,
        component: withAuth(StudyResult),
        layout: DefaultLayout,
    },
    {
        path: config.routes.registrationSubject,
        component: withAuth(RegistrationSubject),
        layout: DefaultLayout,
    },
];
