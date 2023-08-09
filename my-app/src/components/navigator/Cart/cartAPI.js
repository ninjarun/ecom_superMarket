// export function fetchCart() {
//   return new Promise((resolve) =>
//     setTimeout(() => resolve({ data: amount }), 500)
//   );
// }

import axios from "axios";

export function fetchCart() {
  return new Promise((resolve) =>
  axios
      .get('http://localhost:3001/products' )
      .then((res) => resolve({ data: res.data }))
  );
}