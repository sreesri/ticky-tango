import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import COLORS from "./utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import GroupCard from "./components/GroupCard";
import { FloatingAction } from "react-native-floating-action";
import React, { useEffect, useState } from "react";
import firestore from "./config/firebase";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import NewGroupModal from "./components/NewGroupModal";
import FloatingActionButton from "./components/FloatingActionButton";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupPage from "./components/GroupPage";
import uuid from "react-native-uuid";
import { useFocusEffect } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  async function loadData() {
    const groupsSs = await getDocs(collection(firestore, "groups"));
    var data = [];
    groupsSs.forEach((group) => {
      data.push(group.data());
    });
    console.log(data);
    setGroups(data);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  function renderGroupCard(group) {
    return (
      <GroupCard
        groupData={group}
        onPress={() => navigation.navigate("GroupPage", { group })}
      />
    );
  }

  async function addGroup(inName) {
    const newGroup = {
      id: uuid.v4(),
      name: inName,
      items: [],
    };
    console.log(newGroup);

    const docRef = await setDoc(
      doc(firestore, "groups", newGroup.id),
      newGroup
    );
    console.log("Document written with ID: ", docRef.id);
    setGroups([...groups, newGroup]);
  }

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <View style={styles.rootContainer}>
      <SafeAreaView style={styles.appContainer}>
        {groups.length === 0 ? (
          <Text>{"Empty list"}</Text>
        ) : (
          <FlatList
            data={groups}
            renderItem={({ item }) => renderGroupCard(item)}
            contentContainerStyle={styles.flatlistContent}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}
        <FloatingActionButton onPress={() => setModalVisible(true)} />
        <NewGroupModal
          visible={modalVisible}
          closeModal={() => closeModal()}
          addnewGroup={addGroup}
        />
      </SafeAreaView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={"Lists"} />
        <Stack.Screen
          name="GroupPage"
          component={GroupPage}
          options={({ route }) => ({ title: route.params.group.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appContainer: {
    flex: 1,
  },
  flatlistContent: {
    padding: 16,
  },
  columnWrapper: {
    gap: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.ascent2,
    width: "70%",
    height: "60%",
    alignSelf: "center",
    justifyContent: "center",
  },
});
