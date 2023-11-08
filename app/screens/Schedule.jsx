import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Schedule = () => {
  const [id, setId] = useState();
  const [classes, setClasses] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("user-id")
      .then((r) => setId(r))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/classes/${id}`)
      .then((r) => setClasses(r.data))
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View>
          <Text style={styles.boxContainerTitle}>Aulas</Text>
          <View style={styles.lineBoxContainerHeader} />
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.daysContainer}>
            {classes?.map(({ day }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDay(index)}
                style={[
                  {
                    backgroundColor: index == selectedDay ? "#fff" : "#f2f2f2",
                  },
                  styles.daysButton,
                ]}
              >
                <Text
                  style={{
                    color: index == selectedDay ? "#000" : "#ccc",
                    fontWeight: index === selectedDay ? "bold" : "normal",
                  }}
                >
                  {day.charAt(0).toUpperCase() + day.substring(1, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.classesContainer}>
            {classes[selectedDay]?.classes.map(
              ({ schedule, discipline, campus }, index) => (
                <View key={campus + index}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={"clock-outline"}
                      size={15}
                      color="black"
                    />
                    <Text>{schedule}</Text>
                  </View>

                  <Text>{discipline}</Text>
                  <Text>{campus}</Text>
                </View>
              )
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 25,
  },

  boxContainer: {
    paddingTop: 25,
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 25,
  },

  lineBoxContainerHeader: {
    backgroundColor: "#000",
    height: 2,
    width: "100%",
  },

  boxContainerTitle: {
    marginLeft: 25,
    marginBottom: 10,
  },

  daysContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },

  daysButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  classesContainer: {
    flex: 3,
    flexDirection: "column",
    paddingVertical: 18,
    paddingHorizontal: 25,
    gap: 15,
  },
});

export default Schedule;