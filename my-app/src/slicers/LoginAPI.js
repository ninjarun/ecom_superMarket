import axios from "axios";
import { SERVER } from "../globalVar";



export function login(creds) {
  return new Promise((resolve,reject) =>
    axios
      .post(`${SERVER}/login`,{ username:creds.user, password:creds.password })
      .then((res) => resolve({ data: res.data }))
      // The crucial change is how we reject: instead of error.data (which might be undefined), 
      // we reject with the entire error object so LoginSlice can access the response.
      .catch((error)=>reject(error)) 
  );
}