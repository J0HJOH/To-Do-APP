import { Text, View, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import TaskCard from "../components/taskCard";


const TaskScrollView = ({
  taskList,
  isFavCard = false,
  cardStyle,
  secondComponent
}) => {
  // Use SectionList to render a list of tasks
  // renderSectionHeader, renderItem

  // const sectionData = [
  // {title: "Work", data: ["Task 1", "Task 2", "Task 3"]},
  //   ]

  return taskList.map(category => {

    //if favCard is true return a list of fav tasks
    const listType = isFavCard
      ? category.tasks.filter(task => task.fav)
      : category.tasks;

    return (
      <View key={category.id}>

        <FlatList
          data={listType}
          key={category.tasks.id}
          scrollEnabled={false}
          //render Category
          renderItem={({ item, index }) => {
            return (

              <TaskCard
                // item.tasks returns the list of task in that category
                eachTask={item}
                categoryId={category.id}
                taskId={item.id}
                secondComponent={secondComponent}
                isFavCard={isFavCard}
                cardStyle={cardStyle}
                index={index}
              />
            )

          }
          }

        />
      </View>
    )
  }
  )


}

export default TaskScrollView;
