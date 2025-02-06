/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useState, useMemo, useEffect } from 'react';
import {
  Text, View, Platform,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import SearchComponent from '../../components/SearchBar';
import CategoryContainers from '../../components/CategoryContainer';
import TaskModal from '../../src/components/AddTaskModal';
import TaskCard from '../../components/TaskCard';
import { useTasks } from '../../context/TaskContext';
// import TaskScrollView from "../components/TaskScrollView";

export default function Index() {
  const [searchString, setSearchString] = useState('');// =>a variable to store user's input while searching

  const { fetchTask, categoriesAndTasks } = useTasks();
  const [isfetching, setisFetching] = useState(false);
  const navigator = useNavigation();

  useEffect(() => {
    // Fetch tasks when the component is mounted
    const fetchData = async () => {
      setisFetching(true); // Start loading
      await fetchTask(); // Fetch the tasks
      setisFetching(false); // Stop loading once tasks are fetched
    };

    fetchData();
  }, []);

  // useMemo for filtering through a list and keeping it's state intact
  const filteredCategory = useMemo(
    () => {
      // if search is empty return all task
      if (!searchString.trim()) {
        // it is empty
        return categoriesAndTasks;
        // works alright
      }

      // if the search string isn't empty return list that include search
      // return list first that you want to edit
      const searchFilter = categoriesAndTasks.map(
        // changing each object in the list to return new list
        (category) => ({
          ...category,
          // edited paramenter
          // return a new list that removes all task that doesn't contain searchstring
          // use filter to do that,
          // note that this task after logic could be empty
          tasks: category.tasks.filter(
            // filter task that include search if tasklist isn't empty
            (task) => task?.task.toLowerCase().includes(searchString.toLowerCase()),
          ),
          // this returned list contains some empty task , filter it out
          // and return the categories that have non empty tasks.
          // removed it because i changed the flatlist to a sectionlist
        }),
      );

      return searchFilter;
    },
    [searchString, categoriesAndTasks],
  );

  // // Extract categories
  const allCategoriesObject = filteredCategory.map((item) => ({
    id: item.id,
    category: item.category,
  }));

  // Flatten all tasks
  const allTasksObject = filteredCategory.flatMap((item) => item.tasks);

  const sections = [
    {
      title: 'Categories',
      type: 'Categories',
      data: [allCategoriesObject], // nested list of category objects
    },
    {
      title: 'Today\'s Tasks',
      type: 'Tasks',
      data: allTasksObject, // list of task objects
    },
  ];

  // render Categories section
  const renderGrid = ({ data }) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3} // Grid layout with 3 columns
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate('CategorySection', {
                categoryName: item.category,
              });
            }}
          >
            <CategoryContainers
              title={item.category}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );

  // Each section header
  const renderSectionHeader = ({ section: { title } }) => (
    // Section Header
    <View style={styles.sectionHeader}>
      <Text style={styles.topText}>{title}</Text>
      {title === 'Today\'s Tasks' && (
        <Pressable onPress={() => navigator.navigate('Task')}>
          <Text style={[styles.topText, { fontSize: 15 }]}>See all</Text>
        </Pressable>
      )}
    </View>
  );

  // render each task
  const renderItem = ({ item, section }) => {
    // categories
    if (section.type === 'Categories') {
      // item is an array of objects
      // Render the grid layout for categories
      return (
        renderGrid({ data: item })

      );
    }
    // Render tasks as a vertical list
    return (
      <TaskCard
        // item.tasks returns the list of task in that category
        eachTask={item}
        categoryId={`${item.id.split('_')[0].toLowerCase()}ID`}
        taskId={item.id}
      />
    );
  };

  return (
    <View
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding' : 'height'
        }
        // ensures that the children in this avoidingView shows so we apply this styling
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        keyboardVerticalOffset={Platform.OS === 'ios'
          ? 50 : 0}
      >
        <View
          style={styles.background}
        >
          {/* <Text>Welcome {user.displayName}</Text> */}

          <SearchComponent
            // keeping track of the input by storing it in the saerchString variable
            value={searchString}
            // what to do when you start editing
            onChangeText={(value) => {
              setSearchString(value);
            }}
          />

          {
            isfetching
              ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <ActivityIndicator size="large" color="green" />
                </View>
              )
              : (
                <SectionList
                  sections={sections}
                  showsVerticalScrollIndicator={false}
                  refreshing
                  onRefresh={() => { fetchTask(); }}
                  keyExtractor={(item, index) => {
                    if (item.id) {
                      return item.id.toString(); // For task objects
                    }
                    return index.toString(); // Fallback for any other case
                  }}
                  renderSectionHeader={renderSectionHeader}
                  renderItem={renderItem}
                  contentContainerStyle={sections.length === 0 ? { flex: 1 } : null}
                />
              )
          }
        </View>
        <Toast />
      </KeyboardAvoidingView>

      {/* Add button and modal screen when button is clicked */}
      <TaskModal />

    </View>
  );
}

const styles = StyleSheet.create({

  background: {
    backgroundColor: '#E0E0E0',
    flex: 1,
    marginBottom: '9%',
    padding: 10,
  },

  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    flex: 1,
    marginBlock: 10,

    margin: 5,
    ...Platform.select({
      ios: {
        // light
        shadowColor: '#0f0e0e',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
        shadowColor: '#faf7f7',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      web: {
        shadowColor: '#333',
        shadowOffset: {
          width: 10,
          height: 15,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },
  // listHeader: {
  //     backgroundColor: 'green',
  //     color: 'red',
  //     marginBottom: 20,
  //     padding: 10,
  //     position: 'absolute',
  //     top: 0,
  // },
  sectionHeader: {
    alignItems: 'center',
    displayl: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topText: {
    color: '#201d1d',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
});
