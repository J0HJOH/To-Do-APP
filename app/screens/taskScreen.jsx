import { View } from "react-native";
import { useTasks } from "../context/TaskContext";
import TaskScrollView from '../components/TaskScrollView';
import React from "react";

const TaskScreen = () => {
  const { categoryList: categoryList } = useTasks();
  const tasks = categoryList.flatMap((item) => item.tasks);
  return (
    <View style={{
      flex: 1,
      padding: 10,
      marginBottom: "20%",
      backgroundColor: "#E0E0E0"
    }}>

      <TaskScrollView
        taskList={tasks}
      />

    </View>
  )
};

export default TaskScreen;
