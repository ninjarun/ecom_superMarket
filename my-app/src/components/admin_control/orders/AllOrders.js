import React, { useEffect, useState } from 'react';
import { selectSales } from '../../../slicers/salesSlice';
import { useSelector } from 'react-redux';
import "./allOrders.css"
const AllOrders = () => {
  // variables for search features
  const [id, setid] = useState("")
  const [name, setname] = useState("")
  const [phone, setphone] = useState("")
  const [email, setemail] = useState("")
  const [tracking, settracking] = useState("")
  // end variables for search features
  const [table_display, settable_display] = useState([])
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const allSales = useSelector(selectSales);
  const sales = allSales.sales.map(item => {
    return { ...item, date_ordered: new Date(item.date_ordered).toLocaleDateString() }
  })
  useEffect(() => {
    settable_display(sales)
  }, [])

  const handleRowClick = (index) => {
    if (clickedRowIndex === index) {
      setClickedRowIndex(null); // Hide the second row if it's already visible
    } else {
      setClickedRowIndex(index); // Show the second row for the clicked index
    }
  };

  // Search Functions
  const handle_id_search = (cred) => {
    const tmpAr = sales.filter(item => item.id === parseInt(id))
    settable_display(tmpAr)
  }
  const handle_name_search = (cred) => {
    const tmpAr = sales.filter(item => item.full_name.includes(cred))
    settable_display(tmpAr)
  }
  const handle_phone_search = (cred) => {
    const tmpAr = sales.filter(item => item.telephone_number === cred)
    settable_display(tmpAr)
  }
  const handle_email_search = (cred) => {
    console.log(cred)
    const tmpAr = sales.filter(item =>JSON.stringify(item.email) === JSON.stringify(cred))
    settable_display(tmpAr)
  }
  const handle_tracking_search = (cred) => {
    const tmpAr = sales.filter(item => item.tracking_number === tracking)
    settable_display(tmpAr)
  }
  // END  Search Functions

  return (
    <div className="all-orders">
      <h1>כל ההזמנות</h1>
      {/* <div  onClick={() =>settable_display(sales) }> הצג את כל ההזמנות</div> */}

      <div>
        <div className='order_search_box_parent'>
          <div className='order_search_box_child'>
            <input value={id} onChange={(e) => setid(e.target.value)} placeholder='חיפוש לפי מזהה'></input>
            <div className='order_search_btn' onClick={(e) => handle_id_search(id)}> סנן</div>
          </div>
          <div className='order_search_box_child'>
            <input value={name} onChange={(e) => setname(e.target.value)} placeholder='חיפוש לפי שם'></input>
            <div className='order_search_btn' onClick={(e) => handle_name_search(name)}> סנן</div>

          </div>
          <div className='order_search_box_child'>
            <input value={phone} onChange={(e) => setphone(e.target.value)} placeholder='חיפוש לפי טלפון'></input>
            <div className='order_search_btn' onClick={(e) => handle_phone_search(phone)}> סנן</div>

          </div>
          <div className='order_search_box_child'>
            <input value={email} onChange={(e) => setemail(e.target.value)} placeholder='חיפוש לפי אימייל'></input>
            <div className='order_search_btn' onClick={(e) => handle_email_search(email)}> סנן</div>

          </div>
          <div className='order_search_box_child'>
            <input value={tracking} onChange={(e) => settracking(e.target.value)} placeholder='חיפוש לפי מספר מעקב'></input>
            <div className='order_search_btn' onClick={(e) => handle_tracking_search(tracking)}> סנן</div>

          </div>
          {/* <div className='search_order_id'></div>
          <div className='search_order_name'></div>
          <div className='search_order_phone'></div>
          <div className='search_order_email'></div>
          <div className='search_order_tracking'></div> */}
        </div>

        <table className="order-table">
          <thead>
            <tr>
              <th>מזהה</th>
              <th>שם מלא</th>
              <th>מספר טלפון</th>
              <th>אי-מייל</th>
              <th>עיר</th>
              {/* <th>Street</th> */}
              {/* <th>Apartment</th> */}
              {/* <th>Zip Code</th> */}
              {/* <th>Comments</th> */}
              <th>תאריך קנייה</th>
              {/* <th>Items</th> */}
              <th>סטטוס תשלום</th>
              {/* <th>Payment Intent</th> */}
              <th>מספר מעקב</th>
            </tr>
          </thead>
          <tbody>
            {table_display.map((order, index) => (
              <React.Fragment key={order.id}>
                <tr onClick={() => handleRowClick(index)}>
                  <td>{order.id}</td>
                  <td>{order.full_name}</td>
                  <td>{order.telephone_number}</td>
                  <td>{order.email}</td>
                  <td>{order.city}</td>
                  {/* <td>{order.street}</td> */}
                  {/* <td>{order.apartment}</td> */}
                  {/* <td>{order.zipcode}</td> */}
                  {/* <td>{order.comments}</td> */}
                  <td>{order.date_ordered}</td>
                  {/* <td>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          Product: {item.product}, Quantity: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td> */}
                  <td>{order.payment_status}</td>
                  {/* <td>{order.payment_intent}</td> */}
                  <td>{order.tracking_number == 'Default'?<span style={{padding:"3px",color:"white",backgroundColor:"red"}}> מחכה למשלוח</span>:order.tracking_number}</td>
                </tr>
                {clickedRowIndex === index && (
                  <tr>
                    <td colSpan={8}>
                      <div className='clicked_info'>
                        <div>
                          פרטי הזמנה:<br></br>
                          {order.full_name}<br></br>
                          {order.telephone_number}<br></br>
                          {order.street}<br></br>
                          {order.city}<br></br>
                          {order.zipcode}<br></br>
                        </div>
                        <div>
                          <ul>
                            {order.items.map((item, index) => (
                              <li key={index}>
                                קוד מוצר: {item.product.id}, מוצר: {item.name}, כמות: {item.quantity}, מחיר: {item.price}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllOrders;
