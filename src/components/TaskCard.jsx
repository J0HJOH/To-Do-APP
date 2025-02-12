/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import {
    Text, View, Platform,
    StyleSheet,

    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { TaskPropType } from '../model/CategoryModel';
import { useTasks } from '../context/TaskContext';
import EditTaskModal from './EditTaskModal';

function TaskCard({
    /* this is the category task list */
    eachTask,
    isFavCard,
    taskId,
    /* The category Id */
    categoryId = `${taskId.split('_')[0].toLowerCase()}ID`,
    // isFavCard = false,
    cardStyle = {},
    secondComponent,
}) {
    const { deleteTask, toggleFav, toggleDone } = useTasks();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const renderRightActions = () => (
      <RectButton
        style={[styles.leftAction, { backgroundColor: 'red' }]}
        onPress={() => {
                deleteTask(categoryId, taskId);
            }}
      >
        <Ionicons name="trash" color="white" />
      </RectButton>
    );

    // Function to render right swipe actions (Edit)
    const renderLeftActions = () => (
      <RectButton
        style={styles.rightAction}
        onPress={openModal}
      >
        <Ionicons name="pencil" color="white" />
      </RectButton>
    );

    return (
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
      >

        <View style={[styles.card, styles.taskItem, cardStyle,
            { padding: 20 },
            ]}
        >
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => toggleDone(categoryId, taskId)}
            >
              <Ionicons
                name={
                                eachTask.done ? 'circle.circle.fill' : 'circle'
                            }
                color="red"
              />
            </TouchableOpacity>
            <Text style={[styles.titleText, {
                        textDecorationLine:
                            eachTask.done ? 'line-through' : 'none',
                    }]}
            >
              {eachTask.task}
            </Text>
          </View>
          {secondComponent ?? null}

          <TouchableOpacity
            onPress={() => toggleFav(categoryId, taskId)}
          >

            <Ionicons
              name={
                            eachTask.fav ? 'heart.fill' : 'heart'
                        }
              color="red"
            />
          </TouchableOpacity>

        </View>

        <EditTaskModal
          categoryId={categoryId}
          taskId={taskId}
          closeModal={closeModal}
          visibility={isModalVisible}
        />
      </Swipeable>
    );
}

TaskCard.propTypes = {
    eachTask: TaskPropType.isRequired,
    taskId: PropTypes.string,
    categoryId: PropTypes.string,
    isFavCard: PropTypes.bool,
    cardStyle: PropTypes.object,
    secondComponent: PropTypes.element,

};

// return the list of task

const styles = StyleSheet.create({

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

                // light
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
    leftAction: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 60,
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    rightAction: {
        // flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        paddingHorizontal: 12,
        alignItems: 'center',
        borderRadius: 60,
        // width: "15%",
    },
    taskItem: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
        paddingStart: 10,
        textDecorationStyle: 'double',

    },
});

export default TaskCard;
