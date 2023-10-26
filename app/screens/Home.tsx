import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from 'react'
import { API_URL } from '../context/AuthContext'
import axios from 'axios'
import * as SecureStore from "expo-secure-store";

const Home = () => {
  useEffect(() => {
    axios.get(`${API_URL}/classes/1`).then(r => console.log(r.data));  
  }, [])
  
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
});

export default Home;