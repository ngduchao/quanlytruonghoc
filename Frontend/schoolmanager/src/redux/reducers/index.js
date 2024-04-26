import { combineReducers } from "redux";

import loginInfor from "./loginReducer";
import User from "./userReducer";
import Faculty from "./facultyReducer";
import Major from "./majorReducer";
import Teacher from "./teacherReducer";
import Classroom from "./classroomReducer";
import Subject from "./subjectReducer";

export default combineReducers({
    loginInfor,
    User,
    Faculty,
    Major,
    Teacher,
    Classroom,
    Subject,
});
