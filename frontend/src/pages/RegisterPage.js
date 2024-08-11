import RegisterPageComponent from "./components/RegisterPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/reducer/loginReducer"


const registerUserApiRequest = async (name, lastName, email, password) => {
    const { data } = await axios.post("/api/users/register", { name, lastName, email, password });
    localStorage.removeItem("userInfo");
    sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
    if (data.success === "user created") {
        window.location.href = "/user";
    }
    return data;
};


const RegisterPage = () => {
    const dispatch = useDispatch();
    return (
        <RegisterPageComponent registerUserApiRequest={registerUserApiRequest} dispatch={dispatch} loginUser={loginUser} />
    )
};

export default RegisterPage;
