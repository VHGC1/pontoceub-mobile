import "dayjs/locale/pt-br";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from "../context/AuthContext"

export default function HomeScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [hour, setHour] = useState(dayjs().locale("pt-br"));

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(dayjs());
    }, 1000 * 60);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("A permissão para acessar o local foi negada!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();

    return () => clearInterval(timer);
  }, []);

  async function timesheetRegistry() {
    const userId = await AsyncStorage.getItem("user-id");
      
    await axios
      .post(`${API_URL}/registries/create`, {
        id: userId,
        position: {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
      })
      .then((response) => console.log(response))
      .catch((e) => alert(e.response?.data.message));
  }

  return (
    <View style={styles.container}>
      {initialRegion ? (
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={initialRegion}>
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
            />
          </MapView>
        </View>
      ) : (
        <View style={[styles.mapContainer, styles.mapSkeleton]}></View>
      )}

      <View style={styles.clockContainer}>
        <Text></Text>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          {hour.format("HH:mm")}
        </Text>
        <MaterialCommunityIcons
          name={"clock-outline"}
          size={35}
          color="black"
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={timesheetRegistry}>
        <Text style={{ fontSize: 15 }}>Registrar Ponto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 50,
  },

  mapContainer: {
    width: "80%",
    height: "50%",
    borderRadius: 25,
    overflow: "hidden",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapSkeleton: {
    backgroundColor: "#F6F6F6",
  },

  clockContainer: {
    backgroundColor: "#ccc",
    padding: 25,
    width: "80%",
    marginVertical: 30,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    fontSize: 25,
  },

  btn: {
    width: "80%",
    backgroundColor: "#ccc",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
