import { Text, View, ScrollView } from "react-native";
import NeumorphicContainer from "../components/neumorphicContaner";
import { FlatList } from "react-native-gesture-handler";
import { useTasks } from "../context/taskContext";
import TaskCard from "../components/taskCard";
import TaskScrollView from '../components/taskScrollView'


const TaskScreen = () => {
    const taskList = useTasks();
    return (
        <ScrollView style={{
            flex: 1,
            padding: 10,
            marginBottom: "20%",
            backgroundColor: "#E0E0E0"
        }}>
           
           <TaskScrollView
           taskList={taskList}
           />
            
        </ScrollView>
    )
};

export default TaskScreen;