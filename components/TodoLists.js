import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import colors from "../Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default class TodoLists extends React.Component {
  state = {
    name: this.props.task.name,
    color: this.props.task.color,
    todos: this.props.task.todos,
  };

  renderTodo = (todo) => {
    return (
      <View style={styles.todo}>
        <TouchableOpacity style={{ paddingRight: 5 }}>
          <Ionicons
            name={
              todo.isCompleted ? "ios-checkmark-done" : "ios-square-outline"
            }
            color={todo.isCompleted ? this.state.color : colors.dark}
            size={20}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.isCompleted ? "line-through" : "none",
              color: todo.isCompleted ? this.state.color : colors.dark,
            },
          ]}
        >
          {todo.title}
        </Text>
      </View>
    );
  };

  render() {
    const todoCount = this.state.todos.length;
    const completedTodo = this.state.todos.filter(
      (todo) => todo.isCompleted
    ).length;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" color={colors.dark} size={30} />
        </TouchableOpacity>

        <View style={[styles.section, styles.header]}>
          <View>
            <Text style={styles.title}>{this.state.name}</Text>
            <Text style={styles.count}>
              {completedTodo} of {todoCount} completed
            </Text>
          </View>
        </View>
        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={this.state.todos}
            renderItem={({ item }) => this.renderTodo(item)}
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
            style={[styles.input, { borderColor: this.state.color }]}
          />
          <TouchableOpacity
            style={[styles.button, { color: this.state.color }]}
          >
            <AntDesign name="plussquare" color={this.state.color} size={40} />
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
    color: colors.grey,
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
  todo: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
