import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import axios from "axios";
import { API_URL } from "../config/api";

export default class AddTask extends React.Component {
  backgroundColors = [
    "#009DAE",
    "#FF87CA",
    "#9AE66E",
    "#AA14F0",
    "#E9A6A6",
    "#2940D3",
  ];
  state = {
    name: "",
    color: this.backgroundColors[0],
  };

  addTask = async () => {
    const { name, color } = this.state;

    const task = { name, color, todos: [] };
    try {
      const response = await axios.post(API_URL, task)
    } catch (error) {
      alert(error)
    }
    this.setState({ name: "" });
    this.props.closeModal();
  };

  colorPicker() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorPicker, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={-100}
        behavior="padding"
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 32, right: 32 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" color={colors.dark} size={30} />
        </TouchableOpacity>

        {/* main container */}

        <View style={{ alignSelf: "stretch", marginHorizontal: 30 }}>
          <Text style={styles.title}> Add Task</Text>

          {/* input text */}

          <TextInput
            style={styles.input}
            placeholder="task name"
            onChangeText={(text) => this.setState({ name: text })}
          />

          {/* color picker */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            {this.colorPicker()}
          </View>

          {/* button */}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: this.state.color }]}
            onPress={() =>this.addTask()}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grey,
  },
  title: {
    fontSize: 24,
    marginBottom: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: colors.lightBlue,
    borderRadius: 5,
    paddingHorizontal: 16,
    alignItems: "center",
    height: 50,
  },
  button: {
    height: 50,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  colorPicker: {
    height: 30,
    width: 30,
    borderRadius: 4,
  },
});
