import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import Index from "./index";
import NeumorphicHeader from "./components/HeaderComponent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TaskProvider from "./context/TaskContext";
import SignUpScreen from './screens/auth/SignUpScreen';
import LoginScreen from './screens/auth/LoginScreen';
import HomeScreen from './screens/HomePage/HomeScreen';
import FavScreen from './screens/FavoritesPage/FavoriteScreen';
import SettingsScreen from './screens/SetttingPage/SettingScreen';
import TaskScreen from './screens/TaskPage/TaskScreen';
import CategorySectionScreen from './screens/HomePage/CategoryDetailScreen'
import React from "react";




// const dimensions = Dimensions.get("screen");
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const BottomWrapper = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <NeumorphicHeader
            title={"To-Do App"}
            navigation={navigation}
          />
        ),
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
        component={HomeScreen}

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

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        overlayColor: "#E0E0E0"
      }}>

      <Drawer.Screen
        name="firstScreen"
        options={{
        }}
        component={BottomWrapper}
      />

    </Drawer.Navigator>
  );
};

export default function RootLayout() {
  return (
    <TaskProvider>
      <NavigationIndependentTree>

        <NavigationContainer >
          <Stack.Navigator
            screenOptions={{
              headerBackButtonDisplayMode: "minimal",
              headerTransparent: true,
              headerTitleStyle: {
                color: "transparent"
              }
            }}
          >
            <Stack.Screen
              name="Signup"
              component={SignUpScreen}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />


            <Stack.Screen
              name="Main"
              component={DrawerNav}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="CategorySection"
              component={CategorySectionScreen}
            // options={({ route }) => ({
            //   title: route.params?.categoryName ?? "About"
            // })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </TaskProvider>
  )
}
