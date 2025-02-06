import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {

  const navigation = useNavigation();
  // Task 
  // 1. Implement auth flows

// 2. Implement saving the user state in AsyncStorage

// 3: BONUS: use a secure storage instead of AsyncStorage
// 4 :dont use react-navigation

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button
        title="Go to SignUp"
        onPress={() => { navigation.navigate('Signup') }}
      />
      <Button
        title="Go to Login"
        onPress={() => { navigation.navigate('Login') }}
      />
    </View>
  );
}
