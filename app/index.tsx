import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {

  const navigation = useNavigation();

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
