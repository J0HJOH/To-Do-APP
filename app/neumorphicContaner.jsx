import React from "react";
import { View, StyleSheet } from "react-native";

const NeumorphicContainer = ({ component , styling}) => {
  return (
    
    <View style={[styles.headerBox, styling]}>
    {component}
    </View>
  );
};

const styles = StyleSheet.create({
 
  headerBox: {
    width: "90%",
    height: 60,
    backgroundColor: "#E0E0E0", // Match container background for seamless effect
    borderRadius: 30,
    // justifyContent: "center",
    // alignItems: "center",
    // Shadows for neumorphism effect
    // Inner light shadow
    // shadowColor: "#311e1e",
    // shadowOffset: { width: -4, height: -4 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    
    // shadowColor: "#FFFFFF", // Dark shadow
    // shadowOffset: { width: 6, height: 6 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 6, // For Android

    
    shadowColor: "#0e0a0a", // Dark shadow
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 6, // For Android

  },
});

export default NeumorphicContainer;
