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
import AddTask from "./components/AddTask";
import { API_URL } from "./config/api";
import axios from "axios";

export default class App extends React.Component {
  state = {
    addModalVisible: false,
    tasks: [],
  };

  handleModal() {
    this.setState({ addModalVisible: !this.state.addModalVisible });
  }

  renderTask = (task) => {
    return <TaskLists task={task} updateTask={this.updateTask} />;
  };

  addTask = async (task) => {
    this.setState({
      tasks: [
        ...this.state.tasks,
        { ...task, id: this.state.tasks.length + 1, todos: [] },
      ],
    });
  };

  updateTask = async (task) => {
    this.setState({
      tasks: this.state.tasks.map((item) => {
        return item.id === task.id ? task : item;
      }),
    });
  };

  componentDidMount() {
    axios.get(API_URL).then((res) => {
      this.setState({ tasks: res.data });
    });
  }

  componentDidUpdate() {
    this.updateTask();
    axios.get(API_URL).then((res) => {
      this.setState({ tasks: res.data });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addModalVisible}
          onRequestClose={() => this.handleModal()}
        >
          <AddTask
            closeModal={() => this.handleModal()}
            addTask={this.addTask}
          />
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
            data={this.state.tasks}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderTask(item)}
            keyboardShouldPersistTaps="always"
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
    // justifyContent: "center",
    paddingTop: 125,
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
