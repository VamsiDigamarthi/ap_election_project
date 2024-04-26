import axios from "axios";

export let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

// export const APIS = axios.create({
//   baseURL: "http://localhost:5001",
// });

export const APIS = axios.create({
  baseURL: "https://v-new-deployment-election-server.onrender.com/",
});
