import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";

export default AddTodo = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity>
        <AntDesign name="closesquare" color={colors.red} size={35} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
