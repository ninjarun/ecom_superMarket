
import axios from "axios";
import { SERVER } from "../globalVar";

export function fetchProducts() {
  return new Promise((resolve) =>
  axios
      .get(`${SERVER}/products`)
      .then((res) => resolve({ data: res.data }))
  );
}

export function addProduct(prod) {
  return new Promise((resolve) =>
    axios
      .post(`${SERVER}/products`, prod, {headers:{"content-type": "multipart/form-data",
    } })
      .then((res) => resolve({ data: res.data }))
  );
}


export function editProduct(prod) {
  return new Promise((resolve) =>
    axios
      .put(`${SERVER}/products`, prod, {headers:{"content-type": "multipart/form-data",
    } })
      .then((res) => resolve({ data: res.data }))
  );
}
// export function rmv_prod(creds) {
//   return new Promise<{ data: any }>((resolve) =>
//   axios.delete(SERVER + `myProducts/${creds}`)
//       .then((res) => resolve({ data: res.data }))
//   );
// }
