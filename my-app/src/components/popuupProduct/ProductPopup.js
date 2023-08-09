import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./ProductPopup.css"
import { useAppDispatch } from '../../app/hooks';
import { add2cart, increment_amount, selecCart } from '../navigator/Cart/cartSlice';
import { useSelector } from 'react-redux';
import { SERVER } from '../../globalVar';

const ProductPopup = (props) => {
  const dispatch = useAppDispatch()
  const cart = useSelector(selecCart)
  const [button_display, setbutton_display] = useState(true)
  const [display_img, setdisplay_img] = useState(props.prod.image)
  let objectWithId;
  try { objectWithId = cart.cart.find(obj => obj.id === props.prod.id); } catch (error) { console.log(error) }
  useEffect(() => {
    objectWithId ? setbutton_display(false) : setbutton_display(true)
  }, [objectWithId])
  return (
    <Popup
      trigger={<button className="btn_wrapper popbtn">פרטים</button>}
      modal
      nested
      contentStyle={{ width: "", height: "" }}
      closeOnDocumentClick // Enable auto-close on clicking outside the popup
    >
      {close => (
        <div className='popupWrapper'>
          <div className='popupexit' onClick={close}>X</div>
          <div className='subWrapper'>
            <div className='images_wrapper'>

              <img className='popup_prod_img' alt='' src={`${SERVER}${display_img}`}></img>
              <div className='small_images'>
                {props.prod.image !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(props.prod.image)} className='small_img' alt='' src={`${SERVER}${props.prod.image}`}></img>}
                {props.prod.image2 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(props.prod.image2)} className='small_img' alt='' src={`${SERVER}${props.prod.image2}`}></img>}
                {props.prod.image3 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(props.prod.image3)} className='small_img' alt='' src={`${SERVER}${props.prod.image3}`}></img>}
                {props.prod.image4 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(props.prod.image4)} className='small_img' alt='' src={`${SERVER}${props.prod.image4}`}></img>}
                {props.prod.image5 !== "/images/placeholder.png" && <img onClick={() => setdisplay_img(props.prod.image5)} className='small_img' alt='' src={`${SERVER}${props.prod.image5}`}></img>}
              </div>
            </div>
            <div className='subWrapper2'>
              <div className='prod_info'>
                <div className='popup_title'>{props.prod.name}</div>
                <div className='popup_desc'>{props.prod.description}</div>
                <div className='popup_price' >&#8362;{props.prod.price} :מחיר ליחידה</div>
                <div className='btn_wrapper'>
                  {
                    button_display ?
                      <div className='add2cart' onClick={() => {
                        setbutton_display(!button_display)
                        dispatch(add2cart({ 'id': props.prod.id, 'title': props.prod.title, 'price': props.prod.price, 'img': props.prod.image, 'amount': 1 }))
                      }}>הוסף לסל
                      </div>
                      :
                      <div className='choose_quantity' >
                        <div className='decrease_amount_prod_card' onClick={() => {
                          if (objectWithId.amount > 1) {
                            dispatch(increment_amount({ 'id': props.prod.id }))
                          } else {
                            setbutton_display(!button_display)
                            dispatch(increment_amount({ 'id': props.prod.id }))
                          }
                        }}>
                          &nbsp; - &nbsp;</div>
                        <div>{objectWithId ? <span>{objectWithId.amount}</span> : setbutton_display(!button_display)}</div>
                        <div className='add_amount_prod_card' onClick={() => {
                          dispatch(add2cart({ 'id': props.prod.id, 'title': props.prod.name, 'price': props.prod.price, 'img': props.prod.image, 'amount': 1 }))
                        }}>
                          &nbsp; + &nbsp; </div>
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default ProductPopup;
