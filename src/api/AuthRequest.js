// import axios from "axios";
import { APIS } from "../data/header";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "*");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

// const API = axios.create({ baseURL: "http://localhost:5001" });

// const API = axios.create({
//   baseURL: "https://v-new-deployment-election-server.onrender.com/",
// });

// export const logIn = (FormData) =>
//   APIS.post("/auth/login-verify-otp", FormData, {
//     headers: headers,
//   });

export const logIn = (FormData) =>
  APIS.post("/auth/login", FormData, {
    headers: headers,
  });
