import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  EdgeInsetsPropType,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import Modal from "react-native-modal";
import { TextInput } from "react-native-gesture-handler";

const TodoListItem = ({
  id,
  text,
  checked,
  onRemove,
  onToggle,
  press,
  onEdit,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [editText, setEditText] = useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleChange = (newText) => {
    setEditText(newText);
  };

  const handleChangeSubmit = () => {
    // Side note : 상태 관리를 조금 더 용이하게 하려면, Redux 사용?
    // 예측되는 문제점 : 만약에 id가 같다면..? => ...
    // 1. filter나 map으로, todos을 수정 한 다음에
    // 2. App.js에 반영 (props drilling)
    onEdit(id, editText);
    toggleModal();
    setEditText("");
  };

  return (
    <View style={styles.container}>
      {/* Edit text modal */}
      <Modal isVisible={isModalVisible}>
        <SafeAreaView style={styles.modal}>
          <TextInput
            value={editText}
            autoCorrect={false}
            onChangeText={handleChange}
            placeholder="edit here"
          />
          <View style={styles.modalButtonContainer}>
            <Button title="취소" onPress={toggleModal} />
            <Button title="수정" onPress={handleChangeSubmit} />
          </View>
        </SafeAreaView>
      </Modal>
      <TouchableOpacity>
        <TouchableOpacity onPressOut={onToggle(id)}>
          {checked ? (
            <View style={styles.completeCircle}>
              <AntDesign name="circledowno" size={30} color="#3143e8" />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
      <Text
        style={[styles.text, checked ? styles.strikeText : styles.unstrikeText]}
        onLongPress={press}
      >
        {text}
      </Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={onRemove(id)}>
          <AntDesign name="delete" size={30} color="#e33057" />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={toggleModal}>
          <AntDesign name="edit" size={30} color="#e33057" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1,
  },
  text: {
    flex: 5,
    fontWeight: "500",
    fontSize: 18,
    marginVertical: 20,
    width: 100,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "blue",
    borderWidth: 2,
    marginRight: 20,
    marginLeft: 20,
  },
  completeCircle: {
    marginRight: 20,
    marginLeft: 20,
  },
  strikeText: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  unstrikeText: {
    color: "#29323c",
  },
  buttonContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  modal: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  modalButtonContainer: {
    flexDirection: "row",
  },
});

export default TodoListItem;
