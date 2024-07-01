import UsersPageComponent from "./components/UserPageComponent";
import axios from "axios";


const fetchUsers = async(abctrl) => {
    const signal = abctrl && abctrl.signal ? abctrl.signal : "";
    const {data} = await axios.get("/api/users", {
        signal
    });
    return data;
    //console.log("users", users)
}

const deleteUser = async(userId) => {
    const {data} = await axios.delete(`/api/users/${userId}`);
    return data;
    //console.log("users", users)
}

const AdminUsersPage = () => {
    // here code is divided and moved to below component so that component can be fully /testable.
    return <UsersPageComponent 
    fetchUsers={fetchUsers}
    deleteUser={deleteUser}
    />;
};

export default AdminUsersPage;
