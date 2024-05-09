import { Outlet, Link, useLocation } from "react-router-dom";
// import Sidebar from "./Sidebar/Sidebar";
import Cart from "./Cart/Cart";
import './NavBar.css'

import Footer from "../Home/Footer";
import { useSelector } from "react-redux";
import { add2wish, fetchProductsAsync, selectCategories, selectStatus, selectWish } from "../../slicers/productsSlice";
import SearchBar from "./SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { SERVER } from "../../globalVar";
import { selecCart } from "./Cart/cartSlice";
// import SearchBar from "./SearchBar/SearchBar";
const NavBar = () => {
  const location = useLocation()
  const status = useSelector(selectStatus)
  const categories = useSelector(selectCategories)
  const cart = useSelector(selecCart)
  const nav_wishlist = useSelector(selectWish)
  const [cartOpen, setcartOpen] = useState(false)
  const [searchBarDisplay, setsearchBarDisplay] = useState(true)
  const [sideBarOpen, setsideBarOpen] = useState(false)
  const [wishOpen, setwishOpen] = useState(false)
  const [searchTerm, setsearchTerm] = useState('')
  console.log(cartOpen)
  const closeCart = () => {
    setcartOpen(!cartOpen)
  }

  const dispatch = useAppDispatch()

  // this use effect was moved to here from home since i need the products earlier!
  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])


  //  UseEffect is used to close the sideBar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click occurred outside the sidebar
      const sidebarElement = document.querySelector('.sideBar');
      const iconElement = document.querySelector('.bi-list'); // Assuming this is the icon that toggles the sidebar
      if (sidebarElement && !sidebarElement.contains(event.target) && !iconElement.contains(event.target)) {
        setsideBarOpen(false);
      }
    };

    // Add event listener when the sidebar is open
    if (sideBarOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    // Clean up the event listener when the sidebar is closed or the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sideBarOpen]);

  const cartProdCounter = cart.cart.length
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
        {/* mobile cart button - in the home component theres another display of the car which works only on regular screens */}
        <div className='cartBTN' onClick={() => setcartOpen(!cartOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <div className="cartProdCounter">{cart.cart.length}       </div>
        </div>

        {/* mobile - magnifier icon to open search bar */}
        <div style={{ color: "white", padding: '5px' }} className="magnifierIcon" onClick={() => setsearchBarDisplay(!searchBarDisplay)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
        <div className={`searchBarMobile${searchBarDisplay ? "" : '2'}`} >
          <div className="closeSearchMobile" onClick={() => { setsearchBarDisplay(!searchBarDisplay); setsearchTerm(''); }}>X</div>
          <SearchBar searchTerm={searchTerm} setSearch={setsearchTerm}></SearchBar>
        </div>

        <Link className="link" style={{ color: 'white' }} to="/">Queen Store </Link>

        {/* SIDE BAR */}
        <div style={{ padding: '5px' }} onClick={() => setsideBarOpen(!sideBarOpen)}>
          <svg color="white" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg>
        </div>
        <div className={`sideBar ${sideBarOpen ? 'open' : ''}`}>
          <div className="closeSideBar" style={{display: sideBarOpen ? '' : 'none' }} onClick={() => setsideBarOpen(!sideBarOpen)}>
            X
          </div>
          {categories.map((cat) => (
            <Link className="sideBarLink" style={{ color: 'black' }} onClick={() => setsideBarOpen(!setsideBarOpen)} to={`/${cat['category']}`}>
              <div className="sideBarCategory" >
                {cat['category']}
              </div>
            </Link>
            // <Link to={`/${cat['category']}`}></Link>
          ))}
        </div>
        {/* END SIDE BAR */}

        {/* WISH LIST ICON */}
        <div onClick={() => setwishOpen(!wishOpen)} style={{ padding: '5px' }}>
          <svg color="gold" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </div>
        <div className={`wishList ${wishOpen ? 'open' : ''}`}>
          <div className="wishTitle">Wish List</div>
          <div className="closeWish" style={{display: wishOpen?'':'none'}} onClick={() => setwishOpen(!wishOpen)}>X</div>

          {nav_wishlist.map((wishProd, i) =>
            <div>
              <div onClick={() => dispatch(add2wish(wishProd))} className="removeWishProd">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </div>
              <div className='wish_one_product'>

                <div className='wish_title_amount'>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to={`/product/${wishProd.id}`} key={i}>
                    <div onClick={() => setwishOpen(!wishOpen)} className='wish_prod_title'>{wishProd.name}</div>
                  </Link>
                  <div style={{ textAlign: 'left' }}>&#8362;{wishProd.price}</div>
                </div>
                <img className='wish_cart_prod_img' src={`${SERVER}/static${wishProd.image}`} alt={wishProd.name} />
              </div>
            </div>
          )}
        </div>




        {/* <div className="link_box">
          <Link className={`link ${location.pathname === '/aboutus' && 'active_link'}`} to="/aboutus" >עלינו</Link>
          <Link className={`link ${location.pathname === '/tracking' && 'active_link'}`} to="/tracking" >מעקב משלוחים</Link>
          <Link className={`link ${location.pathname === '/faq' && 'active_link'}`} to="/faq" >שאלות תשובות</Link>
          <Link className={`link ${location.pathname === '/contact' && 'active_link'}`} to="/contact" >צור קשר</Link>
          <Link className={`link ${location.pathname === '/admin' && 'active_link'}`} to="/admin" >ADMIN</Link>
        </div> */}

        {/* 
        <div className="sidebar">
          <Sidebar ></Sidebar>
        </div>
 */}

      </nav>



      {/* <div className='forCartNav' style={{ display: cartOpen ? 'block' : 'none' }}> */}
      {/* <div className={`forCartNav${cartOpen ? 'open':''}`}> */}
      <div className={`${cartOpen ? "forCartNav" : "forCartNav2"}`}>
        <Cart closeCart={closeCart}></Cart>
        <div className="mobileCloseCart" onClick={() => setcartOpen(!cartOpen)}>X</div>
      </div>



      <div style={{ width: "100%", margin: "auto" }}>
        {/* <div style={{ height: "80px" }}></div> */}
        <Outlet />
      </div>
      {/* <Footer></Footer> */}
    </>
  );
};

export default NavBar;
