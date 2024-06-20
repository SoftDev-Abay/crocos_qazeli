import axios from "axios";

const http = axios.create({
  baseURL: "https://qazeli-new-back-dev.crocos.kz",
});

export default http;
