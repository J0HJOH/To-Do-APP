import React from 'react';
import { Stack } from 'expo-router';
import TaskProvider from '../context/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerTransparent: true,
          headerTitleStyle: {
            color: 'transparent',
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="signup"
          
        />
        <Stack.Screen
          name="login"
        />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </TaskProvider>
  );
}
