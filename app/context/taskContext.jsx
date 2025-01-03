import React, { createContext, useContext, useReducer } from "react";
import initialTasks from '../constants/categoryData.json';
import PropTypes from "prop-types";


//globally declare the context you want to create
const TaskContext = createContext();

const generateTaskId = (category) =>
  category.tasks.length > 0
    ? category.tasks.slice(-1)[0].id + 1
    : category.id * 10 + 1;

//this reducer returns the new state  of the old state that was stored
//after the action has been performed 

function taskReducer(state, action) {

  switch (action.status) {
    //toggle button
    case "toggle":
      return state.map(category => {
        if (category.id === action.payload.categoryId) {
          //the category that contains the task to be changed/toggled
          //return a list of that particular edited task
          return ({
            //the state of the list(old list)
            ...category,
            //what to change, get the tasklist and change the task at that id
            tasks: category.tasks.map(task =>
              task.id === action.payload.taskId
                ? { ...task, done: !task.done }
                : task

            )
          })
        }

        return category;
      }

      );

    //delete task
    case "delete":
      //check the index of that paticular task by
      //filter it out by checking if the id of the item you clicked on matches 
      //the id on the list then and return the new array state
      return state.map(category =>
      //get the category the task belong to
      {
        if (category.id === action.payload.categoryId) {

          return ({
            ...category,
            //delete it by modification and returns a new list
            tasks: category.tasks.filter(task =>
              //check all category and return list that fulfil this logic
              task.id !== action.payload.taskId
            )
          })
        }
        return category
      }
        //identify the task by editing the list, so retuen a list first

      );


    // Add Task to a category
    case "add":
      //check for the task category
      return state.map(category => {
        if (category.id === action.payload.categoryId) {

          //return a new list containing old array with modified item but first check to modify category object
          return ({

            ...category,
            tasks: ([
              //new object
              {
                id: generateTaskId(category),
                task: action.payload.text,
                done: false,
                fav: false
              },
              //old array
              ...category.tasks

            ])
          }
          )
        }

        return category
      }
      )

    //like task
    case "toggle_like":
      return state.map(category => {
        if (category.id === action.payload.categoryId) {
          //the category that contains the task to be liked/unlike
          //return a list of that particular edited task
          return ({
            //the state of the list(old list)
            ...category,
            //what to change, get the tasklist and like/unlike the task at that id
            tasks: category.tasks.map(task =>
              task.id === action.payload.taskId
                ? { ...task, fav: !task.fav }
                : task

            )
          })
        }
        return category

      }

      );


    default:
      return state;
  }
};

export default function TaskProvider({ children }) {
  //define the data whose context you want to keep track of
  const [categoryList, dispatch] = useReducer(taskReducer, initialTasks);

  //then define the Ui components that would be using the context this TaskProvider 
  //will be providing, the context value will be passed by the prop value
  return (
    <TaskContext.Provider value={{ categoryList, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
};


TaskProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useTasks() {
  const context = useContext(TaskContext);

  //Ensures this context is not used outside its consumer
  if (!context) {
    throw new Error(
      'useTasks must be used within a TaskProvider',
    );
  };

  return context;
}
