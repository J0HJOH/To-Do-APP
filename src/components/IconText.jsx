/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

function IconText({ icon, text }) {
    IconText.propTypes = {
        icon: PropTypes.element,
        text: PropTypes.string,
        // editableText: PropTypes.bool,

    };
    return (
      <View style={styles.iconText}>

        {icon}
        <Text>{text}</Text>

      </View>

    );
}

const styles = StyleSheet.create({

    iconText: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 20,
        margin: 3,
    },
});

export default IconText;
