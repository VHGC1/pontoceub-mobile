import { View, Text, StyleSheet } from "react-native";
import { API_URL } from "../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const TimesheetList = () => {
  const [id, setId] = useState();
  const [timeSheetList, setTimeSheetList] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user-id").then((r) => setId(r));
  }, []);

  useFocusEffect(
    useCallback(() => {
      axios
      .get(`${API_URL}/registries/${id}`)
      .then((r) => setTimeSheetList(r.data));
    }, [id])
  )

  return (
    <View style={styles.container}>
      <View>
        {timeSheetList?.map(
          ({ activity, activityType, dateTimeRegistry, id }) => (
            <View key={id} style={{ marginVertical: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>
                  {dateTimeRegistry
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                </Text>
                <Text>{dateTimeRegistry.split("T")[1].substring(0, 5)}</Text>
              </View>
              <Text>{activityType}</Text>
              <Text>{activity}</Text>
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 25,
  },
});

export default TimesheetList;
