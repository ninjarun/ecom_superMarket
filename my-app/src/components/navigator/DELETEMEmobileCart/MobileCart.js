// import { useDispatch, useSelector } from 'react-redux'
// import { add2cart, increment_amount, remove_prod_from_cart, selecCart } from '../Cart/cartSlice'
// import './mobileCart.css'
// import { useAppDispatch } from '../../../app/hooks'
// import { Link } from 'react-router-dom'
// import { SERVER } from '../../../globalVar'
// const MobileCart = () => {

//     return (

//         <div className='cart_main2' >
//             <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
//                     <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
//                 </svg>
//                 {/* <span className='counter'> */}
//                 {/* {amount_counter} */}
//                 {/* &#8362;{total} */}
//                 {/* </span> */}
//             </button>
//             <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
//                 <div className="offcanvas-header" style={{ backgroundColor: 'burlywood' }}>
//                     <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                 </div>
//                 <div className="offcanvas-body">
//                     pppppp
//                 </div>
//             </div>




//         </div>



//     )
// }

// export default MobileCart

import { useSelector } from 'react-redux'
import { add2cart, increment_amount, remove_prod_from_cart, selecCart } from '../Cart/cartSlice'
import './mobileCart.css'
import { useAppDispatch } from '../../../app/hooks'
import { Link } from 'react-router-dom'
import { SERVER } from '../../../globalVar'




// import { useDispatch, useSelector } from 'react-redux'
// import { add2cart, increment_amount, remove_prod_from_cart, selecCart } from '../Cart/cartSlice'
// import './mobileCart.css'
// import { useAppDispatch } from '../../../app/hooks'
// import { Link } from 'react-router-dom'
// import { SERVER } from '../../../globalVar'
const MobileCart = () => {
    const Cart = useSelector(selecCart)
    const dispatch = useAppDispatch()
    // this var is responsible for the sub-total of each prouct in the cart
    var amount_counter = 0;
    var total = 0;
    Cart.cart.forEach(element => {
        amount_counter += element.amount
        total += element.price * element.amount
        total=parseFloat( total.toFixed(2))
    });
    // console.log(amount_counter)
    // console.log(Cart)
    return (

        <div className='cart_main2' >
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <span className='counter'>
                    {/* {amount_counter} */}
                    &#8362;{total}
                </span>
            </button>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
                <div className="offcanvas-header" style={{ backgroundColor: 'burlywood' }}>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {Cart.cart.map((product, index) =>
                        <div className='one_product' key={index}>
                            <div className='title_amount'>
                                <div className='prod_title'>{product.title}</div>
                                <div style={{ display: "flex", justifyContent: 'space-around' }}>
                                    <div className='prod_total'>&#8362;{parseFloat(product.price * product.amount).toFixed(2)}</div>
                                    <div className='prod_amount'>
                                        <div className='decrease_amount' onClick={() => {
                                            if (product.amount > 0) { dispatch(increment_amount({ 'id': product.id })) }
                                        }}>
                                            &nbsp; - &nbsp;
                                        </div>
                                        <div className='display_amount'>
                                            {product.amount}

                                        </div>
                                        <div className='add_amount' onClick={() => {
                                            dispatch(add2cart({ 'id': product.id }))
                                        }}>
                                            &nbsp; + &nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img className='cart_prod_img' src={`${SERVER}/${product.img}`} ></img>
                            <div className='remove_prod' onClick={() => { dispatch(remove_prod_from_cart({ 'id': product.id })) }}>X</div>
                        </div>
                    )}
                    <div className='empty_box'></div>

                    <div className='checkout_section'>

                        <div className='total_calculator'>&#8362;{total} סה"כ לתשלום</div>
                        <div  data-bs-dismiss="offcanvas" >

                            <Link to='/checkout' className='checkout_btn '>מעבר לתשלום</Link>
                        </div>
                    </div>
                </div>
            </div>




        </div>



    )
}

export default MobileCart