import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";
import NeumorphicContainer from "./neumorphicContaner";



const SearchContainer = ({
  /**The value that is gotten from the user  */
  value, 
  /** a callBack function that is called when the user types */
  onChangeText})=>{

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
           value= {value}
           onChangeText={onChangeText}
           autoCapitalize="sentences"
           multiline
           autoComplete="name-family"
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
    paddingStart:20,
    fontSize: 20,
    width: "100%",
    color:"black"

    }
    
})
export default SearchContainer;