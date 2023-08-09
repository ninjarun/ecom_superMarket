import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './admin.css'

const AdminWelcome = () => {

  return (
    <div className='main_admin'>
      <div className='action_box_ad'>
      <Link className='ad_link' to="/admin/">דוח מכירות </Link><br />
        <Link className='ad_link' to="/admin/addproduct">הוסף מוצר</Link><br />
        <Link className='ad_link' to="/admin/productmanager">ניהול מוצרים</Link><br />
        <Link className='ad_link' to="/admin/awaitingshipment"> מחכה למשלוח</Link><br />
        <Link className='ad_link' to="/admin/allorders">כל ההזמנות </Link><br />

      </div>
      <div className='outlet_admin'>
        <Outlet />
        {/* <Awaiting_shipment></Awaiting_shipment> */}
        {/* <All_orders></All_orders> */}
      </div>
    </div>
  )
}

export default AdminWelcome