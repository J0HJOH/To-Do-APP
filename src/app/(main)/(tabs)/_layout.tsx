/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NeumorphicHeader from '../../../components/HeaderComponent';

function Main() {
  return (
    <Tabs
      screenOptions={{
        header: ({ navigation }) => (
          <NeumorphicHeader
            title="To-Do App"
            navigation={navigation}
          />
        ),
        tabBarStyle: {
          position: 'absolute',
          marginBottom: 7,
          right: 0,
          width: '100%',
          borderRadius: 20,
          height: '10%',
          backgroundColor: '#E0E0E0',

          shadowColor: '#0e0a0a', // Dark shadow
          shadowOffset: { width: -6, height: -6 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 2, // For Android
        },
        tabBarItemStyle: {
          backgroundColor: '#E0E0E0',
          marginHorizontal: 3,
          margin: 5,
          shadowColor: '#0f0e0e',
          shadowOffset: { width: 5, height: 4 },
          shadowOpacity: 0.6,
          shadowRadius: 1,
          borderRadius: 30,
        },
        headerStyle: { backgroundColor: '#E0E0E0' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon(props) {
            return (
              <View>
                <Ionicons
                  name="home"
                  size={30}
                />
              </View>
            );
          },

        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          tabBarIcon(props) {
            return (
              <View>
                <Ionicons
                  name="book"
                  size={30}
                />
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon(props) {
            return (
              <View>
                <Ionicons
                  name="heart"
                  size={30}
                />
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon(props) {
            return (
              <View>
                <Ionicons
                  name="settings"
                  size={30}
                />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}

export default Main;
