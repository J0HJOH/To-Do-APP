
import { Button, Text, View ,Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard} from "react-native";
import NeumorphicContainer from "../components/neumorphicContaner";

import { useState } from "react";
import { useTasks, useTasksDispatch } from "../context/taskContext";
    

const TaskModal = () => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskText, setTask] = useState("");
  const [categoryText, setCategory] = useState("");
  const dispatch = useTasksDispatch();
  const categories =useTasks();


  if(!isModalVisible) {
    return (
      <TouchableOpacity
      style={styles.fab}
      onPress={() => {setIsModalVisible(true)}}
      >
      <Text style={{fontSize : 40}}>+</Text>
      </TouchableOpacity>

    )
  }else{
    
    return (
      
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
          behavior={
              Platform.OS == "ios" 
              ? "padding" : "height"
          }>
          <TouchableWithoutFeedback onPress={() =>{Keyboard.dismiss()}}>
                  
          <View style ={styles.modalContentContainer}>
          <Text style={styles.modalTitle}>Add a Task</Text>

          {/* Input Field */}

          {/* Task Input*/}
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

          {/* Category Input */}

          <NeumorphicContainer
          styling={{
              height: "auto",
              
          }}
          component={(
              <TextInput
              inputMode="text"
              textAlignVertical="top"
              style={styles.input}
              placeholder="Input category"
              multiline
              placeholderTextColor={"black"}
              value={categoryText}
              onChangeText={(text) => setCategory(text)}
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
              if (taskText.trim() && categoryText.trim()) {
                const listCati = categories.map(category => {
                  console.log("List of categories: ", category.category);
                  
                  return category.category
                });
                console.log(listCati);
                
                //check if listCati contains the input not done yet
                //the dispatch payload currently defines categoryId instead of categoryText change it

                  dispatch({
                    status : "add", payload:{
                    text: taskText, 
                    categoryText: categoryText,
                    }
                  });
                  setTask(""); // Clear the input
                  setCategory(""); // Clear the input
                  setIsModalVisible(false); // Close the modal
                } else {
                  alert("Please input a Task AND Category.");
                }
           }}
            />

          </TouchableOpacity>


          
          </View>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

      </TouchableOpacity>
     
    </Modal>
  )
  }
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
  fab:{
    position: "absolute",
    bottom:"9%",
    width: "20%",
    height: "10%",
    zIndex: 2,
    backgroundColor:"#d4d2d2",
    right:"40%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 60,
    
    shadowColor: "#0f0e0e",
    shadowOffset:{width: 4, height:4},
    shadowOpacity: 0.6,
    shadowRadius: 2

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
  
  
  

export default TaskModal;