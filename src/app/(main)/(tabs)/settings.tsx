/* eslint-disable react/jsx-indent */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
/* eslint-disable react-native/no-color-literals */
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import NeumorphicContainer from '../../../components/NeumorphicContainer';
import { Ionicons } from '@expo/vector-icons';
import settingsData from '../../../constants/settingData.json';

const getIconName = (title: string) => {
  switch (title) {
    case 'Account':
      return 'person-add-outline';
    case 'Privacy and Security':
      return 'lock-closed';
    case 'About':
      return 'scan-circle';
    case 'Log Out':
      return 'arrow-forward-circle';
    default:
      return 'person-add-outline';
  }
};

function SettingsScreen() {
  return (
    <View style={styles.background}>
      {settingsData.map((setting) => (
        <NeumorphicContainer
          key={setting.id}
          styling={{
            marginBottom: 20,
            width: '100%',
          }}
          component={(
            <View style={styles.settingsItem}>
              <View style={styles.firstRow}>

                <Ionicons
                  name={getIconName(setting.title)}
                  size={30}
                  color="red"
                />
                <Text style={styles.textStyle}>{setting.title}</Text>
              </View>

              <TouchableOpacity>
                <Ionicons
                  name="arrow-forward-sharp"
                  color="red"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#E0E0E0',
    flex: 1,
    padding: 20,
  },
  firstRow: { alignItems: 'center', display: 'flex', flexDirection: 'row' },
  settingsItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  textStyle: {
    paddingStart: 7,
  },
});
export default SettingsScreen;
