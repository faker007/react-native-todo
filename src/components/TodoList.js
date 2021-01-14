import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

import TodoListItem from "./TodoListItem";

const TodoList = ({
  todos,
  onToggle,
  onRemove,
  onEdit,
  setTodos,
  onDragEnd,
}) => {
  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TodoListItem
        {...item}
        onToggle={onToggle}
        onRemove={onRemove}
        press={drag}
        onEdit={onEdit}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        onDragEnd={({ data }) => onDragEnd(data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
  },
});

export default TodoList;
