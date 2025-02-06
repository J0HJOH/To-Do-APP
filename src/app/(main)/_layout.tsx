import React from 'react';
import { Stack } from 'expo-router';
import TaskProvider from '../../context/TaskContext';
// import CategorySectionScreen from './screens/HomePage/CategoryDetailScreen';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="category" options={{ headerShown: false }} />
      </Stack>
    </TaskProvider>
  );
}
