import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from 'prop-types';

const CategoryContainers = ({ title} ) => {
    return (

                <View style = {styles.categoryCol}>
                    <Ionicons
                    size={30}
                    color={"red"}
                    name="male-female"/>
                    <Text style ={styles.title}>{title ?? "Title"}</Text>
                </View>

          
    );
}

CategoryContainers.propTypes = {
    title : PropTypes.string,
};

const styles=  StyleSheet.create({

    categoryCol :{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },
    title:{
        fontSize: 15,
        fontWeight: "bold"
    }
})
export default CategoryContainers;