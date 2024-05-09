import './single_prod2.css';
import { add2cart, increment_amount, selecCart } from '../navigator/Cart/cartSlice';
import { useAppDispatch } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SERVER } from '../../globalVar';
import ProductPopup from '../popuupProduct/ProductPopup';
import { Link } from 'react-router-dom';
import { add2wish, selectWish } from '../../slicers/productsSlice'




const SingleProd2 = (props) => {
  const dispatch = useAppDispatch();
  const [button_display, setbutton_display] = useState(true);
  const [wish_display, setwish_display] = useState(true)
  const [popup, setpopup] = useState(false);
  const cart = useSelector(selecCart);
  const wish = useSelector(selectWish)
  let objectWithId;
  let wishWithId
  try {
    wishWithId = wish.find(obj => obj.id === props.prod.id);
    objectWithId = cart.cart.find(obj => obj.id === props.prod.id);
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    objectWithId ? setbutton_display(false) : setbutton_display(true);
    wishWithId ? setwish_display(true) : setwish_display(false);
  }, [objectWithId, wishWithId]);

  return (
    <div className='prod_box'>
      <div onClick={() => setpopup(true)}>

        {/* STAR ICON */}
        <div className='starIcon' onClick={() => {
          dispatch(add2wish(props.prod))
        }} >
          {wish_display ?
            <svg xmlns="http://www.w3.org/2000/svg" color='gold' width="24" height="24" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" color='gold' width="24" height="24" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
            </svg>
          }
        </div>

        <Link className='prodLink' to={`/product/${props.prod.id}`}>
          <img className='prod_img' alt={props.prod.name} src={`${SERVER}/static${props.prod.image}`} loading='lazy'></img>
          <div className='product_title'>{props.prod.name}</div>
          <div className='product_price'>&#8362;{props.prod.price}</div>
        </Link>
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
