import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";

import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onRemove }) => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} {...todo} onRemove={onRemove} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
  },
});

export default TodoList;
