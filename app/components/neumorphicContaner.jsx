import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from 'prop-types';

const NeumorphicContainer = ({ component, styling }) => {

  NeumorphicContainer.propTypes = {
    component: PropTypes.element,
    styling: PropTypes.object

  };
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
    // shadowColor: "#FFFFFF", // Dark shadow
    // shadowOffset: { width: -6, height: -6 },
    // shadowOpacity:1,
    // shadowRadius: 2,
    // elevation: 6, // For Android


    shadowColor: "#0e0a0a", // Dark shadow
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6, // For Android

  },
});

export default NeumorphicContainer;
