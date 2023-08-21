import { Outlet, Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Cart from "./Cart/Cart";
import './NavBar.css'
import Footer from "../Home/Footer";
import { useSelector } from "react-redux";
import { selectStatus } from "../../slicers/productsSlice";
const NavBar = () => {
  const location = useLocation()
  const status = useSelector(selectStatus)
  console.log(status)
  return (
    <>
      {/* THIS DIV IS RESPONSIBLE FOR ACITVATING SPINNER WHEN SITE LOADING */}
      <div
        style={{
          display: status === 'loading' ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',  // semi-transparent white
          zIndex: 999   // overlay z-index
        }}>

        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000  // spinner z-index
          }}>

          <div style={{ height: '15rem', width: '15rem' }} className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      </div>



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
