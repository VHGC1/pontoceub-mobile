import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "https://subtle-immortal-sailfish.ngrok-free.app/api",
  headers: { "ngrok-skip-browser-warning": "skip-browser-warning" },
});

const TOKEN_KEY = "timesheet_access_token";

const getAccessTokenWeb = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getAccessTokenMobile = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

api.interceptors.request.use(
  (config) => {
    if (Platform.OS === "web") {
      config.headers.Authorization = `Bearer ${getAccessTokenWeb()}`;
    } else {
      config.headers.Authorization = `Bearer ${getAccessTokenMobile()}`;
    }

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
