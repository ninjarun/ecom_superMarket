import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './admin.css'
import { Helmet } from 'react-helmet'
import { fetchProductsAsync, selecProducts } from '../../slicers/productsSlice'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { selectAccess } from '../../slicers/LoginSlice'

const AdminWelcome = () => {
//   const dispatch = useAppDispatch();
//   const products = useSelector(selecProducts);
  
//   useEffect(() => {
//     dispatch(fetchProductsAsync());

// }, [dispatch])
const axx = useSelector(selectAccess)

  return (
    <div className='main_admin'>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      {axx && 
      <div className='action_box_ad'>
        <Link className='ad_link' to="/admin/">דוח מכירות </Link><br />
        <Link className='ad_link' to="/admin/addproduct">הוסף מוצר</Link><br />
        <Link className='ad_link' to="/admin/productmanager">ניהול מוצרים</Link><br />
        <Link className='ad_link' to="/admin/awaitingshipment"> מחכה למשלוח</Link><br />
        <Link className='ad_link' to="/admin/allorders">כל ההזמנות </Link><br />
      </div>
      }
      <div className='outlet_admin'>
        <Outlet />
        {/* <Awaiting_shipment></Awaiting_shipment> */}
        {/* <All_orders></All_orders> */}
      </div>
    </div>
  )
}

export default AdminWelcome