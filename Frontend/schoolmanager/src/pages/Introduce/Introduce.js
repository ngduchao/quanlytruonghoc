import { useEffect } from "react";
import { useLocation } from "react-router";

function Introduce() {
    const location = useLocation();

    useEffect(() => {
        document.title = "Giới thiệu - EduHub";
    }, [location.pathname]);
    return <h2>Introduce Page</h2>;
}

export default Introduce;
