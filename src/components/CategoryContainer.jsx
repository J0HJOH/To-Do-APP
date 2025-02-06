/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

function CategoryContainers({ title }) {
    return (

      <View style={styles.categoryCol}>
        <Ionicons
          size={30}
          color="red"
          name="male-female"
        />
        <Text style={styles.title}>{title ?? 'Title'}</Text>
      </View>

    );
}

CategoryContainers.propTypes = {
    title: PropTypes.string,
};

const styles = StyleSheet.create({

    categoryCol: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});
export default CategoryContainers;
