/* eslint-disable no-use-before-define */
/* eslint-disable react-native/no-color-literals */
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskScrollView from '../../components/TaskScrollView';
import { useTasks } from '../../context/TaskContext';

function CategorySectionScreen() {
  const { categoryName } = useLocalSearchParams();
  const { categoriesAndTasks } = useTasks();
  const collectionTask = categoriesAndTasks
    .find((category: { category: any; }) => category.category === categoryName).tasks || [];

  return (

    <View style={{
      padding: 20,
      flex: 1,
    }}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.topText}>{categoryName}</Text>
      </View>
      <TaskScrollView
        taskList={collectionTask}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  sectionHeader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '15%',
  },

  topText: {
    color: '#201d1d',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
});
export default CategorySectionScreen;
