import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { UpdateTrackingAsync, fetchSalesAsync, selectSales } from '../../../slicers/salesSlice';
import { useSelector } from 'react-redux';
import "./awaitingShipment.css";

const AwaitingShipment = () => {
  const dispatch = useAppDispatch();
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const allSales = useSelector(selectSales);
  const sales = allSales.sales.map(item => {
    return { ...item, date_ordered: new Date(item.date_ordered).toLocaleDateString() }
  })
  const need2ship = sales.filter((sale) => {
    return sale.payment_status !== 'intent' && sale.tracking_number === 'Default';
  });

  const [tracking, setTracking] = useState('');
  useEffect(() => {
    dispatch(fetchSalesAsync());
  }, [dispatch]);

  const handleUpdate = (sale) => {
    dispatch(UpdateTrackingAsync(sale));
  };

  const handleRowClick = (index) => {
    if (clickedRowIndex === index) {
      setClickedRowIndex(null); // Hide the second row if it's already visible
    } else {
      setClickedRowIndex(index); // Show the second row for the clicked index
    }
  };

  return (
    <div className="awaiting-shipment">

      <h1>      הזמנות שמחכות לשילוח      </h1>
      <div>
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
              {/* <th>סטטוס תשלום</th> */}
              {/* <th>Payment Intent</th> */}
              {/* <th>מספר מעקב</th> */}
            </tr>
          </thead>
          <tbody>
            {need2ship.map((order, index) => (
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
                  {/* <td>{order.payment_status}</td> */}
                  {/* <td>{order.payment_intent}</td> */}
                  {/* <td>
                    {order.tracking_number === 'Default' ?
                      <div>
                        <input onChange={(e) => setTracking(e.target.value)} placeholder='מספר מעקב'></input>
                      </div>
                      :
                      `${order.tracking_number} `
                    }

                    <button onClick={() => tracking ? handleUpdate({ "order_id": `${order.id}`, "tracking_number": `${tracking}` }) : alert('enter tracking')}> עדכן</button>
                  </td> */}
                </tr>
                {clickedRowIndex === index && (
                  <tr >
                    <td colSpan={8}>
                      <div className='orders_info_wrapper'>
                        <div className='info_top'>

                          <div>
                            פרטי הזמנה:<br></br>
                            {order.full_name}<br></br>
                            {order.telephone_number}<br></br>
                            {order.street}<br></br>
                            {order.city}<br></br>
                            {order.zipcode}<br></br>
                          </div>
                          <div className='track_update'>
                            {order.tracking_number === 'Default' &&
                              <div>
                                <input onChange={(e) => setTracking(e.target.value)} placeholder='מספר מעקב'></input>
                                <button onClick={() => tracking ? handleUpdate({ "order_id": `${order.id}`, "tracking_number": `${tracking}` }) : alert('enter tracking')}> עדכן</button>
                              </div>
                            }

                          </div>
                        </div>
                        <div className='cart_list' >
                          <ul>
                            {order.items.map((item, index) => (
                              <li key={index}>
                               קוד מוצר: {item.product.id}, Product: {item.name}, Quantity: {item.quantity}, Price: {item.price}
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

export default AwaitingShipment;
