import './single_prod2.css';
import { add2cart, increment_amount, selecCart } from '../navigator/Cart/cartSlice';
import { useAppDispatch } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SERVER } from '../../globalVar';
import ProductPopup from '../popuupProduct/ProductPopup';
import { Link } from 'react-router-dom';



// CHATGOT IMPROVEMENT TO THE ORIGINAL SINGLEPROD



const SingleProd2 = (props) => {
  const dispatch = useAppDispatch();
  const [button_display, setbutton_display] = useState(true);
  const [popup, setpopup] = useState(false);
  const cart = useSelector(selecCart);
  let objectWithId;
  
  try {
    objectWithId = cart.cart.find(obj => obj.id === props.prod.id);
  } catch (error) {
    console.log(error);
  }
  
  useEffect(() => {
    objectWithId ? setbutton_display(false) : setbutton_display(true);
  }, [objectWithId]);

  return (
    <div className='prod_box'>
      <div onClick={() => setpopup(true)}>
        <Link to={`/product/${props.prod.id}`}>
          <img className='prod_img' alt={props.prod.name} src={`${SERVER}/static${props.prod.image}`} loading='lazy'></img>
        </Link>
        <div className='product_title'>{props.prod.name}</div>
        <div className='product_price'>&#8362;{props.prod.price}</div>
      </div>
      <div className='action_btn_set_bottom'>
        <div className='btn_wrapper'>
          {button_display ? (
            <div className='add2cart' onClick={() => {
              setbutton_display(!button_display);
              dispatch(add2cart({ 'id': props.prod.id, 'title': props.prod.name, 'price': props.prod.price, 'img': props.prod.image, 'amount': 1 }));
            }}>הוסף לסל</div>
          ) : (
            <div className='choose_quantity'>
              <div className='decrease_amount_prod_card' onClick={() => {
                if (objectWithId.amount > 1) {
                  dispatch(increment_amount({ 'id': props.prod.id }));
                } else {
                  setbutton_display(!button_display);
                  dispatch(increment_amount({ 'id': props.prod.id }));
                }
              }}>-</div>
              <div className='total_amount'>
                {objectWithId ? <span>{objectWithId.amount}</span> : setbutton_display(!button_display)}
              </div>
              <div className='add_amount_prod_card' onClick={() => {
                dispatch(add2cart({ 'id': props.prod.id, 'title': props.prod.name, 'price': props.prod.price, 'img': props.prod.image, 'amount': 1 }));
              }}>+</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleProd2;
