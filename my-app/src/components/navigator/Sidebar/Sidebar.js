import React, { useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";




const Sidebar = () => {
    const close_canvas=useRef(null)
    const handle_click = () => {
            close_canvas.current.click() 
        
            }
    return (
        <div style={{ textAlign: 'right' }}>
            <button style={{ color: 'black', borderColor: 'transparent', backgroundColor: 'transparent' }} className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel">תפריט</h5>
                    <button ref={close_canvas} type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <Link onClick={handle_click} className="link" to="/" >עמוד בית</Link>
                    <br></br><Link onClick={handle_click} className="link" to="/aboutus"  >עלינו</Link>
                    <br></br><Link onClick={handle_click} className="link" to="/tracking" >מעקב משלוחים</Link>
                    <br></br><Link onClick={handle_click} className="link" to="/faq" >שאלות תשובות</Link>
                    <br></br><Link onClick={handle_click} className="link" to="/contact" >צור קשר</Link>
                </div>
            </div>





        </div>
    )
}

export default Sidebar