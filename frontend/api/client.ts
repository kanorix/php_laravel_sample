import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const client = axios.create({
  // baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  config.headers.Accept = "application/json";
  return config;
});

export default client;
