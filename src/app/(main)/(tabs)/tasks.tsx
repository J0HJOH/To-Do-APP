/* eslint-disable react-native/no-color-literals */
import { View } from 'react-native';
import React from 'react';
import { useTasks } from '../../../context/TaskContext';
import TaskScrollView from '../../../components/TaskScrollView';

function TaskScreen() {
  const { categoriesAndTasks } = useTasks();

  // Flatten all tasks
  interface Task {
    id: string;
    title: string;
    completed: boolean;
    task: string;
    done: boolean;
    fav: boolean;
  }

  interface Category {
    id: string;
    name: string;
    tasks: Task[];
  }

  interface TaskContextType {
    categoriesAndTasks: Category[];
  }

  const allTasksObject: Task[] = categoriesAndTasks.flatMap((item: Category) => item.tasks);
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
