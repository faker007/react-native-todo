import React, { useState, useEffect, useReducer } from "react";
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
  function reducer(state, action) {
    switch (action.type) {
      case "GET_PAYLOAD":
        console.log(action.payload);
        return action.payload;
      case "ADD_TODO":
        return [
          ...state,
          {
            id: Math.random().toString(),
            text: action.text,
            checked: false,
          },
        ];
      case "REMOVE_TODO":
        return state.filter((todo) => todo.id !== action.id);
      case "TOGGLE_TODO":
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
        );
      case "EDIT_TODO":
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        );
      default:
        return state;
    }
  }

  const [todos, setTodos] = useState([]);
  const [state, dispatch] = useReducer(reducer, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todos");
      return jsonValue !== null
        ? dispatch({ type: "GET_PAYLOAD", payload: JSON.parse(jsonValue) })
        : null;
    } catch (e) {
      console.log("App.js:23:AsyncStorage에 문제가 있습니다. err : " + e);
    }
  };

  const storeData = async (value) => {
    try {
      const stringify = JSON.stringify(value);
      await AsyncStorage.setItem("todos", stringify);

      const result = await AsyncStorage.getItem("todos");
    } catch (e) {
      console.log("App.js:34:AsyncStorage에 문제가 있습니다. err : " + e);
    }
  };

  const addTodo = (text) => {
    if (text !== "" && text !== undefined && text !== null) {
      dispatch({ type: "ADD_TODO", text });
    }
  };

  const onRemove = (id) => (e) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  const onToggle = (id) => (e) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  const onEdit = (id, text) => {
    dispatch({ type: "EDIT_TODO", id, text });
  };

  useEffect(() => {
    // state(todos)가 변경될 때 마다, localStorage에 저장
    if (state.length > 0) {
      storeData(state);
    }
  }, [state]);

  useEffect(() => {
    // 초기에 App.js가 초기화될 때, localStorage에서 데이터 가져 옴.
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello, my todo</Text>
      <View style={styles.card}>
        <TodoAdd onAddTodo={addTodo} />
        <TodoList
          todos={state}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
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
