
import axios from "axios";
import { SERVER } from "../globalVar";

export function fetchSales(sale) {
    // console.log(sale);
    return new Promise((resolve) =>
      axios
        .get(`${SERVER}/orders`, { params: sale, headers: { "Content-Type": "application/json" } })
        .then((res) => resolve({ data: res.data }))
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