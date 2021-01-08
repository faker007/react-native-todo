import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onRemove, onToggle, setTodos }) => {
  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TodoListItem
        {...item}
        onToggle={onToggle}
        onRemove={onRemove}
        press={drag}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        onDragEnd={({ data }) => setTodos(data)}
      />
    </View>
  );
  // <ScrollView contentContainerStyle={styles.listContainer}>
  //   {todos.map((todo) => (
  //     <TodoListItem
  //       key={todo.id}
  //       {...todo}
  //       onRemove={onRemove}
  //       onToggle={onToggle}
  //     />
  //   ))}
  // </ScrollView>
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
  },
});

export default TodoList;
