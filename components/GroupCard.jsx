import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../utils/Colors";

const GroupCard = ({ groupData, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.groupName}>{groupData.name}</Text>
        <View style={styles.itemsContainer}>
          {groupData.items.map((item, index) => (
            <Text key={index} style={styles.itemText}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "45%",
    height: "250",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    margin: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contentContainer: {
    padding: 12,
    flex: 1,
  },
  groupName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 8,
  },
  itemsContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 4,
  },
});
