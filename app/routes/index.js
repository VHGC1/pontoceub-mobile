import { NavigationContainer } from "@react-navigation/native";
import UserStack from "./userStackDrawer.routes";
import { AuthContext } from "../context/AuthContext";
import AuthStack from "./authStack.routes";
import { useCallback, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AxiosContext } from "../context/AxiosContext";

export default function Routes() {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const loadJWT = useCallback(async () => {
    try {
      const value = await SecureStore.getItemAsync("access_token");
      const jwt = JSON.parse(value);

      await publicAxios.get("/authenticated", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      authContext.setAuthState({
        token: jwt,
        authenticated: true,
      });
    } catch (error) {
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
