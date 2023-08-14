import { Outlet, Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Cart from "./Cart/Cart";
import './NavBar.css'
import Footer from "../Home/Footer";
const NavBar = () => {
  const location = useLocation()
  // console.log(location)
  return (
    <>

      <nav className="navigator">
        <div className="cart">
          <Cart></Cart>
        </div>

        <div className="link_box">
          <Link className={`link ${location.pathname === '/' && 'active_link'}`} to="/" >עמוד בית</Link>
          <Link className={`link ${location.pathname === '/aboutus' && 'active_link'}`} to="/aboutus" >עלינו</Link>
          <Link className={`link ${location.pathname === '/tracking' && 'active_link'}`} to="/tracking" >מעקב משלוחים</Link>
          <Link className={`link ${location.pathname === '/faq' && 'active_link'}`} to="/faq" >שאלות תשובות</Link>
          <Link className={`link ${location.pathname === '/contact' && 'active_link'}`} to="/contact" >צור קשר</Link>
          <Link className={`link ${location.pathname === '/admin' && 'active_link'}`} to="/admin" >ADMIN</Link>
        </div>
        <h1 className="logo">PRIME</h1>
        <div className="sidebar">
          <Sidebar ></Sidebar>
        </div>
      </nav>
      <div style={{ width: "100%", margin: "auto" }}>
        <div style={{ height: "80px" }}></div>
        <Outlet />
      </div>
      {/* <Footer></Footer> */}
    </>
  );
};

export default NavBar;
