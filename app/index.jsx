import React, { useState, useReducer } from "react";
import { Button, Text, View ,Platform,
   StyleSheet,
   Dimensions,
    Alert,
   FlatList,
   TextInput,
   TouchableOpacity,
   Modal,
   KeyboardAvoidingView,
   TouchableWithoutFeedback,
   Keyboard} from "react-native";
import SearchComponent from "./searchBar"
import CategoryContainers from "./categoryContainer"
import categories  from "./categoryData.json"
import { ScrollView } from "react-native-gesture-handler";
import { IconSymbol } from "@/app-example/components/ui/IconSymbol";
import NeumorphicContainer from "./neumorphicContaner";



//this reducer returns the state
function reducer(state, action){

 switch (action.status) {
  //toggle button
  case "toggle": 
  return state.map(task=>
    task.id === action.taskId 
    ? { ...task, done : !task.done} : task
    
);

  //delete task
  case "delete":
    //check the index of that paticular task by
    //filter it out by checking if the id of the item you clicked on matches 
    //the id on the list then and return the new array state
    return state.filter(task =>
      task.id !== action.taskId
    ) ;

    case "add" :
        return ([
            {id: (state.length + 1), task: action.text, done: false, fav: false},
            ...state
        ]);

  //like task
  case "like": 
  return state.map(task=>
    task.id === action.taskId 
    ? { ...task, fav : !task.fav} : task
    
);
 
  default:
    return state;
 }
};

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const initialState = [
  {id:1, task : "Go to work", done : true, fav: false},
  {id:2, task : "Wash cloth", done : true, fav : true},
  { id:3,task : "Dry my hair", done : false, fav: false},
  { id:4, task : "Eat Food", done: false, fav: false},
  { id:5, task : "Go to the gym", done: false, fav: true},
  { id: 6, task : "Go shopping", done: false, fav: true}
];





export default function Index({navigation}) {
  
//using useReducer
const [state, dispatch] = useReducer(reducer, initialState);
const [isModalVisible, setIsModalVisible] = useState(false);
const [taskText, setTask] = useState("");

 
  return (
    <View
      style={styles.background}
      //source={{uri : "https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg"}}
    >
      
      <ScrollView 
      showsVerticalScrollIndicator ={false}
      style={styles.background}
      //style={{padding: 10}}
      >

        <SearchComponent/>

        {/* Categories */}
       <FlatList
       data={categories}
       scrollEnabled ={false}
       ListHeaderComponent={(
        <Text style= {styles.topText}>Categories</Text>
      )}
      numColumns={3}
       keyExtractor={(item, index)=> index.toString() }
       ItemSeparatorComponent={(
        <View style={{ width: 2 }} />
       )}
      renderItem={({item}) => 
      <View style= {[styles.card, {} ]}>
        <CategoryContainers
        title={item.category}
        />
      </View>
      }
       />

       {/*  Section Header */}
       <View style={styles.sectionHeader}>
        <Text style= {styles.topText}>Today's Task</Text>
        <Text style= {[styles.topText, {fontSize: 15, }]}>See all</Text>
       </View>

       {/* Task List */}
       <>
        <FlatList
        data={state}
        scrollEnabled ={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item, index}) =>

          <View style={[styles.card, styles.taskItem, {padding: 10,}]}>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <TouchableOpacity
            onPress={() => 
              dispatch({status: "toggle", taskId : item.id})}
            >
            <IconSymbol name={
              item.done ? "circle.circle.fill" : "circle"
            }
             color={"red"} />
            </TouchableOpacity>
            <Text style ={[styles.titleText, {textDecorationLine : item.done ? "line-through" : "none"}]}>{item.task}</Text>
            </View>
            {item.done && ( 
               <TouchableOpacity
               onPress={() => dispatch({status: "delete", taskId : item.id})}
               >
                
              <IconSymbol name="trash" color={"red"}/>
               </TouchableOpacity>
              ) }
          </View>
        }
        />
       </>
       

      <View>
        
      </View>

      </ScrollView>

      {/* floating action btn */}
      <TouchableOpacity
      style={styles.fab}
      onPress={() => {setIsModalVisible(true)}}
      >
      <Text style={{fontSize : 40}}>+</Text>
      </TouchableOpacity>

      {/* Modal (add Task ) */}

      
      <Modal
      visible= {isModalVisible}
      animationType="fade"
      transparent
      >
        <TouchableOpacity
        style={styles.overlay}
        activeOpacity={0.5}
        onPress={() => setIsModalVisible(false)}
        >
            <KeyboardAvoidingView 
            onPress={()=>{}}
            behavior={
                Platform.OS == "ios" 
                ? "padding" : "height"
            }>
            <TouchableWithoutFeedback onPress={() =>{Keyboard.dismiss()}}>
                    
            <View style ={styles.modalContentContainer}>
            <Text style={styles.modalTitle}>Add a Task</Text>

            {/* Input Field */}

            <NeumorphicContainer
            styling={{
                height: "auto",
                
            }}
            component={(
                <TextInput
                inputMode="text"
                textAlignVertical="top"
                style={styles.input}
                placeholder="Enter your task"
                multiline
                placeholderTextColor={"black"}
                value={taskText}
                onChangeText={(text) => setTask(text)}
              />
            )}
            />

           

            {/* Save Task Button */}

            <TouchableOpacity
                style={[styles.fab, 
                    {bottom: 0, 
                        width: "auto", 
                        height: "auto",
                        padding: 10,
                        marginTop: 20,
                        right: "auto",
                        position: "relative",
                        shadowOffset:{width: 4, height: -4},
                    }]}
                >
                <Button title="Save"
                color={"green"}
             onPress={() => {
                if (taskText.trim()) {
                    dispatch({status : "add", text: taskText});
                    setTask(""); // Clear the input
                    setIsModalVisible(false); // Close the modal
                  } else {
                    alert("Please enter a task.");
                  }
             }}
              />

            </TouchableOpacity>


            
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </TouchableOpacity>
       
      </Modal>
      



    </View>
  );
}

const styles = StyleSheet.create({

  background : {
    flex: 1,
    padding: 20,
    marginTop: -15,
    marginBottom: "9%",
    backgroundColor: "#E0E0E0",
  },
  modalContentContainer :{
    backgroundColor: "#E0E0E0",
    width: "100%",
    height: "auto",
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    padding: 20,
    shadowColor: "#0f0e0e",
    shadowOffset:{width: 4, height:4},
    shadowOpacity: 0.6,
    shadowRadius: 2

  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    minWidth:"80%",
    maxWidth:"80%",
    borderColor: "gray",
    fontSize: 25,
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent:"center",
    backgroundColor:"white",
    alignItems:"center",
    backgroundColor:"#00000099",
},
  fab:{
    position: "absolute",
    bottom:"9%",
    width: "20%",
    height: "10%",
    zIndex: 2,
    backgroundColor:"#d4d2d2",
    right:"50%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 60,
    
    shadowColor: "#0f0e0e",
    shadowOffset:{width: 4, height:4},
    shadowOpacity: 0.6,
    shadowRadius: 2

  },

  listHeader : {
    position:"absolute",
    top:0,
    padding:10,
    marginBottom: 20,
    backgroundColor:"green",
    color:"red"
  },
  sectionHeader: {
    displayl: "flex",
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  taskItem:{
    display:"flex",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  card: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
    marginBlock: 10,
    margin:5,
    ...Platform.select({
        ios:{
            shadowColor: "#0e0a0a",
            shadowOffset:{width: -4, height: -4},
            shadowOpacity:0.2,
            shadowRadius:6,
            //light
            shadowColor: "#0f0e0e",
            shadowOffset:{width: 4, height:4},
            shadowOpacity: 0.6,
            shadowRadius: 2
        },
        android:{
            elevation:5,
            shadowColor: "#a71919",
            shadowOffset:{width: -4, height: -4},
            shadowOpacity:0.5,
            shadowRadius:4,
            //light
            shadowColor: "#faf7f7",
            shadowOffset:{width: 4, height:4},
            shadowOpacity:1,
            shadowRadius: 2
        },
        web:{
            shadowColor: "#333",
            shadowOffset:{width: 10, 
                height:15},
            shadowOpacity:0.3,
            shadowRadius:4
        }
    })
},
  topText :{
    fontSize: 20,
    color: "#918484",
    marginTop: 10,
    marginBottom: 10,
  },
  titleText:{
    paddingStart: 10,
    fontSize: 15,
    textDecorationStyle: "double", 
    color: "black",
    fontWeight:"600"

  },
});


