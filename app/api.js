import axios from "axios";
import { Platform } from "react-native";

const api = axios.create({
  baseURL: "https://subtle-immortal-sailfish.ngrok-free.app/api",
  headers: { "ngrok-skip-browser-warning": "skip-browser-warning" },
});

const getAccessToken = () => {
  const TOKEN_KEY = "timesheet_access_token";
  let getToken;
  if (Platform.OS === "web") {
    getToken = localStorage.getItem(TOKEN_KEY);
  } else {
    getToken = SecureStore.getItemAsync(TOKEN_KEY);
  }

  return getToken;
};

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      navigation.navigate("Login");
    }
    return Promise.reject(error);
  }
);

export default api;
