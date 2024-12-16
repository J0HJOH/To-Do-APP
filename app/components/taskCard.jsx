
import { IconSymbol } from "@/app-example/components/ui/IconSymbol";
import {
  Button, Text, View, Platform,
  StyleSheet,

  TouchableOpacity
} from "react-native";
import { useTasks } from "../context/taskContext";
import { useState } from "react";

const TaskCard = ({
  //this is the category task list
  eachTask,
  taskId,
  //index of the the particular category
  index,
  categoryId,
  isFavCard,
  cardStyle,
  secondComponent }) => {

  //using the dispatch  context 
  const { dispatch } = useTasks();

  return (
    <View style={[styles.card, styles.taskItem, cardStyle,
    { padding: 20, }
    ]}

    >



      <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() =>
            dispatch({
              status: "toggle", payload: {
                categoryId: categoryId,
                taskId: taskId
              }
            })}
        >
          <IconSymbol name={
            eachTask.done ? "circle.circle.fill" : "circle"
          }
            color={"red"} />
        </TouchableOpacity>
        <Text style={[styles.titleText, {
          textDecorationLine:
            eachTask.done ? "line-through" : "none"
        }]}>{eachTask.task}</Text>
      </View>
      {secondComponent ?? null}

      {isFavCard
        ? (

          <TouchableOpacity
            onPress={() => dispatch({
              status: "toggle_like",
              payload: {
                categoryId: categoryId,
                taskId: taskId
              }
            })}
          >

            <IconSymbol
              name={
                eachTask.fav ? "heart.fill" : "heart"
              }
              color={"red"} />
          </TouchableOpacity>
        )
        :
        eachTask.done && (
          <TouchableOpacity
            onPress={() => dispatch({
              status: "delete",
              payload: {
                categoryId: categoryId,
                taskId: taskId
              }
            })}
          >

            <IconSymbol name="trash" color={"red"} />
          </TouchableOpacity>
        )
      }

    </View>
  )
}


//return the list of task



const styles = StyleSheet.create({

  taskItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  card: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
    marginBlock: 10,
    margin: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#0e0a0a",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        //light
        shadowColor: "#0f0e0e",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 2
      },
      android: {
        elevation: 5,
        shadowColor: "#a71919",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        //light
        shadowColor: "#faf7f7",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 2
      },
      web: {
        shadowColor: "#333",
        shadowOffset: {
          width: 10,
          height: 15
        },
        shadowOpacity: 0.3,
        shadowRadius: 4
      }
    })
  },
  titleText: {
    paddingStart: 10,
    fontSize: 15,
    textDecorationStyle: "double",
    color: "black",
    fontWeight: "600"

  },
})

export default TaskCard;
