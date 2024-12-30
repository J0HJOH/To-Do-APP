import { FlatList } from "react-native-gesture-handler";
import TaskCard from "./TaskCard";
import React from "react";
import { TaskPropType } from "../model/CategoryModel";
import PropTypes from "prop-types";
import { Text, View } from "react-native";



// Use SectionList to render a list of tasks
// renderSectionHeader, renderItem

// const sectionData = [
// {title: "Work", data: ["Task 1", "Task 2", "Task 3"]},
//   ]

/**
 * i used the sectionList component to render the taskList in the index(HomePage)
 */

const TaskScrollView = ({
  taskList,
  isFavCard = false,
  cardStyle,
  secondComponent
}) => {

  return <FlatList
    data={taskList}
    keyExtractor={(item) => item.id.toString()}
    ListEmptyComponent={() => {
      return (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>No Data here!!</Text>
        </View>
      )
    }}
    renderItem={({ item }) => {
      return (
        <TaskCard
          eachTask={item}
          categoryId={Number(item.id.toString()[0])}
          taskId={item.id}
          isFavCard={isFavCard}
          cardStyle={cardStyle}
          secondComponent={secondComponent}
        />
      )



    }}
  />
};

TaskScrollView.propTypes = {
  //this is the category task list
  taskList: PropTypes.arrayOf(TaskPropType).isRequired,
  isFavCard: PropTypes.bool,
  cardStyle: PropTypes.object,
  secondComponent: PropTypes.element
};

export default TaskScrollView;
