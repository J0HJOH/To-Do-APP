import React, { useState, useMemo } from "react";
import {
  Text, View, Platform,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  SectionList
} from "react-native";
import SearchComponent from "../components/SearchBar";
import CategoryContainers from "../components/CategoryContainer";
import TaskModal from './AddTaskModal';
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";
//import TaskScrollView from "../components/TaskScrollView";


export default function Index() {

  ///using context API and useReducer
  const { categoryList: categoryList } = useTasks();  // =>  fetch taskCategory from context
  const [searchString, setSearchString] = useState('');// =>a variable to store user's input while searching


  //useMemo for filtering through a list and keeping it's state intact
  const filteredCategory = useMemo(() => {
    // if search is empty return all task
    if (!searchString.trim()) {
      //it is empty
      return categoryList;
      //works alright
    }

    //if the search string isn't empty return list that include search
    //return list first that you want to edit
    const searchFilter = categoryList.map(
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
        //and return the categories that have non empty tasks. 
        // removed it because i changed the flatlist to a sectionlist
      }));

    return searchFilter;
  },
    [searchString, categoryList])


  // Extract categories
  const allCategories = filteredCategory.map((item) => {
    return {
      id: item.id,
      cat: item.category
    }
  });

  // Flatten all tasks
  const tasks = filteredCategory.flatMap((item) => item.tasks);

  const sections = [
    {
      title: 'Categories',
      type: 'Categories',
      data: [allCategories],
    },
    {
      title: `Today's Tasks`,
      type: `Tasks`,
      data: tasks,
    },
  ];

  const renderGrid = ({ data }) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={3} // Grid layout with 3 columns
      renderItem={({ item }) => (
        <View style={[styles.card]}>
          <CategoryContainers
            title={item.cat}
          />
        </View>
      )}
    />
  );

  return (
    <View
      style={styles.background}
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
        >

          <SearchComponent
            //keeping track of the input by storing it in the saerchString variable
            value={searchString}
            //what to do when you start editing
            onChangeText={(value) => {
              setSearchString(value)

            }}
          />

          <SectionList
            sections={sections}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => {
              if (item.id) {
                return item.id.toString(); // For task and category objects
              }
              return index.toString(); // Fallback for any other case
            }}
            renderSectionHeader={({ section: { title } }) => (
              // Section Header
              <View style={styles.sectionHeader}>
                <Text style={styles.topText}>{title}</Text>
                {title == `Today's Tasks` && <Text style={[styles.topText, { fontSize: 15, }]}>See all</Text>}
              </View>
            )}
            renderItem={({ item, section }) => {
              // categories
              if (section.type === 'Categories') {
                //item is an array of objects
                // Render the grid layout for categories only once
                return (
                  renderGrid({ data: item })
                );
              } else {
                // Render tasks as a vertical list

                return <TaskCard
                  // item.tasks returns the list of task in that category
                  eachTask={item}
                  categoryId={Number(item.id.toString()[0])}
                  taskId={item.id}
                />
              }
            }}
            contentContainerStyle={sections.length === 0 ? { flex: 1 } : null}

          />
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
  card: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
    marginBlock: 10,

    margin: 5,
    ...Platform.select({
      ios: {
        //light
        shadowColor: "#0f0e0e",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 2
      },
      android: {
        elevation: 5,
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
    fontWeight: "bold",
    color: "#201d1d",
    marginTop: 10,
    marginBottom: 10,
  },
});


