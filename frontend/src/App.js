import CartPage from "./pages/CartPage.js";
import HomePage from "./pages/HomePage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductDetailPage from "./pages/ProductDetailPage.js";
import ProductistPage from "./pages/ProductListPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import UserProfilePage from "./pages/user/UserProfilePage.js";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage.js";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage.js";
import UserOrderPage from "./pages/user/UserOrdersPage.js";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent.js";
import AdminUsersPage from "./pages/admin/AdminUsersPage.js"
import AdminProductsPage from "./pages/admin/AdminProductsPage.js"
import AdminChatsPage from "./pages/admin/AdminChatsPage.js"
import AdminEditProductPage from "./pages/admin/AdminEditProductPage.js"
import HeaderComponent from "./components/HeaderComponent.js";
import FooterComponent from "./components/FooterComponent.js";
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent.js";
import ScrollToTop from "./utils/scrollToTop.js";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
        <Route element={<RoutesWithUserChatComponent />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/product-details" element={<ProductDetailPage />}></Route>
          <Route path="/product-list" element={<ProductistPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>

          <Route element={<ProtectedRoutesComponent admin={false} />}>
            <Route path="/user" element={<UserProfilePage />}></Route>
            <Route path="/user/order-details" element={<UserOrderDetailsPage />}></Route>
            <Route path="/user/cart-details" element={<UserCartDetailsPage />}></Route>
            <Route path="/user/my-orders" element={<UserOrderPage />}></Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin" element={<AdminUsersPage />}></Route>
          <Route path="/admin/products" element={<AdminProductsPage />}></Route>
          <Route path="/admin/chats" element={<AdminChatsPage />}></Route>
          <Route path="/admin/edit-product" element={<AdminEditProductPage />}></Route>
        </Route>
        <Route path="*" element={"Page does not exist"}></Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;