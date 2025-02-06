/* eslint-disable react-native/no-color-literals */
import { View } from 'react-native';
import React from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskScrollView from '../../components/TaskScrollView';

function TaskScreen() {
    const { categoriesAndTasks } = useTasks();

    // Flatten all tasks
    const allTasksObject = categoriesAndTasks.flatMap((item) => item.tasks);
    return (
      <View style={{
            flex: 1,
            padding: 10,
            marginBottom: '20%',
            backgroundColor: '#E0E0E0',
        }}
      >

        <TaskScrollView
          taskList={allTasksObject}
        />

      </View>
    );
}

export default TaskScreen;
