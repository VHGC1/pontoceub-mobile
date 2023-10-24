import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { API_URL } from '../context/AuthContext'
import axios from 'axios'

const Home = () => {
  useEffect(() => {
    const test =async () => {
      const result = await axios.get(`${API_URL}/classes/1`);
      console.log(result);
    }
    test();
  }, [])
  


  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home;