import { useEffect } from "react";
import { useLocation } from "react-router";

function ContactUs() {
    const location = useLocation();

    useEffect(() => {
        document.title = "Liên hệ chúng tôi - EduHub";
    }, [location.pathname]);

    return <h2>Contact us Page</h2>;
}

export default ContactUs;
