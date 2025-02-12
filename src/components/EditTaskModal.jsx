/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
/* eslint-disable react-native/no-color-literals */
import {
    Text, View, Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    Pressable,
    Button,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import NeumorphicContainer from './NeumorphicContainer';
  import IconText from './IconText';
import { useTasks } from '../context/TaskContext';

function EditTaskModal({
    categoryId, taskId, visibility, closeModal,
}) {
    const [taskText, setTask] = useState('');
    const [isSaving, setisSaving] = useState(false);
    const [note, setNote] = useState('');

    const { editTask } = useTasks();
    const [date, setDate] = useState(new Date());
    const [dueDate, setDueDate] = useState('');
    const [time, setTime] = useState(new Date());
    const [dueTime, setDueTime] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleOnSave = async () => {
        if (taskText?.trim() !== '') {
            setisSaving(true);
            await editTask(categoryId, taskId, {
                task: taskText,
                time: dueTime,
                date: dueDate,
                description: note,
            });/// /////////////////////////////
            setisSaving(false);
            setNote('');
            setDueTime('');
            setDueDate('');
            setTask('');
            closeModal();
        } else {
            Alert.alert('Info', 'Input new information');
        }
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const toggleTimePicker = () => {
        setShowTimePicker(!showTimePicker);
    };

    const onChangeDate = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === 'android') {
                toggleDatePicker();
                setDueDate(date.toDateString());
            }
        } else {
            toggleDatePicker();
        }
    };

    const onChangeTime = ({ type }, selectedTime) => {
        if (type === 'set') {
            const currentTime = selectedTime;
            setTime(currentTime);
            if (Platform.OS === 'android') {
                toggleTimePicker();
                setDueTime(date.toTimeString());
            }
        } else {
            toggleTimePicker();
        }
    };

    const confirmIOSDate = () => {
        setDueDate(date.toDateString());
        toggleDatePicker();
    };
    const confirmIOSTime = () => {
        setDueTime(time.toTimeString());
        toggleTimePicker();
    };

    return (

      <Modal
        visible={visibility}
        animationType="fade"
        transparent
        presentationStyle="overFullScreen"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={0.5}
          onPress={closeModal}
        >
          <KeyboardAvoidingView
            behavior={
                        Platform.OS === 'ios'
                            ? 'padding' : 'height'
                    }
          >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>

              <View style={styles.modalContentContainer}>
                {/* Header */}
                <Text style={styles.modalTitle}>Edit Task</Text>

                {/* Task Input Field */}
                <NeumorphicContainer
                  styling={{
                                    width: '97%',
                                    padding: 10,
                                    justifyContent: 'center',
                                    marginBottom: '5%',
                                    marginTop: 15,
                                }}
                  component={(
                    <TextInput
                      inputMode="text"
                      textAlignVertical="top"
                      style={styles.input}
                      placeholder="Enter your task"
                      multiline
                      placeholderTextColor="#918e8e"
                      value={taskText}
                      onChangeText={(text) => setTask(text)}
                    />
                                )}
                />

                {/* Date */}
                <Text style={styles.modalTitle}>Date</Text>

                <Pressable
                  onPress={toggleDatePicker}
                >
                  <IconText
                    icon={(
                      <Ionicons
                        name="calendar"
                        size={25}
                        style={{ marginRight: 15 }}
                        color="red"
                        weight="heavy"
                      />
                                    )}
                    text={`${dueDate}` || 'Set Due date'}
                  />
                </Pressable>
                {showDatePicker
                                && (
                                <DateTimePicker
                                  mode="date"
                                  value={date}
                                  display="spinner"
                                  style={styles.datePicker}
                                  textColor="black"
                                  minimumDate={new Date()}
                                  onChange={onChangeDate}
                                />
                                )}
                {
                                showDatePicker && Platform.OS === 'ios'
                                && (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                  <Button
                                    title="Cancel"
                                    onPress={() => {
                                                toggleDatePicker();
                                            }}
                                  />
                                  <Button
                                    title="Confirm"
                                    onPress={() => { confirmIOSDate(); }}
                                  />
                                </View>
                                )
                            }

                {/* Set Time */}
                <Pressable onPress={toggleTimePicker}>

                  <IconText
                    icon={(
                      <Ionicons
                        name="clock.arrow.circlepath"
                        size={25}
                        style={{ marginRight: 15 }}
                        color="red"
                        weight="heavy"
                      />
                                    )}
                    text={`${dueTime.slice(0, dueTime.indexOf(' '))}` || 'Set Time'}
                  />
                </Pressable>

                {showTimePicker
                                && (
                                <DateTimePicker
                                  mode="time"
                                  value={time}
                                  display="spinner"
                                  style={styles.datePicker}
                                  textColor="black"
                                  minimumDate={new Date()}
                                  onChange={onChangeTime}
                                />
                                )}
                {
                                showTimePicker && Platform.OS === 'ios'
                                && (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                  <Button
                                    title="Cancel"
                                    onPress={() => {
                                                toggleTimePicker();
                                            }}
                                  />
                                  <Button
                                    title="Confirm"
                                    onPress={() => { confirmIOSTime(); }}
                                  />
                                </View>
                                )
                            }

                {/* Header */}
                <Text style={styles.modalTitle}>Extra Note</Text>

                {/* Extra Notes Field */}
                <NeumorphicContainer
                  styling={{
                                    height: '20%',
                                    width: '97%',
                                    padding: 10,
                                    marginTop: 15,
                                }}
                  component={(
                    <TextInput
                      inputMode="text"
                      textAlignVertical="top"
                      style={[styles.input, { fontSize: 17 }]}
                      placeholder="What's in your mind...."
                      multiline
                      placeholderTextColor="#918e8e"
                      value={note}
                      onChangeText={(text) => setNote(text)}
                    />
                                )}
                />

                {/* Save Task Button */}
                <TouchableOpacity
                  style={[styles.fab, styles.savBtn]}
                  onPress={() => {
                                    handleOnSave();
                                }}
                >

                  {
                                    isSaving
                                        ? <ActivityIndicator size="large" color="#ff5100" />
                                        : <Text>Save </Text>
                                }
                </TouchableOpacity>
                <Toast />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

        </TouchableOpacity>

      </Modal>
    );
}

EditTaskModal.propTypes = {
    categoryId: PropTypes.string,
    taskId: PropTypes.string,
    visibility: PropTypes.bool,
    closeModal: PropTypes.func,
};
const styles = StyleSheet.create({

    // boxStyl: {
    //     width: '97%',
    //     borderWidth: 0,
    //     alignItems: 'center',
    //     marginBottom: 20,
    //     height: 40,
    //     backgroundColor: '#E0E0E0', // Match container background for seamless effect
    //     borderRadius: 30,
    //     shadowColor: '#0e0a0a', // Dark shadow
    //     shadowOffset: { width: 6, height: 6 },
    //     shadowOpacity: 0.6,
    //     shadowRadius: 6,
    //     elevation: 6, // For Android

    // },
    datePicker: {
        height: 5,
        marginTop: -10,
    },

    fab: {
        alignItems: 'center',
        backgroundColor: '#d4d2d2',
        borderRadius: 60,
        bottom: '9%',
        height: '10%',
        justifyContent: 'center',
        position: 'absolute',
        right: '40%',
        shadowColor: '#0f0e0e',

        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        width: '20%',

    },
    input: {
        borderColor: 'gray',
        fontSize: 20,
        height: '100%',
        padding: 10,
        paddingLeft: 15,
    },
    modalContentContainer: {
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        marginTop: '20%',
        padding: 15,
        shadowColor: '#0f0e0e',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        width: '100%',

    },
    modalTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    overlay: {
        backgroundColor: '#00000099',
        flex: 1,
        padding: 20,
    },
    savBtn: {
        bottom: 0,
        height: 'auto',
        marginTop: 20,
        padding: 10,
        position: 'relative',
        right: 'auto',
        shadowOffset: { width: 4, height: -4 },
        width: '97%',
    },
});

export default EditTaskModal;
