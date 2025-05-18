import { StyleSheet, Text, View, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import COLORS from "../utils/Colors";
import Button from "./Button";

const NewGroupModal = ({ visible, closeModal, addnewGroup }) => {
  const [newGpName, setnewGpName] = useState("");
  const [error, setError] = useState("");

  function handleNewGpName() {
    if (newGpName.trim()) {
      addnewGroup(newGpName);
      closeModal();
      setError("");
      setnewGpName("");
    } else {
      setError("Name is mandatory");
    }
  }
  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <Text style={{ fontSize: 25 }}>List name</Text>
          <TextInput
            style={styles.textInput}
            value={newGpName}
            placeholder="Enter the List Name"
            onChangeText={(name) => {
              setnewGpName(name);
              setError("");
            }}
          ></TextInput>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <Button text="Add" onClick={() => handleNewGpName()} />
            <Button
              text="Cancel"
              onClick={() => {
                setnewGpName("");
                closeModal();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewGroupModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    borderColor: COLORS.primary,
    width: "300",
    borderRadius: 5,
    borderWidth: 2,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 3,
  },
  modalContainer: {
    padding: 5,
    backgroundColor: COLORS.ascent2,
    width: "350",
    height: "200",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 4,
    justifyContent: "space-evenly",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 2,
  },
});
