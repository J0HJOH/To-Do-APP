/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
/* eslint-disable no-use-before-define */
import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import NeumorphicContainer from './NeumorphicContainer';

function NeumorphicHeader({ title, navigation }) {
    NeumorphicHeader.propTypes = {
        title: PropTypes.string,
        navigation: PropTypes.any,

    };
    return (
      <View style={styles.container}>
        <NeumorphicContainer
          styling={{ justifyContent: 'center' }}
          component={
                    (
                      <View style={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20,
                        }}
                      >
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                          <Ionicons
                            name="menu"
                            color="#080808"
                            size={30}
                          />
                        </TouchableOpacity>

                        <Text style={[styles.title, { marginLeft: '20%' }]}>{title}</Text>

                      </View>
                    )
                }
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0E0E0', // Light background color for neumorphism
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // headerBox: {
    //     width: '90%',
    //     height: 60,
    //     backgroundColor: '#E0E0E0', // Match container background for seamless effect
    //     borderRadius: 12,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // Shadows for neumorphism effect
    //     shadowColor: '#000', // Dark shadow
    //     shadowOffset: { width: 4, height: 4 },
    //     shadowOpacity: 0.2,
    //     // inset: 10,
    //     shadowRadius: 6,
    //     elevation: 6, // For Android
    //     // Inner light shadow
    //     // shadowColor: "#FFFFFF",
    //     // shadowOffset: { width: -4, height: -4 },
    //     // shadowOpacity: 0.7,
    //     // shadowRadius: 2,
    // },
    title: {
        color: '#555',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default NeumorphicHeader;
