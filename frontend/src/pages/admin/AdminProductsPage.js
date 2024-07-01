
//import { Link } from "react-router-dom";
import ProductPageComonent from "./components/ProductPageComponent";
import axios from "axios";

const fetchProducts = async (abctrl) => {
    const signal = abctrl && abctrl.signal ? abctrl.signal : "";
    const { data } = await axios.get("/api/products/admin", {
        signal
    });
    return data;
    //console.log("users", users)
}

const deleteProduct = async (productId) => {
    const { data } = await axios.delete(`/api/products/admin/${productId}`);
    return data;
}

const AdminProductsPage = () => {

    return <ProductPageComonent
        fetchProducts={fetchProducts}
        deleteProduct={deleteProduct} />

};

export default AdminProductsPage;
