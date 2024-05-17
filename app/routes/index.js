import { NavigationContainer } from "@react-navigation/native";
import UserStack from "./userStackDrawer.routes";
import { AuthContext } from "../context/AuthContext";
import AuthStack from "./authStack.routes";
import { useCallback, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { AxiosContext } from "../context/AxiosContext";

export default function Routes() {
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);

  const loadJWT = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");

      console.log(token)

      if(token) {
        authAxios.get("/authenticated");

        authContext.setAuthState({
          token: token,
          authenticated: true,
        });
      }

      throw new Error('Token error!');
    } catch (error) {
      await SecureStore.deleteItemAsync("access_token")
      authContext.setAuthState({
        token: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, []);

  return (
    <NavigationContainer>
      {authContext.authState.authenticated ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
