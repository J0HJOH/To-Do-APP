/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
/* eslint-disable react-native/no-color-literals */
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import NeumorphicContainer from './NeumorphicContainer';

function SearchContainer({
    /** The value that is gotten from the user  */
    value,
    /** a callBack function that is called when the user types */
    onChangeText,
}) {
    SearchContainer.propTypes = {
        value: PropTypes.string,
        onChangeText: PropTypes.func,

    };

    return (
      <NeumorphicContainer
        styling={{
                width: '90%',
                margin: 10,
            }}
        component={
                (
                  <View style={styles.row}>
                    <Ionicons
                      name="search"
                      color="#979191"
                      size={35}
                    />

                    <TextInput
                      editable
                            // going to use
                      placeholder="Search Here..."
                      value={value}
                      onChangeText={onChangeText}
                      autoCapitalize="sentences"
                      multiline
                      autoComplete="name-family"
                      cursorColor="#130f0f"
                      placeholderTextColor="black"
                      style={styles.inputField}
                    />
                  </View>

                )
            }
      />

    );
}

const styles = StyleSheet.create({
    inputField: {
        color: 'black',
        fontSize: 20,
        paddingStart: 20,
        width: '100%',

    },
    row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        width: '80%',
    },

});
export default SearchContainer;
