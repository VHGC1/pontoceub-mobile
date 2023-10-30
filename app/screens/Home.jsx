import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion && (
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
      )}

      <View
        style={{
          backgroundColor: "#ccc",
          padding: 25,
          width: "80%",
          marginVertical: 30,
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10
        }}
      >
        <Text>19:10</Text>
        <MaterialCommunityIcons name={"clock-outline"} size={24} color="black" />
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text>Registrar Ponto</Text>
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

  btn: {
    width: "80%",
    backgroundColor: "#ccc",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
