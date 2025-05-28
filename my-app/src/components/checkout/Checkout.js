import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { add2cart, increment_amount, selecCart } from '../navigator/Cart/cartSlice'
import './checkout.css'
import { useAppDispatch } from '../../app/hooks'
import Paypal_btn from './Paypal_btn'
import Stripe_payment from './stripe/Stripe_payment'
import { SERVER } from '../../globalVar'
import "animate.css"

const Checkout = () => {
  const Cart = useSelector(selecCart)
  const dispatch = useAppDispatch()
  // flags
  const [flag, setflag] = useState(true)
  const [userInfoFlag, setuserInfoFlag] = useState(true)
  const [shipmentMethodFlag, setshipmentMethodFlag] = useState(false)
  const [paymentMethodFlag, setpaymentMethodFlag] = useState()
  // end flags
  const [subtotal, setsubtotal] = useState(0) //total payment amount
  const [total, settotal] = useState(0) // total payment amount including shipping
  const [prod_amount, setprod_amount] = useState(0) //amount of products in cart
  const [ShippingMethod, setShippingMethod] = useState('') //shipping method user choosed


  // form variables
  const [FullName, setFullName] = useState('')
  const [Phone, setPhone] = useState('')
  const [Email, setEmail] = useState('')
  const [City, setCity] = useState('')
  const [Street, setStreet] = useState('')
  const [AptNum, setAptNum] = useState('')
  const [ZipCode, setZipCode] = useState('')
  const [Comments, setComments] = useState('')
  // end form variables

  const [UserInfo, setUserInfo] = useState(null)

  const info_validator = () => {
    const userInfo = {
      'full_name': FullName,
      'telephone_number': Phone,
      'email': Email,
      'city': City,
      'street': Street,
      'apartment': AptNum,
      'zipcode': ZipCode,
      'comments': Comments,

    };

    let error = null;

    // Check if all values pass the desired conditions
    if (!userInfo.full_name) {
      error = 'Please enter a full name.';
    } else if (!userInfo.telephone_number) {
      error = 'Please enter a telephone number.';
    } else if (!isValidEmail(userInfo.email)) {
      error = 'Please enter a valid email address.';
    } else if (!userInfo.city) {
      error = 'Please enter a city.';
    } else if (!userInfo.street) {
      error = 'Please enter a street.';
    } else if (!userInfo.apartment) {
      error = 'Please enter an apartment.';
    } else if (!isValidZipCode(userInfo.zipcode)) {
      error = 'Please enter a valid ZIP code (at least 5 characters).';
    }

    if (error) {
      // Handle the error (e.g., display error message to the user)
      console.error(error);
      alert(error)
      return;
    }

    // All conditions are satisfied
    setUserInfo(userInfo);
    setuserInfoFlag(false);
    setshipmentMethodFlag(true)
    // setflag(!flag);
  };

  // Example validation functions
  const isValidEmail = (email) => {
    // Use a regular expression or any other validation logic to check if the email is valid
    // Return true if valid, false otherwise
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidZipCode = (zipcode) => {
    // Check if the zipcode has at least 5 characters
    return zipcode.length >= 5;
  };


  const handle_shipping = (value) => {
    console.log('handling shipping')
    console.log(value)
    // Check what kind of shipping method user wants before calculating total 
    if (value === 1) {
      settotal(subtotal + 100)

    } else if (value === 2) {
      settotal(subtotal + 200)
    }


    console.log(total)
  }
  useEffect(() => {
    let amount_counter = 0;
    let tmptotal = 0;
    Cart.cart.forEach(element => {
      amount_counter += element.amount
      tmptotal += element.price * element.amount
      setsubtotal(tmptotal)
      setprod_amount(amount_counter)
      console.log(ShippingMethod)
    });
  }, [Cart.cart])
  return (
    <div>

      <br></br>
      <div className={`main_wrapper ${!flag && 'disabled_main_wrapper'}`}>
        <div className='products_wrapper'>
          <table>
            <thead>
              <tr>
                <th>סה"כ</th>
                <th>כמות</th>
                <th>מחיר</th>
                <th>מוצר</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Cart.cart.map((product, i) => (
                // setnew_amount(product.amount)
                <tr key={i}>
                  <td>{product.amount * product.price}&#8362;</td>
                  <td >
                    {/* <div className='amount_wrapper'>
                      <div className={!userInfoFlag && "hide"} onClick={() => {
                        if (product.amount > 0) { dispatch(increment_amount({ 'id': product.id })) }
                      }}>
                        &nbsp; - &nbsp;
                      </div> */}
                      <div className=''>
                        {product.amount}

                      </div>
                      {/* <div className={!userInfoFlag && "hide"} onClick={() => {
                        dispatch(add2cart({ 'id': product.id }))
                      }}>
                        &nbsp; + &nbsp;
                      </div>
                    </div> */}
                  </td>
                  <td>{product.price}&#8362;</td>
                  <td>{product.title}</td>
                  <td style={{ textAlign: 'center' }}><img src={`${SERVER}/static${product.img}`} className='product_img'></img></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='info_wrapper'>
          <div className='info_box_chqout' onClick={() => {
            setuserInfoFlag(true)
            setshipmentMethodFlag(false);
            setpaymentMethodFlag(false);
            setflag(true);
          }}>
            <span style={{ float: 'left' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
              </svg>
            </span>
            <span style={{ marginRight: '10px' }}>  פרטי משלוח</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
            </svg>
          </div>
          <div className={userInfoFlag ? 'customer_info' : ' hide'}>
            {/* <div> */}
            <div className='continue_btn' onClick={() => { info_validator() }}>
              המשך
            </div>
            <div className='form_wrraper'>
              <input className='form-input' placeholder=':שם מלא*' onChange={(e) => setFullName(e.target.value)}></input>
              <input className='form-input' placeholder=':טלפון*' onChange={(e) => setPhone(e.target.value)}></input>
              <input className='form-input' placeholder=':כתובת מייל*' type='email' onChange={(e) => setEmail(e.target.value)}></input>
              <input className='form-input' placeholder=':עיר*' onChange={(e) => setCity(e.target.value)}></input>
              <input className='form-input' placeholder=':רחוב*' onChange={(e) => setStreet(e.target.value)}></input>
              <input className='form-input' placeholder=':כניסה*' onChange={(e) => setAptNum(e.target.value)}></input>
              <input className='form-input' placeholder=':דירה*' onChange={(e) => setAptNum(e.target.value)}></input>
              <input className='form-input' placeholder=':מיקוד*' onChange={(e) => setZipCode(e.target.value)}></input>
              <textarea className='form-input triple-height' placeholder=':הערות' onChange={(e) => setComments(e.target.value)}></textarea>
            </div>
          </div>
          <div className='info_box_chqout' onClick={() => {
            paymentMethodFlag && setshipmentMethodFlag(true)
            setpaymentMethodFlag(false)
            setflag(true)
          }}>
            <span style={{ float: 'left' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
              </svg>
            </span>
            <span style={{ marginRight: '10px' }}> סיכום ובחירת משלוח</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
          </div>

          <div className={shipmentMethodFlag ? 'final_info' : 'hide'}>
            <div className='continue_btn' onClick={() => {
              // setuserInfoFlag(!userInfoFlag); 
              setshipmentMethodFlag(!shipmentMethodFlag)
              setpaymentMethodFlag(!paymentMethodFlag)
              setflag(!flag)
            }}>המשך</div>
            {/* <div>סה"כ {prod_amount} מוצרים</div> */}
            <div className='ship_options' >
              {/* <select onChange={(e) => handle_shipping(e.target.value)}>
                <option>בחר סוג משלוח</option>
                <option value={1}>דואר ישראל</option>
                <option value={2}>די אייץ אל</option>
              </select> */}
              <div className='ship_option_radio'>
                <input className='radioBTN' value={1} e onChange={(e) => handle_shipping(e.target.value)} name='ship' type='radio'></input> איסוף עצמי<br />
                <div className='radio_option_desc'>איסוף מככה וככה </div >
              </div>
              <div className='ship_option_radio'>
                <input className='radioBTN' value={2} onChange={(e) => handle_shipping(e.target.value)} name='ship' type='radio'></input> משלוח עד הבית
                <div className='radio_option_desc'>משלוח עד הבית במחיר מככה וככה </div >
              </div>
              <div> סה"כ {total}&#8362; כולל משלוח</div>
            </div>
          </div>
          <div className='info_box_chqout' >
            <span style={{ float: 'left' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
              </svg>
            </span>
            <span style={{ marginRight: '10px' }}>שיטת תשלום</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
              <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
            </svg>
          </div>
          <div className={paymentMethodFlag ? 'payment_method_box' : 'hide'}>
            {!flag ? <Stripe_payment UserInfo={UserInfo}></Stripe_payment> : <span></span>}
          </div>

        </div>
      </div>





      {/* <div className='checkout_button' onClick={checkout_validator}>המשך לתשלום</div> */}

      {/* {!flag ? <Paypal_btn UserInfo={UserInfo} cart={Cart.cart} total={total}></Paypal_btn> : <span></span>} */}

    </div >


  )
}

export default Checkout
