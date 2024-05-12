import { useEffect } from "react";
import { useLocation } from "react-router";

function Document() {
    const location = useLocation();

    useEffect(() => {
        document.title = "Tài Liệu - EduHub";
    }, [location.pathname]);

    return <h2>Document Page</h2>;
}

export default Document;
