import Sales from "./sales_report/Sales";
// import TrackUpdate from "./tracking_update/TrackUpdate";
import { useSelector } from 'react-redux'
import { fetchSalesAsync, selectSales } from '../../slicers/salesSlice'
import { useAppDispatch } from '../../app/hooks'
import { useEffect } from "react";


const Admin = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSalesAsync())

  }, [dispatch])

  const sales = useSelector(selectSales)
console.log(sales)
  return (
    <div>
<Sales></Sales>
    </div>
  );
};

export default Admin;
