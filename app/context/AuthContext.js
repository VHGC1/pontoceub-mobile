import {createContext, useState} from 'react';
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });

  const logout = async () => {
    await SecureStore.deleteItemAsync("access_token")
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.token;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};