import { useSelector } from 'react-redux'
import { add2cart, cleanCart, increment_amount, remove_prod_from_cart, selecCart } from './cartSlice'
import './cart.css'
import { useAppDispatch } from '../../../app/hooks'
import { Link } from 'react-router-dom'
import { SERVER } from '../../../globalVar'
const Cart = (props) => {
    const Cart = useSelector(selecCart)
    const dispatch = useAppDispatch()
    // this var is responsible for the sub-total of each prouct in the cart
    var amount_counter = 0;
    var total = 0;
    Cart.cart.forEach(element => {
        amount_counter += element.amount
        total += element.price * element.amount
        total = parseFloat(total.toFixed(2))
    });
    // console.log(amount_counter)
    return (

        <div className='cart_main' >
            <div className='cleanCart' onClick={() => {
                localStorage.removeItem('cart');
                dispatch(cleanCart())
            }}>נקה עגלה
            </div>

            {/* </button> */}
            <div className='cart_title' >
                העגלה שלי
            </div>
            <div className='empty_box'></div>
            {Cart.cart.map((product, index) =>
                <div className='one_product' key={index}>
                    <div className='title_amount'>
                        {/* <div className='prod_title'>{product.title}</div> */}
                        <div className='prod_title'>
                            {product.title.length > 50
                                ? product.title.slice(0, 50) + '...'
                                : product.title}
                        </div>

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
                    <img className='cart_prod_img' src={`${SERVER}/static${product.img}`} ></img>
                    <div className='remove_prod' onClick={() => { dispatch(remove_prod_from_cart({ 'id': product.id })) }}>X</div>
                </div>
            )}
            <div className='empty_box'></div>

            <div className='checkout_section'>

                <div className='total_calculator'>&#8362;{total} סה"כ לתשלום</div>
                {/* <div  data-bs-dismiss="offcanvas" > */}
                <Link to='/checkout' className='checkout_btn ' onClick={props.closeCart}>מעבר לתשלום</Link>
            </div>




        </div>



    )
}

export default Cart