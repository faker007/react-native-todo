import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TodoAdd from "./src/components/TodoAdd";
import TodoList from "./src/components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todos");
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };

  const storeData = async (value) => {
    try {
      const stringify = JSON.stringify(value);
      await AsyncStorage.setItem("todos", stringify);

      const result = await AsyncStorage.getItem("todos");
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

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

  const onRemove = (id) => (e) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onToggle = (id) => (e) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  useEffect(() => {
    if (todos.length > 0) {
      storeData(todos);
    }
  }, [todos]);

  useEffect(() => {
    async function fetchData() {
      const initialValue = await getData();
      if (initialValue !== null) {
        setTodos(initialValue);
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello, my todo</Text>
      <View style={styles.card}>
        <TodoAdd onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
          setTodos={setTodos}
        />
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
    color: "white",
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
