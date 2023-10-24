import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { onLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      console.log(result)
      alert(result.msg);
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.controls}>
        <TextInput
          placeholder="Email"
          style={styles.control}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.control}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <Button title="Sign in" onPress={login} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
    minWidth: 300,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});

export default Login;
