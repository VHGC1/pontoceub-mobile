import "react-native-gesture-handler";
import { AuthProvider } from "./app/context/AuthContext";
import Routes from "./app/routes";
import { AxiosProvider } from "./app/context/AxiosContext";

export default function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <Routes />
      </AxiosProvider>
    </AuthProvider>
  );
}
