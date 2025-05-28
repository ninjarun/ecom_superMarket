// import React, { useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchSalesAsync, selectSales } from '../../../slicers/salesSlice';
// import { Chart, CategoryScale, BarController, BarElement } from 'chart.js/auto';
// import "./sales.css"
// const Sales = (axx) => {
//   const chartRef = useRef(null);
//   const sales = useSelector(selectSales);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchSalesAsync(axx));
//   }, [dispatch]);

//   useEffect(() => {
//     const generateSalesReport = () => {
//       Chart.register(CategoryScale, BarController, BarElement);
//       const ctx = document.getElementById('salesChart').getContext('2d');

//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }

//       const currentDate = new Date();
//       const thirtyDaysAgo = new Date();
//       thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//       const sixtyDaysAgo = new Date();
//       sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
//       const ninetyDaysAgo = new Date();
//       ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
//       const sevenDaysAgo = new Date();
//       sevenDaysAgo.setDate(thirtyDaysAgo.getDate() - 7);

//       const salesByDate = sales.sales.reduce((result, sale) => {
//         const date = sale.date_ordered.slice(0, 10);
//         const totalAmount = sale.items.reduce(
//           (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
//           0
//         );

//         if (result[date]) {
//           result[date] += totalAmount;
//         } else {
//           result[date] = totalAmount;
//         }

//         return result;
//       }, {});

//       const salesDates = Object.keys(salesByDate);
//       const salesAmounts = Object.values(salesByDate);

//       chartRef.current = new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: salesDates,
//           datasets: [
//             {
//               label: 'Sales Amount',
//               data: salesAmounts,
//               backgroundColor: 'rgba(54, 162, 235, 0.5)',
//               borderColor: 'rgba(54, 162, 235, 1)',
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             y: {
//               beginAtZero: true,
//               precision: 0,
//               title: {
//                 display: true,
//                 text: 'Sales Amount ($)',
//               },
//             },
//           },
//         },
//       });
//     };

//     generateSalesReport();
//   }, [sales]);

//   const calculateTotalSales = (salesData, startDate, endDate) => {
//     return salesData.reduce((total, sale) => {
//       const saleDate = new Date(sale.date_ordered.slice(0, 10));
//       if (saleDate >= startDate && saleDate <= endDate) {
//         const totalAmount = sale.items.reduce(
//           (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
//           0
//         );
//         return total + totalAmount;
//       }
//       return total;
//     }, 0);
//   };

//   const currentDate = new Date();
//   const thirtyDaysAgo = new Date();
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//   const sixtyDaysAgo = new Date();
//   sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
//   const ninetyDaysAgo = new Date();
//   ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
//   const today = new Date();
//   today.setDate(today.getDate() - 1);
//   const sevenDaysAgo = new Date();
//       sevenDaysAgo.setDate(thirtyDaysAgo.getDate() - 7);
//   // const today =  currentDate.setDate(today.getDate() - 1);

//   const totalSales30Days = calculateTotalSales(sales.sales, thirtyDaysAgo, currentDate);
//   const totalSales60Days = calculateTotalSales(sales.sales, sixtyDaysAgo, currentDate);
//   const totalSales90Days = calculateTotalSales(sales.sales, ninetyDaysAgo, currentDate);
//   const totalSales7Day = calculateTotalSales(sales.sales, sevenDaysAgo, currentDate)

//   const totalSales1Day = calculateTotalSales(sales.sales, today, currentDate)
//   return (
//     <div className='main_sales' style={{ width: '100%', height: '50vh' }}>
//       <h1> דוח מכירות</h1>
//       <canvas className='canvas' id="salesChart"></canvas>
//       <div className='salesInfo'>
//         <h4>מכירות</h4>
//         <div>היום: {totalSales1Day}&#8362;</div>
//       <div>7 ימים אחרונים: {totalSales7Day}&#8362;</div>
//         <div>  30 ימים אחרונים : {totalSales30Days}&#8362;</div>
//         <div>60 ימים אחרונים: {totalSales60Days}&#8362;</div>
//         <div>90 ימים אחרונים: {totalSales90Days}&#8362;</div>
//       </div>


//     </div>
//   );
// };

// export default Sales;
import React from 'react'

const Sales = () => {
  return (
    <div>Sales</div>
  )
}

export default Sales