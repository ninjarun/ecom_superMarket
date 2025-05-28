
import axios from "axios";
import { SERVER } from "../globalVar";

export function fetchProducts() {
  return new Promise((resolve) =>
    axios
      .get(`${SERVER}/products`)
      .then((res) => resolve({ data: res.data }))
  );
}

export function fetchOneProduct(productID) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${SERVER}/products`, {
        params: {
          id: productID,
        },
      })
      .then((res) => {
        resolve({ data: res.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
}


export function fetchCat(catID) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${SERVER}/products`, {
        params: {
          category: catID,
        },
      })
      .then((res) => {
        resolve({ data: res.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addProduct(prod) {
  return new Promise((resolve) =>
    axios
      .post(`${SERVER}/products`, prod, {
        headers: {
          "content-type": "multipart/form-data",
        }
      })
      .then((res) => resolve({ data: res.data }))
  );
}


export function editProduct(prod) {
  return new Promise((resolve, reject) =>
    axios
      .put(`${SERVER}/products`, prod, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => resolve({ data: res.data }))
      .catch((err) => {
        console.error("Error editing product:", err.response?.data || err.message);
        reject(err);
      })
  );
}

// export function editProduct(prod) {
//   return new Promise((resolve) =>
//     axios
//       .put(`${SERVER}/products`, prod, {
//         headers: {
//           "content-type": "multipart/form-data",
//         }
//       })
//       .then((res) => resolve({ data: res.data }))
//   );
// }

// export function removeProduct(prod) {
//   return new Promise((resolve) =>
//     axios
//       .delete(`${SERVER}/products`, {
//         data: prod,
//         headers: {
//           "content-type": "multipart/form-data",
//         }
//       })
//       .then((res) => resolve({ data: res.data }))
//   );
// }
export function removeProduct(prod) {
  return axios.delete(`${SERVER}/products`, {
    data: prod,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
}

