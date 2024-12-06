import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { Stack } from "expo-router";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "./index";
import NeumorphicHeader from "./components/headerComponent"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/homeScreen";
import TaskScreen from "./screens/taskScreen";
import FavScreen from "./screens/favScreen";
import SettingsScreen from "./screens/settingsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TaskProvider from "./context/taskContext";



const dimensions = Dimensions.get("screen");
const MyStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomWrapper = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <NeumorphicHeader
            title={"To-Do App"}
            leftIcon={null}
            navigation={navigation}
          />
        ),

        tabBarPosition: dimensions.width < 600 ? 'bottom' : 'left',
        tabBarLabelPosition: dimensions.width < 600 ? 'below-icon' : 'beside-icon',

        tabBarStyle: {
          position: "absolute",
          marginBottom: 7,
          right: 0,
          width: "100%",
          borderRadius: 20,
          height: "10%",
          backgroundColor: "#E0E0E0",

          shadowColor: "#0e0a0a", // Dark shadow
          shadowOffset: { width: -6, height: -6 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 2, // For Android
        },
        tabBarItemStyle: {
          backgroundColor: "#E0E0E0",
          marginHorizontal: 3,
          margin: 5,
          shadowColor: "#0f0e0e",
          shadowOffset: { width: 5, height: 4 },
          shadowOpacity: 0.6,
          shadowRadius: 1,
          borderRadius: 30,
        },
        headerStyle: { backgroundColor: "#E0E0E0" },
      }}
    >

      <BottomTab.Screen
        // i think should be index.js
        name="homeScreen"
        component={Index}

        options={{
          title: "Home",
          tabBarIcon(props) {
            return (<View>
              <Ionicons
                name="home"
                size={30}
              />
            </View>)
          },

        }}
      />

      <BottomTab.Screen
        name="Task"
        component={TaskScreen}
        options={{
          tabBarIcon(props) {
            return (<View>
              <Ionicons
                name="book"
                size={30}
              />
            </View>)
          },
        }}
      />

      <BottomTab.Screen
        name="Favorites"
        component={FavScreen}
        options={{
          tabBarIcon(props) {
            return (<View>
              <Ionicons
                name="heart"
                size={30}
              />
            </View>)
          },
        }}
      />

      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon(props) {
            return (<View>
              <Ionicons
                name="settings"
                size={30}
              />
            </View>)
          },
        }}
      />


    </BottomTab.Navigator>)
};


export default function RootLayout() {





  return <TaskProvider>
    <NavigationIndependentTree>

      <NavigationContainer >
        <Drawer.Navigator

          screenOptions={{
            headerShown: false,
            overlayColor: "#E0E0E0"

          }}

        >

          <Drawer.Screen
            name="firstScreen"
            options={{
            }}
            component={BottomWrapper}
          />

        </Drawer.Navigator>

        {/* <MyStack.Navigator

screenOptions={{
  // headerTransparent : true,
  // headerTintColor:"white",
  
 header: ({ navigation, route, options }) => (
  <NeumorphicHeader title={options.title || "Default Title"} />
),
headerStyle: { backgroundColor: "#E0E0E0" }, 
}}
>

  <MyStack.Screen
  name="index"
  component={Index}
  options={{title : "To-Do App"}}
  
  />
</MyStack.Navigator> */}



      </NavigationContainer>


    </NavigationIndependentTree>

  </TaskProvider>

  // <Stack 
  // //use this screenOptions to apply styles to all the screens in the app
  // screenOptions={{
  //   headerTintColor: "blue",

  // }}
  // >
  //   <Stack.Screen
  //   name="index"
  //   options={{
  //     title :"Home",
  //     headerTransparent:  true

  //   }}

  //   />
  //   <Stack.Screen
  //   name="myApp"
  //   options={{
  //     title :"Second Screen",
  //     headerTransparent:  true

  //   }}

  //   />
  // </Stack>;
}
