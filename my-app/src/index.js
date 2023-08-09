import ReactDOM from "react-dom/client";
// import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navigator/NavBar";
import Home from "./components/Home/Home";
import Aboutus from "./components/aboutus/Aboutus";
import Faq from "./components/faq/Faq";
import Tracking from "./components/tracking/Tracking";
import ContactUs from "./components/contactus/ContactUs";
import './index.css'
import { Provider } from "react-redux";
import { store } from "./app/store"
import Checkout from "./components/checkout/Checkout";
import Completion from "./components/checkout/stripe/Completion";
import Admin from "./components/admin_control/Admin";
import AddProduct from "./components/admin_control/addProduct/AddProduct";
import AdminWelcome from "./components/admin_control/AdminWelcome";
import AllOrders from "./components/admin_control/orders/AllOrders";
import AwaitingShipment from "./components/admin_control/orders/AwaitingShipment";
import ProductManage from "./components/admin_control/productManager/ProuctManage";

export default function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <html dir="rtl" > */}
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/completion" element={<Completion />} />
          <Route path="/admin" element={<AdminWelcome />} >
            <Route index element={<Admin />}/>
            <Route path="/admin/allorders" element={<AllOrders />} />
            <Route path="/admin/awaitingshipment" element={<AwaitingShipment />} />
            <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/productmanager" element={<ProductManage />} />
          </Route>
          </Route>

        </Routes>
        {/* </html> */}
      </Provider>
    </BrowserRouter >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
