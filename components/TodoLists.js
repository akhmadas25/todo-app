import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import colors from "../Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { API_URL } from "../config/api";
import axios from "axios";

export default class TodoLists extends React.Component {
  state = {
    newTodo: "",
  };

  handleComplete = async (index) => {
    let task = this.props.task;
    task.todos[index].isCompleted = !task.todos[index].isCompleted;
    const data = task.todos;

    try {
      const response = await axios.put(API_URL + task.id, { todos: data });
    } catch (error) {
      alert(error);
    }
    this.props.updateTask(task);
  };

  addTodo = async () => {
    let task = this.props.task;
    task.todos.push({ title: this.state.newTodo, isCompleted: false });
    try {
      const response = await axios.put(API_URL + task.id, {
        todos: task.todos,
      });
    } catch (error) {
      alert(error);
    }
    this.props.updateTask(task);
    this.setState({ newTodo: "" });
    Keyboard.dismiss();
  };

  deleteTodo = async (index) => {
    let task = this.props.task;
    task.todos.splice(index, 1);
    try {
      const response = await axios.put(API_URL + task.id, {
        todos: task.todos,
      });
    } catch (error) {
      alert(error);
    }

    this.props.updateTask(task);
  };

  deleteTask = async () => {
    let task = this.props.task;
    try {
      const response = await axios.delete(API_URL + task.id, {
        todos: task.todos,
      });
    } catch (error) {
      alert(error);
    }

    this.props.updateTask(task);
  };

  renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity
          style={{ paddingRight: 5 }}
          onPress={() => this.handleComplete(index)}
        >
          <Ionicons
            name={
              todo.isCompleted ? "ios-checkmark-done" : "ios-square-outline"
            }
            color={todo.isCompleted ? this.props.task.color : colors.dark}
            size={20}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.isCompleted ? "line-through" : "none",
              color: todo.isCompleted ? this.props.task.color : colors.dark,
            },
          ]}
        >
          {todo.title}
        </Text>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => this.deleteTodo()}
        >
          <AntDesign name="closesquareo" color={colors.red} size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const task = this.props.task;
    const todoCount = task.todos.length;
    const completedTodo = task.todos.filter((todo) => todo.isCompleted).length;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" color={colors.dark} size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ position: "absolute", top: 70, right: 20, zIndex: 10 }}
          onPress={() => this.deleteTask()}
        >
          <Ionicons
            name="ios-checkmark-done-outline"
            color={colors.lightBlue}
            size={32}
          />
        </TouchableOpacity>

        <View style={[styles.section, styles.header]}>
          <View>
            <Text style={styles.title}>{task.name}</Text>
            <Text style={styles.count}>
              {completedTodo} of {todoCount} completed
            </Text>
          </View>
        </View>
        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={task.todos}
            renderItem={({ item, index }) => this.renderTodo(item, index)}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingVertical: 30,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, { borderColor: task.color }]}
            onChangeText={(text) => this.setState({ newTodo: text })}
            value={this.state.newTodo}
          />
          <TouchableOpacity
            style={[styles.button, { color: task.color }]}
            onPress={() => this.addTodo()}
          >
            <AntDesign name="plussquare" color={task.color} size={40} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginBottom: 20,
    marginLeft: 30,
    borderBottomWidth: 3,
    borderBottomColor: colors.lightBlue,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  count: {
    marginBottom: 8,
    color: colors.dark,
  },
  footer: {
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  todoContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.dark,
  },
  deleteButton: {
    paddingHorizontal: 16,
    marginLeft: 50,
    borderRadius: 5,
  },
});
