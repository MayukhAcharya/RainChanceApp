import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");

  const locationKey = (text) => {
    axios({
      method: "get",
      url: `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=dxJMuUjS5LubMklps4i7Kq9cp7baULmh&q=${text}`,
    })
      .then((response) => {
        console.log(response.data[0].Key);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    locationKey(text);
  });
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your city"
        defaultValue={text}
        //onChangeText={(newText) => setText(newText)}
        onSubmitEditing={(value) => setText(value.nativeEvent.text)}
      />
      <Button title="Get key" onPress={() => locationKey()} />
      <Text>My city key is is</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
