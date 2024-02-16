import axios from "axios";

const CustomAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export default CustomAxios;
