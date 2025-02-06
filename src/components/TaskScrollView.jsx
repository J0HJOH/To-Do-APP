/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import { FlatList } from 'react-native-gesture-handler';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { TaskPropType } from '../model/CategoryModel';
import TaskCard from './TaskCard';

// Use SectionList to render a list of tasks
// renderSectionHeader, renderItem

// const sectionData = [
// {title: "Work", data: ["Task 1", "Task 2", "Task 3"]},
//   ]

/**
 * i used the sectionList component to render the taskList in the index(HomePage)
 */

function TaskScrollView({
    taskList,
    isFavCard = false,
    cardStyle,
    secondComponent,
}) {
    return (
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>No Data here!!</Text>
          </View>
            )}
        renderItem={({ item }) => (
          <TaskCard
            eachTask={item}
            categoryId={`${item.id.split('_')[0].toLowerCase()}ID`}
            taskId={item.id}
            isFavCard={isFavCard}
            cardStyle={cardStyle}
            secondComponent={secondComponent}
          />
            )}
        contentContainerStyle={taskList.length === 0 && styles.flatListContainer}
      />
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1, // Ensures it takes the full space
        alignItems: 'center',
        justifyContent: 'center', // Centers vertically
        backgroundColor: 'yellow', // Example background color
    },
    emptyText: {
        fontSize: 16,
        color: '#555', // Example text color
        textAlign: 'center',
    },
    flatListContainer: {
        flex: 1, // Makes the FlatList fill the available space
        justifyContent: 'center', // Centers the empty component vertically
    },
});

TaskScrollView.propTypes = {
    // this is the category task list
    taskList: PropTypes.arrayOf(TaskPropType).isRequired,
    isFavCard: PropTypes.bool,
    cardStyle: PropTypes.object,
    secondComponent: PropTypes.element,
};

export default TaskScrollView;
