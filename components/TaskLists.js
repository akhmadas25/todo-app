import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../Colors";

export default TaskLists = ({ task }) => {
  const countCompleted = task.todos.filter((todo) => todo.isCompleted).length;
  const countRemaining = task.todos.length - countCompleted;

  return (
    <View style={[styles.container, { backgroundColor: task.color }]}>
      <Text style={styles.title} numberOfLines={1}>
        {task.name}
      </Text>
      <View>
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <Text style={styles.completed}>{countRemaining}</Text>
          <Text style={styles.remaining}>reamaining</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.completed}>{countCompleted}</Text>
          <Text style={styles.remaining}>completed</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 12,
    alignItems: "center",
    borderRadius: 7,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  completed: {
    fontSize: 45,
    color: colors.grey,
  },
  remaining: {
    fontSize: 17,
    fontWeight: "300",
    color: colors.dark,
  },
});
