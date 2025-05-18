import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../utils/Colors";
import Button from "./Button";
import FloatingActionButton from "./FloatingActionButton";
import firestore from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const GroupPage = ({ route, navigation }) => {
  const { group } = route.params;
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadGroupData = async () => {
      try {
        const docRef = doc(firestore, "groups", group.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const groupData = docSnap.data();
          setItems(groupData.items || []);
        }
      } catch (error) {
        console.error("Error loading group data: ", error);
      }
    };

    loadGroupData();
  }, [group.id]);

  async function addItem() {
    if (newItem.trim()) {
      try {
        const updatedItems = [...items, newItem.trim()];
        const updatedGroup = { ...group, items: updatedItems };

        await setDoc(doc(firestore, "groups", group.id), updatedGroup);
        setItems(updatedItems);
        setNewItem("");
        setModalVisible(false);
      } catch (error) {
        console.error("Error adding item: ", error);
      }
    }
  }

  async function removeItem(index) {
    try {
      const newItems = [...items];
      newItems.splice(index, 1);
      const updatedGroup = { ...group, items: newItems };

      await setDoc(doc(firestore, "groups", group.id), updatedGroup);
      setItems(newItems);
    } catch (error) {
      console.error("Error removing item: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.groupName}>{group.name}</Text>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <Button text="Remove" onClick={() => removeItem(index)} />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <FloatingActionButton onPress={() => setModalVisible(true)} />

      {modalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Item</Text>
            <TextInput
              style={styles.input}
              value={newItem}
              onChangeText={setNewItem}
              placeholder="Enter item name"
            />
            <View style={styles.buttonContainer}>
              <Button text="Add" onClick={() => addItem()} />
              <Button text="Cancel" onClick={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default GroupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  groupName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.white,
    flex: 1,
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.ascent2,
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 8,
    width: "100%",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
