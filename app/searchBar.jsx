import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";
import NeumorphicContainer from "./neumorphicContaner";
import { SearchBar } from "react-native-screens";




const SearchContainer = ()=>{

return (
    <NeumorphicContainer
        styling={{
          width : "90%",
          margin: 10
        }}

        component={
          (
            <View style ={styles.row}>
            <Ionicons
            name="search"
            color={"#979191"}
            size= {35}
            />
           
           <TextInput
           editable
           //going to use 
           placeholder="Search Here..."
           autoCapitalize="sentences"

           autoComplete="name-family"
           clearButtonMode="while-editing"
           cursorColor={"#130f0f"}
           placeholderTextColor={"black"}
           style={styles.inputField}

           />
        </View>
    
          )
        }
        
        />
   
);
}

const styles = StyleSheet.create({
    row: {
        padding: 10,
        display:"flex",
        width: "80%",
        alignItems: "center",
        flexDirection:"row"
    },
    inputField :{
    paddingStart:10

    }
    
})
export default SearchContainer;