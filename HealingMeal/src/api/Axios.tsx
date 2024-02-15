import axios from "axios";

const CustomAxios = axios.create({
  baseURL: "https://ekwls20.duckdns.org/",
});

export default CustomAxios;
