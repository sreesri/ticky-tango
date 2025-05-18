import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import COLORS from "../utils/Colors";

const Button = ({ text, onClick }) => {
  return (
    <View style={styles.rootContainer}>
      <Pressable onPress={() => onClick()} style={styles.pressableContainer}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: COLORS.primary,
    width: 100,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  pressableContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});
