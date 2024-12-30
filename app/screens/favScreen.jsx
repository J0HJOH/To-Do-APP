import { StyleSheet, Text, View } from "react-native";
import { useTasks } from "../context/TaskContext";
import React from "react";
import TaskScrollView from '../components/TaskScrollView';

const FavScreen = () => {
  const { categoryList: CategoryList } = useTasks();

  //flatten all task then filter the favorites
  const favList = CategoryList.flatMap((item) => item.tasks).filter(task => task.fav);
  return (
    <View style={{
      flex: 1,
      padding: 10,
      marginBottom: "20%",
      backgroundColor: "#E0E0E0"
    }}>
      <TaskScrollView
        taskList={favList}
        isFavCard={true}
        secondComponent={(
          <Text style={styles.time}>10:30</Text>
        )}
        cardStyle={styles.favCard} />
    </View>
  )
};


const styles = StyleSheet.create({
  time: {
    color: "black",
    fontSize: 13,
  },
  favCard: {
    height: "20%",
    backgroundColor: "#d3d1d1",
    opacity: 0.6,
  }
});
export default FavScreen;
