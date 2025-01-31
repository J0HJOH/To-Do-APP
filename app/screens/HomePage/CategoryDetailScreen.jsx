/* eslint-disable no-use-before-define */
/* eslint-disable react-native/no-color-literals */
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskScrollView from '../../components/TaskScrollView';
import { useTasks } from '../../context/TaskContext';

function CategorySectionScreen() {
    const route = useRoute();
    const { categoryName } = route.params; // Destructure passed params
    const { categoriesAndTasks } = useTasks();
    const collectionTask = categoriesAndTasks
        .find((category) => category.category === categoryName).tasks || [];

    // const navigation = useNavigation();

    return (

      <View style={{
            padding: 20,
            flex: 1,
        }}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.topText}>{categoryName}</Text>
        </View>
        <TaskScrollView
          taskList={collectionTask}
        />

      </View>
    );
}

const styles = StyleSheet.create({

    sectionHeader: {
        alignItems: 'center',
        displayl: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '15%',
    },

    topText: {
        color: '#201d1d',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },
});
export default CategorySectionScreen;
