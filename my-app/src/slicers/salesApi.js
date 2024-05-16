
import axios from "axios";
import { SERVER } from "../globalVar";

export function fetchSales(sale,axx) {

    console.log(sale,axx);
    return new Promise((resolve) =>
      axios
        .get(`${SERVER}/orders`, { params: sale, headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${axx['axx']}`} })
        .then((res) => resolve({ data: res.data }))
        .catch((err) => resolve({ error: err }))
    );
  }
  
  
 
  

  export function UpdateTrack(sale) {
    return new Promise((resolve) =>
      axios
        .put(`${SERVER}/orders`, sale, {headers:{"content-type": "multipart/form-data",
      } })
        .then((res) => resolve({ data: res.data }))
    );
  }



//   export function fetchSales(sale, axx) {
//     console.log(axx)
//     console.log("Headers being sent:", { "Content-Type": "application/json", "Authorization": `Bearer ${axx['axx']}` });
//     return new Promise((resolve) =>
//       axios
//         .get(`${SERVER}/orders`, {
//           params: sale,
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${axx}`
//           }
//         })
//         .then((res) => resolve({ data: res.data }))
//         .catch((err) => {
//             console.error('Error fetching sales:', err);
//             resolve({ error: err });
//         })
//     );
// }
