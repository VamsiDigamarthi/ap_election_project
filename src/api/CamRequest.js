import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8081" });

export const camsD = () => API.get("/all-cams");
