/* eslint-disable no-use-before-define */
/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTasks } from '../../../context/TaskContext';
import TaskScrollView from '../../../components/TaskScrollView';

function FavScreen() {
  const { categoriesAndTasks } = useTasks();

  // flatten all task then filter the favorites
  const favList = categoriesAndTasks.flatMap((item) => item.tasks).filter((task) => task.fav);

  return (
    <View style={{
      flex: 1,
      padding: 10,
      marginBottom: '20%',
      backgroundColor: '#E0E0E0',
    }}
    >
      <TaskScrollView
        taskList={favList}
        isFavCard
        secondComponent={(
          <Text style={styles.time}>10:30</Text>
        )}
        cardStyle={styles.favCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  favCard: {
    backgroundColor: '#d3d1d1',
    height: '20%',
    opacity: 0.6,
  },
  time: {
    color: 'black',
    fontSize: 13,
  },
});
export default FavScreen;
