import { Button, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Group
            screenOptions={{
              headerStyle: { backgroundColor: "#ccc" },
              headerLeft: () => (
                <TouchableOpacity>
                  <MaterialCommunityIcons name="menu" size={35} color="#fff" />
                </TouchableOpacity>
              ),
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "",
                headerRight: () => (
                  <Button onPress={onLogout} title="Sign Out" />
                ),
              }}
            ></Stack.Screen>
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          ></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
