import OrdersPageComponent from "./components/OrdersPageComponent";
import axios from "axios";

const fetchOrders = async (abctrl) => {
    const signal = abctrl && abctrl.signal ? abctrl.signal : "";
    const { data } = await axios.get("/api/orders/admin", {
        signal
    });
    return data;
    //console.log("users", users)
}

/* const deleteOrders = async (orderId) => {
    const { data } = await axios.delete(`/api/products/admin/${productId}`);
    return data;
} */

const AdminOrdersPage = () => {
    return <OrdersPageComponent
    fetchOrders={fetchOrders} />

};

export default AdminOrdersPage;
