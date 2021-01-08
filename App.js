import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";

import TodoAdd from "./src/components/TodoAdd";
import TodoList from "./src/components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (text) => {
    setTodos([
      ...todos,
      {
        id: Math.random().toString(),
        text,
        checked: false,
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello, my todo</Text>
      <View style={styles.card}>
        <TodoAdd onAddTodo={addTodo} />
        <TodoList todos={todos} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3143e8",
  },
  title: {
    color: "black",
    fontSize: 36,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: "300",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: 1,
    fontSize: 24,
    marginLeft: 24,
  },
});
