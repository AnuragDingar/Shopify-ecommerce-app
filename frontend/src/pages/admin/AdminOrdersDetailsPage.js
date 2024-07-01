import OrderDetailsPageComponent from './components/OrderDetailsPageComponent';
import axios from "axios";

const fetchOrders = async (id) => {
    const { data } = await axios.get("/api/orders/user/" + id);
    console.log("data", data)
    return data;
}

const markAsDelivered = async (id) => {
    const { data } = await axios.put("/api/orders/delivered/" + id);
    if (data) {
        return data;
    }
}

const AdminOrdersDetailsPage = () => {

    return <OrderDetailsPageComponent
        fetchOrders={fetchOrders}
        markAsDelivered={markAsDelivered} />
};

export default AdminOrdersDetailsPage;
