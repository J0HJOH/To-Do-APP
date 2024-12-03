import { ScrollView, Text, View } from "react-native";
import NeumorphicContainer from "../neumorphicContaner";
import { TextInput } from "react-native-gesture-handler";

const HomeScreen = () => {
    return (
        <View style ={{justifyContent:"center", flex:1, alignItems:"center", backgroundColor:"#E0E0E0"}}>
            <ScrollView >
                <Text >jbdhb</Text>
                <NeumorphicContainer
                styling={{width: "70%"}}
                />
            </ScrollView>
        </View>
    )
};

export default HomeScreen;