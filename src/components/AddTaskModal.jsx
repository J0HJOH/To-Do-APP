/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
import {
    Text, View, Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity, Alert,
    Modal,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    Pressable,
    Button,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import NeumorphicContainer from './NeumorphicContainer';
import IconText from './IconText';
import { useTasks } from '../context/TaskContext';

function TaskModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [taskText, setTask] = useState('');
    const [isSaving, setisSaving] = useState(false);
    const [note, setNote] = useState('');

    const [selected, setSelected] = useState(null);
    const { addTask, categoriesAndTasks } = useTasks();
    const [date, setDate] = useState(new Date());
    const [dueDate, setDueDate] = useState('');
    const [time, setTime] = useState(new Date());
    const [dueTime, setDueTime] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const selectOptions = categoriesAndTasks.map((cati) => ({
        key: cati.id,
        value: cati.category,
    }));

    const handleOnSave = async (category, task) => {
        console.log('type: ', typeof category);
        console.log('cate: ', category);

        if (category
            && category.trim() !== ''
            && task?.trim()
            && dueDate?.trim()
            && dueTime?.trim()) {
            console.log('cate: ', category);
            setisSaving(true);
            console.log('all input complete');
            console.log('type: ', typeof category);

            await addTask(category, {
                task,
                fav: false,
                done: false,
                time: dueTime,
                date: dueDate,
                description: note || null,
            });
            setisSaving(false);
            setDueDate('');
            setDueTime('');
            setSelected(null);
            setNote('');
            setTask('');
            setIsModalVisible(false);
        } else {
            console.log('cate: ', category);
            console.log('type: ', typeof category);
            Alert.alert(
                'Info',
                'Select a category and Please fill fields and date',
            );
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
    if (!isModalVisible) {
        return (
          <TouchableOpacity
            style={styles.fab}
            onPress={() => { setIsModalVisible(true); }}
          >
            <Text style={{ fontSize: 40 }}>+</Text>
          </TouchableOpacity>

        );
    }

    return (

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        presentationStyle="overFullScreen"
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={0.5}
          onPress={() => {
                    setIsModalVisible(false);
                    // this................................
                    setisSaving(false);
                }}
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
                <Text style={styles.modalTitle}>Add a Task</Text>

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

                {/* Category Selection */}
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={selectOptions}
                  save="value"
                  placeholder="Select Category"
                  inputStyles={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    height: 25,
                                }}
                  boxStyles={styles.boxStyl}
                  placeholderTextColor="#918e8e"
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

                {/* Reminder */}
                <Text style={styles.modalTitle}>Reminder</Text>
                <IconText
                  icon={(
                    <Ionicons
                      name="alarm.waves.left.and.right.fill"
                      size={25}
                      style={{ marginRight: 15 }}
                      color="red"
                      weight="heavy"
                    />
                                )}
                  text="Set a 30-minutes Reminder"
                />
                {/* Header */}
                <Text style={styles.modalTitle}>Extra Note</Text>

                {/* Extra Notes Field */}
                <NeumorphicContainer
                  styling={{
                                    height: '30%',
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
                                    handleOnSave(selected, taskText, dueDate, dueTime);
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

const styles = StyleSheet.create({

    boxStyl: {
        alignItems: 'center',
        backgroundColor: '#E0E0E0', // Match container background for seamless effect
        borderRadius: 30,
        borderWidth: 0,
        height: 40,
        marginBottom: 20,
        width: '97%',
        shadowColor: '#0e0a0a', // Dark shadow
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 6, // For Android

    },
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
        height: '100%',
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

export default TaskModal;
