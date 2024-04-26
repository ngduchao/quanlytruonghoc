import { useEffect } from "react";
import { useLocation } from "react-router";

function Service() {
    const location = useLocation();

    useEffect(() => {
        document.title = "Dịch vụ - EduHub";
    }, [location.pathname]);

    return <h2>Service Page</h2>;
}

export default Service;
