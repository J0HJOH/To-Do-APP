/* eslint-disable react/jsx-indent */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
/* eslint-disable react-native/no-color-literals */
import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import NeumorphicContainer from '../../components/NeumorphicContainer';
import { IconSymbol } from '@/app-example/components/ui/IconSymbol';
import settingsData from '../../../constants/settingData.json';

const getIconName = (title) => {
    switch (title) {
        case 'Account':
            return 'person.circle.fill';
        case 'Privacy and Security':
            return 'lock';
        case 'About':
            return 'questionmark.circle.fill';
        case 'Log Out':
            return 'rectangle.portrait.and.arrow.forward';
        default:
            return 'person.circle';
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

                                <IconSymbol
                                  name={getIconName(setting.title)}
                                  size={30}
                                  color="red"
                                />
                                <Text style={styles.textStyle}>{setting.title}</Text>
                            </View>

                            <TouchableOpacity>
                                <IconSymbol
                                  name="arrowshape.forward.fill"
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
