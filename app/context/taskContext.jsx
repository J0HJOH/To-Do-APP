import { createContext, useContext, useReducer } from "react";
import initialTasks from '../categoryData.json'

//global declare the context you wnt to create
const TaskContext = createContext();
const TaskDispatchContext = createContext();
// const initialTasks = [
//     {id:1, task : "Go to work", done : true, fav: false},
//     {id:2, task : "Wash cloth", done : true, fav : true},
//     { id:3,task : "Dry my hair", done : false, fav: false},
//     { id:4, task : "Eat Food", done: false, fav: false},
//     { id:5, task : "Go to the gym", done: false, fav: true},
//     { id: 6, task : "Go shopping", done: false, fav: true}
//   ];

//this reducer returns the new state  of the old state that was stored
//after the action has been performed 

const generateTaskId = (category) =>
    category.tasks.length > 0
        ? category.tasks.slice(-1)[0].id + 1
        : category.id * 10 + 1;


function taskReducer(state, action) {
    console.log("Reducer called with action:", action);

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
                {if(category.id === action.payload.categoryId){
                    
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
            return state.map(category =>
                
                {
                    if(category.id === action.payload.categoryId){
                        
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
    const [tasksList, dispatch] = useReducer(taskReducer, initialTasks);

    //then define the Ui components that would be using the context this TaskProvider 
    //will be providing, the context value will be passed by the prop value
    return (
        <TaskContext.Provider value={tasksList}>
            <TaskDispatchContext.Provider value={dispatch}>
                {children}
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    )
};

export function useTasks() {
    return useContext(TaskContext);
}

export function useTasksDispatch() {
    return useContext(TaskDispatchContext);
}