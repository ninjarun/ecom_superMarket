
import axios from "axios";
import { SERVER } from "../globalVar";



export function login(creds) {
  return new Promise((resolve,reject) =>
    axios
      .post(`${SERVER}/login`,{ username:creds.user, password:creds.password })
      .then((res) => resolve({ data: res.data }))
      .catch((error)=>reject(error.data))

  );
}
