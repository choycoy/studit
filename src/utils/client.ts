import axios from "axios";

const SERVER_URL = process.env.NODE_ENV === "development" ? "http://localhost:5713" : process.env.VITE_SERVER_URL;
const client = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});
client.interceptors.response.use((res) => res);
export default client;
