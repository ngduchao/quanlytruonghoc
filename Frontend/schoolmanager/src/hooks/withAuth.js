import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Storage from "../storage/Storages";

function withAuth(AuthenticatedComponent) {
    return function HOC(props) {
        const navigate = useNavigate();

        const isAuthenticated = () => {
            return (
                Storage.getToken() !== null && Storage.getToken() !== undefined
            );
        };

        useEffect(() => {
            if (!isAuthenticated()) {
                navigate("/login");
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return isAuthenticated() ? <AuthenticatedComponent {...props} /> : null;
    };
}

export default withAuth;
