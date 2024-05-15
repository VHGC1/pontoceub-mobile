import { NavigationContainer } from "@react-navigation/native";
import UserStack from "./userStackDrawer.routes";
import { AuthContext } from "../context/AuthContext";
import AuthStack from "./authStack.routes";
import { useCallback, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export default function Routes() {
  const authContext = useContext(AuthContext);

  const loadJWT = useCallback(async () => {
    try {
      const value = await SecureStore.getItemAsync("access_token");
      const jwt = JSON.parse(value);

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
