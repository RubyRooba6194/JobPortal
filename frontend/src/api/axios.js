import axios from "axios";

const instance = axios.create({
  baseURL: "https://jobportal-xxfb.onrender.com", // your backend server
  
  withCredentials: true, // <- VERY IMPORTANT
});

export default instance;
