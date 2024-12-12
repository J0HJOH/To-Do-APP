import React, { useState, useReducer, useMemo } from "react";
import {
  Button, Text, View, Platform,
  StyleSheet,
  Dimensions, TouchableOpacity,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  SectionList,
} from "react-native";
import SearchComponent from "./components/searchBar"
import CategoryContainers from "./components/categoryContainer"
import categories from "./constants/categoryData.json"
import { ScrollView } from "react-native-gesture-handler";
import { IconSymbol } from "@/app-example/components/ui/IconSymbol";
import NeumorphicContainer from "./components/neumorphicContaner";
import TaskCard from './components/taskCard';
import TaskModal from './screens/addTaskModal';
import { useTasks, useTasksDispatch } from "./context/taskContext";
import TaskScrollView from "./components/taskScrollView";



const screenHeight = Dimensions.get("screen").height;



export default function Index({ navigation }) {

  ///using context API and useReducer 
  const { tasksList: taskCategory, dispatch } = useTasks();// fetch taskCategory from context
  const [searchString, setSearchString] = useState('');// a variable to store user's input while searching


  //useMemo for filtering through a list and keeping it's state intact
  const filteredCategory = useMemo(() => {
    // if search is empty return all task
    if (!searchString.trim()) {
      //it is empty
      return taskCategory;
      //works alright
    }

    //if the search string isn't empty return list that include search
    //return list first that you want to edit 
    const searchFilter = taskCategory.map(
      //changing each object in the list to return new list 
      category => ({
        ...category,
        //edited paramenter
        //return a new list that removes all task that doesn't contain searchstring
        //use filter to do that, 
        //note that this task after logic could be empty
        tasks: category.tasks.filter(
          //filter task that include search if tasklist isn't empty
          task => task?.task.toLowerCase().includes(searchString.toLowerCase())
        )
        //this returned list contains some empty task , filter it out
        //and return the categories that have non empty tasks
      })).filter(categories => categories.tasks.length > 0);

    return searchFilter;
  },
    [searchString, taskCategory])


  return (
    <View
      style={styles.background}
    //source={{uri : "https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg"}}
    >
      <KeyboardAvoidingView
        behavior={
          Platform.OS == "ios"
            ? "padding" : "height"
        }
        //ensures that the children in this avoidingView shows so we apply this styling
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}

        keyboardVerticalOffset={Platform.OS === "ios"
          ? 50 : 0}
      >
        <View
          showsVerticalScrollIndicator={false}
          style={styles.background}
        //style={{padding: 10}}
        >

          <SearchComponent
            //keeping track of the input by storing it in the saerchString variable
            value={searchString}
            //what to do when you start editing
            onChangeText={(value) => {
              setSearchString(value)

            }}
          />

          {/* Categories */}
          <FlatList
            data={taskCategory}
            scrollEnabled={false}
            ListHeaderComponent={(
              <Text style={styles.topText}>Categories</Text>
            )}
            numColumns={3}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={(
              <View style={{ width: 2 }} />
            )}
            renderItem={({ item }) =>
              <View style={[styles.card, {}]}>
                <CategoryContainers
                  title={item.category}
                />
              </View>
            }
          />

          {/*  Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.topText}>Today's Task</Text>
            <Text style={[styles.topText, { fontSize: 15, }]}>See all</Text>
          </View>

          {/* Task List */}
          <>
            {filteredCategory.length === 0
              ? (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text style={styles.topText}>Doesn't Exist</Text>
                </View>
              )
              : <TaskScrollView
                taskList={filteredCategory}

              />
            }
          </>

          <View>

          </View>

        </View>
      </KeyboardAvoidingView>

      {/* Add button and modal screen when button is clicked */}
      <TaskModal />

    </View>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    padding: 10,
    marginBottom: "9%",
    backgroundColor: "#E0E0E0",
  },
  modalContentContainer: {
    backgroundColor: "#E0E0E0",
    width: "100%",
    height: "auto",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    shadowColor: "#0f0e0e",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2

  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    minWidth: "80%",
    maxWidth: "80%",
    borderColor: "gray",
    fontSize: 25,
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  fab: {
    position: "absolute",
    bottom: "9%",
    width: "20%",
    height: "10%",
    zIndex: 2,
    backgroundColor: "#d4d2d2",
    right: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,

    shadowColor: "#0f0e0e",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2

  },

  listHeader: {
    position: "absolute",
    top: 0,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "green",
    color: "red"
  },
  sectionHeader: {
    displayl: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
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
  topText: {
    fontSize: 20,
    color: "#918484",
    marginTop: 10,
    marginBottom: 10,
  },
  titleText: {
    paddingStart: 10,
    fontSize: 15,
    textDecorationStyle: "double",
    color: "black",
    fontWeight: "600"

  },
});


