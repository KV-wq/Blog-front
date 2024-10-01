import axios from "axios";

const instance = axios.create({
  baseURL: "https://realblog-xfuyyabb.b4a.run/",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
