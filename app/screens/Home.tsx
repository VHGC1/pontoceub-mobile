import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { API_URL } from '../context/AuthContext'
import axios from 'axios'
import * as SecureStore from "expo-secure-store";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home;