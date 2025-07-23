import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";
import { useState, useEffect } from "react";
import LoginPage from "../pages/LoginPage";
import axios from "axios";

const ProtectedRoutesComponent = ({ admin }) => {
    /* if (admin) {
        let adminAuth = true;
        return adminAuth ? <Outlet /> : <Navigate to="/login" />;
    }
    else {
        let userAuth = true;
        return userAuth ? <><UserChatComponent /><Outlet /></> : <Navigate to="/login" />;
    } */

    const [isAuth, setIsAuth] = useState();

    useEffect(() => {
        console.log("isAuth useEffect", isAuth);
        if (isAuth === undefined) {
            axios.get("/api/get-token").then(function (data) {
                console.log("data", data);
                if (data.data.token) {
                    setIsAuth(data.data.token);
                }
                return isAuth;
            })
        }
    }, [isAuth]);

    if (isAuth === undefined) {
        console.log("isAuth === undefined", isAuth);
        return <LoginPage />;
    }

    return isAuth && admin && isAuth !== "admin" ? (
        <>{console.log("login1", isAuth, admin)}
        <Navigate to="/login" /></>
    ) : isAuth && admin ? (
        <Outlet />
    ) : isAuth && !admin ? (
        <>
            <UserChatComponent />
            <Outlet />
        </>
    ) : (
        <>{console.log("login2", isAuth, admin)}
        <Navigate to="/login" /></>
    )
};

export default ProtectedRoutesComponent;

//outlet redirects app to link which is selected. (from router sub links)