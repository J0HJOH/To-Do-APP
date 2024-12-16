import { StyleSheet, Text, View, ScrollView } from "react-native";
import NeumorphicContainer from "../components/neumorphicContaner";
import { FlatList } from "react-native-gesture-handler";
import { useTasks } from "../context/taskContext";
import TaskCard from "../components/taskCard";
import { useMemo, useState } from "react";
import TaskScrollView from '../components/taskScrollView'


const FavScreen = () => {

  const { tasksList: CategoryList } = useTasks();
  //const [isFavCard, setIsFavCard] = useState(false);



  return (
    <ScrollView style={{
      flex: 1,
      padding: 10,
      marginBottom: "20%",
      backgroundColor: "#E0E0E0"
    }}>
      <TaskScrollView
        taskList={CategoryList}
        isFavCard={true}
        secondComponent={(
          <Text style={styles.time}>10:30</Text>
        )}
        cardStyle={styles.favCard}

      />

      {/* <FlatList
                data={favList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {
                    return (

                        <TaskCard
                            index={index}
                            isFavCard={() => setIsFavCard(true)}
                            item={item}
                            cardStyle={styles.favCard}
                            secondComponent={(
                                <Text style={styles.time}>10:30</Text>
                            )}
                        />
                    )
                }}

            /> */}
    </ScrollView>
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
})

export default FavScreen;
