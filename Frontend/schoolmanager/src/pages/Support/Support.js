import { useEffect } from "react";
import { useLocation } from "react-router";

function Support() {
    const location = useLocation();

    useEffect(() => {
        document.title = "Giới thiệu - EduHub";
    }, [location.pathname]);
    return <h2>Support Page</h2>;
}

export default Support;
