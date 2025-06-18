import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // your backend server
  
  withCredentials: true, // <- VERY IMPORTANT
});

export default instance;
