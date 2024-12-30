
import {
  Button, Text, View, Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import NeumorphicContainer from "../components/NeumorphicContaner";
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";




const TaskModal = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskText, setTask] = useState("");
  const [selected, setSelected] = useState(null);
  //const [categoryText, setCategory] = useState("");
  const { dispatch, categoryList: categories } = useTasks();
  const dataOptions =
    categories.map((cati) => ({
      key: cati.id,
      value: cati.category
    }));


  const handleOnSave = () => {
    if (taskText.trim() && selected) {

      console.log("sel:", selected);
      console.log("cat:", categories);

      //check if listCati contains the input 
      if (categories.some(cati => cati.category.toLowerCase().trim() === selected.toLowerCase().trim())) {
        //gets the category 
        const selectedCategory = categories.find(cati => cati.category.toLowerCase().trim() === selected.toLowerCase().trim());

        //gets the category id
        const catiId = selectedCategory.id;
        console.log("category Id", catiId);


        //then adds it to that category
        dispatch({
          status: "add", payload: {
            text: taskText,
            categoryId: catiId,
          }
        });

        setTask(""); // Clear the input
        setSelected(null); // Clear the input
        setIsModalVisible(false); // Close the modal
        return;
      } else {
        alert("Not Among Categories please select category")
      }

    } else {
      alert("Please input a Task AND select a Category.");
    }
  }

  if (!isModalVisible) {
    return (
      <TouchableOpacity
        style={styles.fab}
        onPress={() => { setIsModalVisible(true) }}
      >
        <Text style={{ fontSize: 40 }}>+</Text>
      </TouchableOpacity>

    )
  } else {

    return (

      <Modal
        visible={isModalVisible}
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
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

              <View style={styles.modalContentContainer}>
                {/* Header */}
                <Text style={styles.modalTitle}>Add a Task</Text>

                {/* Task Input Field*/}
                <NeumorphicContainer
                  styling={{
                    height: "auto",
                    marginBottom: "5%"
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

                {/* Category Selection */}
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={dataOptions}
                  save="value"
                  inputStyles={{
                    fontSize: 22
                  }}
                  boxStyles={styles.boxStyl}
                />



                {/* Save Task Button */}

                <TouchableOpacity
                  style={[styles.fab, styles.savBtn]}
                >
                  <Button title="Save"
                    color={"green"}
                    onPress={() => { handleOnSave() }}
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
  savBtn: {
    bottom: 0,
    width: "auto",
    height: "auto",
    padding: 10,
    marginTop: 20,
    right: "auto",
    position: "relative",
    shadowOffset: { width: 4, height: -4 },
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
  boxStyl: {
    width: "70%",
    borderWidth: 0,
    alignItems: "center",
    height: 60,
    backgroundColor: "#E0E0E0", // Match container background for seamless effect
    borderRadius: 30,
    shadowColor: "#0e0a0a", // Dark shadow
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,// For Android

  },
  overlay: {
    flex: 1,
    justifyContent: "center",
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
    right: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,

    shadowColor: "#0f0e0e",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2

  },
});




export default TaskModal;
