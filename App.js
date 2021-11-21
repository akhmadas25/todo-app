import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from "react-native";
import TaskLists from "./components/TaskLists";
import colors from "./Colors";
import { AntDesign } from "@expo/vector-icons";
import dummy from "./dummy";
import AddTodo from "./components/AddTodo";

export default class App extends React.Component {
  state = {
    addModalVisible: false,
  };

  handleModal() {
    this.setState({ addModalVisible: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addModalVisible}
          onRequestClose={() => {
            this.setState({ addModalVisible: false });
          }}
        >
          <AddTodo />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo
            <Text style={{ fontWeight: "300", color: colors.lightPurple }}>
              Tasks
            </Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addTask}
            onPress={() => this.handleModal()}
          >
            <AntDesign name="addfile" size={35} color={colors.lightPurple} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "300", color: colors.dark }}>
            add task
          </Text>
        </View>
        <View style={{ height: 300, paddingLeft: 30 }}>
          <FlatList
            data={dummy}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <TaskLists task={item} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: "black",
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.dark,
    paddingHorizontal: 35,
  },
  addTask: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
