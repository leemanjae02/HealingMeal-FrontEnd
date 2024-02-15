import axios from "axios";

const CustomAxios = axios.create({
  baseURL: "http://localhost:8080",
});

export default CustomAxios;
