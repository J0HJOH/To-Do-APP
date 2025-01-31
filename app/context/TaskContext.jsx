/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable indent */
/* eslint-disable no-use-before-define */
import React, {
    createContext, useContext,
    // useReducer,
    useState,
} from 'react';
// import initialTasks from '../constants/categoryData.json';
import PropTypes from 'prop-types';
import {
    collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc,
} from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import { db } from '../services/firebase';

// globally declare the context you want to create
export const TaskContext = createContext();
export default function TaskProvider({ children }) {
    const [categoriesAndTasks, setCategoriesandTasks] = useState([]);
    const [taskInd, setTaskInd] = useState(1);

    const addTask = (categoryName, newTask) => {
        const categoryId = `${categoryName.toLowerCase()}ID`;
        const newId = `tasks/${categoryName}_task${taskInd}`;

        // Prepare the task with a unique ID
        const taskWithId = { id: newId, ...newTask };

        try {
            // Update the state optimistically
            setCategoriesandTasks((prev) => {
                const updatedCategories = prev.map((category) => {
                    if (category.id === categoryId) {
                        return {
                            ...category,
                            tasks: [...category.tasks, taskWithId],
                        };
                    }
                    return category;
                });
                return updatedCategories;
            });

            setTaskInd((prevTaskInd) => prevTaskInd + 1);

            // Notify user of success
            Toast.show({
                type: 'info',
                text1: 'Task being added...',
                position: 'bottom',
            });

            // Attempt to sync with backend
            addTaskBackend(categoryName, newTask);

            Toast.show({
                type: 'success',
                text1: 'Task Added Successfully!',
                position: 'bottom',
            });
        } catch (error) {
            // Handle any errors
            console.error('Error adding task:', error);

            Toast.show({
                type: 'error',
                text1: 'Failed to Add Task',
                text2: 'Please try again later.',
                position: 'bottom',
            });

            // Roll back state if necessary
            setCategoriesandTasks((prev) => {
                const updatedCategories = prev.map((category) => {
                    if (category.id === categoryId) {
                        return {
                            ...category,
                            tasks: category.tasks.filter((task) => task.id !== newId),
                        };
                    }
                    return category;
                });

                return updatedCategories;
            });
        }
    };

    const addTaskBackend = async (categoryName, taskData) => {
        const categoryId = `${categoryName.toLowerCase()}ID`;

        try {
            const collectionDocRef = doc(db, `categories/${categoryId}`);
            const docSnap = await getDoc(collectionDocRef);

            // if that collection doc exists
            if (docSnap.exists()) {
                // upload the task there
                const taskRef = doc(collectionDocRef, `tasks/${categoryName}_task${taskInd}`);
                await setDoc(
                    taskRef,
                    taskData,
                );
            } else {
                // create a new category

                const newCategory = async () => {
                    await setDoc(collectionDocRef, {
                        category: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`,
                    });
                };
                newCategory();
                const taskRef = doc(collectionDocRef, `tasks/${categoryName}_task1`);
                await setDoc(
                    taskRef,
                    taskData,
                );
            }
            Toast.show({
                type: 'success',
                text1: 'Task Updated',
                position: 'top',
            });
        } catch (error) {
            console.error('Error adding document: ', error);
            Toast.show({
                type: 'error',
                text1: `error: ${error}`,
                position: 'top',
            });
            fetchTask();
        }
    };

    const deleteTask = (categoryId, taskId) => {
        console.log('delete');

        setCategoriesandTasks((prev) => {
            const updatedCategories = prev.map((category) => {
                if (category.id === categoryId) {
                    return {
                        ...category,
                        tasks: category.tasks.filter((task) => task.id !== taskId),
                    };
                }
                return category;
            });

            return updatedCategories;
        });

        // Update the backend asynchronously
        deleteTaskBackend(categoryId, taskId);
    };

    const deleteTaskBackend = async (categoryId, taskId) => {
        console.log('back delete');

        try {
            // Reference a specific document in the "education" collection
            const educationDocRef = doc(db, `categories/${categoryId}`, `tasks/${taskId}`);

            // Add a document to the "tasks" subcollection
            await deleteDoc(educationDocRef);
            Toast.show({
                type: 'success',
                text1: 'Task Deleted',
                position: 'bottom',
            });
        } catch (error) {
            console.error('Error adding document: ', error);
            Toast.show({
                type: 'error',
                text1: `An error occured ${error}`,
                position: 'bottom',
            });
            fetchTask();
        }
    };

    const editTask = (categoryId, taskId, docData) => {
        setCategoriesandTasks((prev) => {
            const updatedCategories = prev.map((category) => {
                if (category.id === categoryId) {
                    return {
                        ...category,
                        tasks: category.tasks.map((task) => {
                            if (task.id === taskId) {
                                // Filter out unchanged properties
                                const updatedData = Object.keys(docData).reduce((acc, key) => {
                                    if (docData[key] && docData[key] !== task[key]) {
                                        acc[key] = docData[key];
                                    }
                                    return acc;
                                }, {});
                                if (Object.keys(updatedData).length === 0) {
                                    return task;
                                }
                                return { ...task, ...updatedData };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            });

            return updatedCategories;
        });

        // Update the backend asynchronously
        editTaskBackend(categoryId, taskId, docData);
    };

    const editTaskBackend = async (categoryId, taskId, docData) => {
        try {
            // Reference a specific document in the "education" collection
            const educationDocRef = doc(db, `categories/${categoryId}`);

            // Reference the "tasks" doc in the tasksubcollection
            const tasksCollectionRef = doc(educationDocRef, `tasks/${taskId}`);

            // Get the current task data
            const taskSnapshot = await getDoc(tasksCollectionRef);

            const currentData = taskSnapshot.data();

            // Filter out unchanged properties
            const updatedData = Object.keys(docData).reduce((acc, key) => {
                if (docData[key] && docData[key] !== currentData[key]) {
                    acc[key] = docData[key];
                }
                return acc;
            }, {});

            if (Object.keys(updatedData).length === 0) {
                console.log('No changes detected');
                Toast.show({
                    type: 'info',
                    text1: 'No changes made to the task',
                    position: 'bottom',
                });
                return;
            }

            // Update the document with the new data
            await updateDoc(tasksCollectionRef, updatedData);
            fetchTask();

            Toast.show({
                type: 'success',
                text1: 'Task Edited',
                position: 'bottom',
            });
            console.log('Uploaded ');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const toggleFav = (categoryId, taskId) => {
        setCategoriesandTasks((prev) => {
            const updatedCategories = prev.map((category) => {
                if (category.id === categoryId) {
                    return {
                        ...category,
                        tasks: category.tasks.map(
                            (task) => (task.id === taskId ? { ...task, fav: !task.fav } : task),
                        ),
                    };
                }
                return category;
            });

            return updatedCategories;
        });

        // Update the backend asynchronously
        toggleFavBackend(categoryId, taskId);
    };
    const toggleFavBackend = async (categoryId, taskId) => {
        try {
            // Reference a specific document in the "education" collection
            const educationDocRef = doc(db, `categories/${categoryId}`, `tasks/${taskId}`); // Replace "specificDocId" with the actual document ID

            const querySnap = await getDoc(educationDocRef);

            if (querySnap.exists()) {
                // Get the current value of "fav"
                const currentFavValue = querySnap.data().fav;
                console.log('former:', currentFavValue);

                // Toggle the value
                const newFavValue = !currentFavValue;

                // Update the document with the new value
                await updateDoc(educationDocRef, { fav: newFavValue });
            } else {
                console.log('Document does not exist!');
                Toast.show({
                    type: 'info',
                    text1: 'Error Occured, Task does not exist!',
                    position: 'bottom',
                });
                fetchTask();
            }

            console.log('Fetched ');
        } catch (error) {
            console.error('Error Liking Doc: ', error);
            fetchTask();
            Toast.show({
                type: 'error',
                text1: `Error Occured: ${error}`,
                position: 'bottom',
            });
        }
    };

    const toggleDone = (categoryId, taskId) => {
        setCategoriesandTasks((prev) => {
            const updatedCategories = prev.map((category) => {
                if (category.id === categoryId) {
                    return {
                        ...category,
                        tasks: category.tasks.map(
                            (task) => (task.id === taskId ? { ...task, done: !task.done } : task),
                        ),
                    };
                }
                return category;
            });

            return updatedCategories;
        });

        // Update the backend asynchronously
        toggleDoneBackend(categoryId, taskId);
    };

    const toggleDoneBackend = async (categoryId, taskId) => {
        try {
            // Reference a specific document in the "education" collection
            const educationDocRef = doc(db, `categories/${categoryId}`, `tasks/${taskId}`);

            const querySnap = await getDoc(educationDocRef);

            if (querySnap.exists()) {
                // Get the current value of "fav"
                const currentDoneValue = querySnap.data().done;
                console.log('former:', currentDoneValue);

                // Toggle the value
                const newDoneValue = !currentDoneValue;

                // Update the document with the new value
                await updateDoc(educationDocRef, { done: newDoneValue });

                console.log(`Done toggled to: ${newDoneValue}`);
            } else {
                console.log('Document does not exist!');
                Toast.show({
                    type: 'info',
                    text1: 'Error Occured, Task does not exist!',
                    position: 'bottom',
                });
                fetchTask();
            }
            console.log('Fetched ');
        } catch (error) {
            console.error('Error Completing Task: ', error);
            Toast.show({
                type: 'error',
                text1: `Error Occured: ${error}`,
                position: 'bottom',
            });
            fetchTask();
        }
    };

    const fetchTask = async () => {
        console.log('fetching Tasks');

        try {
            // Step 1: Reference the categories collection
            const categoriesCollectionRef = collection(db, 'categories');

            // Step 2: Get all documents in the categories collection
            const categoriesSnapshot = await getDocs(categoriesCollectionRef);

            // Temporary array to store categories and their tasks
            const categoriesWithTasks = [];

            // Step 4: Iterate through each document in the categories collection
            for (const categoryDoc of categoriesSnapshot.docs) {
                const categoryId = categoryDoc.id; // Get the category document ID

                // Step 5: Reference the tasks subcollection for this category
                const tasksCollectionRef = collection(db, 'categories', categoryId, 'tasks');

                // Step 6: Get all documents in the tasks subcollection
                const tasksSnapshot = await getDocs(tasksCollectionRef);

                // Step 7: Map tasks to an array
                const tasks = tasksSnapshot.docs.map((taskDoc) => ({
                    id: taskDoc.id,
                    ...taskDoc.data(),
                }));

                // Step 8: Construct the structured object for the category
                categoriesWithTasks.push({
                    id: categoryId,
                    category: categoryDoc.data().category, // Assuming the category name is stored in the "category" field
                    tasks,
                });
            }

            // Step 8: Update the state with the aggregated tasks
            setCategoriesandTasks(categoriesWithTasks);

            Toast.show({
                type: 'success',
                text1: 'Task Fetched',
                position: 'bottom',
            });
        } catch (error) {
            console.log('Fetching error', error);
        }
    };

    // define the Ui components that would be using the context this TaskProvider
    // will be providing, the context value will be passed by the prop value
    return (
      <TaskContext.Provider value={{
            // categoryList, dispatch
            addTask, deleteTask, fetchTask, categoriesAndTasks, editTask, toggleDone, toggleFav,
        }}
      >
        {children}
      </TaskContext.Provider>
    );
}

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
   * get the context value for the following functions
   * deleteTask(),
   * fetchTask(),
   * editTask(),
   * toggleDone,
   * toggleFav,
   * addTask
   * and the CategorySectionList; categoriesAndTasks = []
   */
export function useTasks() {
    const context = useContext(TaskContext);

    // Ensures this context is not used outside its consumer
    if (!context) {
        throw new Error(
            'useTasks must be used within a TaskProvider',
        );
    }

    return context;
}
