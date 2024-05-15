import { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const API_URL = "https://subtle-immortal-sailfish.ngrok-free.app/api";

const AxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: API_URL,
    headers: { "ngrok-skip-browser-warning": "skip-browser-warning" },
  });

  const publicAxios = axios.create({
    baseURL: API_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }
      return config;
    },
    (error) => {
      if (error.response.status === 401) {
        alert("Sessão expirada!");
        authContext.logout();
      }
      return Promise.reject(error);
    }
  );

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
