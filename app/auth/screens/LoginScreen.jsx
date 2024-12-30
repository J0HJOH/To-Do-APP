import React, { useState } from 'react';
import {
  Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, Keyboard,
  SafeAreaView, StyleSheet
} from 'react-native';
import {
  handleEmailInput,
  //handleSignIn, 
  handlePasswordInput
} from './services/authentication'
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigator = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>

        <Text style={styles.title}>User Login</Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(email) => handleEmailInput(email, setEmail, setErrors, errors)}
          placeholderTextColor={"black"}
          style={styles.input}
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        {/* Password */}
        <TextInput
          placeholder="Password"
          value={password}
          placeholderTextColor={"black"}
          onChangeText={(password) => handlePasswordInput(password, setPassword, setErrors, errors)}
          secureTextEntry
          style={styles.input}
        />
        {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

        {/* Login Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            //handleSignIn(email, password, navigator) 
            navigator.navigate("Main")
          }}
        >
          <Text style={{ fontSize: 20 }}>LOGIN</Text>
        </TouchableOpacity>

        {/* Option to signUp */}
        <Text style={styles.otherText}>Don&apos;t have an account? <Text style={styles.linkText}
          onPress={() => navigator.popTo("Signup")}>SignUp</Text></Text>
        <Toast />
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({

  error: {
    color: 'red',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 30,
  },
  otherText: {
    position: "absolute",
    bottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: "15%"
  },
  linkText: {
    color: '#1E90FF', // Dodger blue
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Adds underline for link style
  },
  fab: {
    width: "50%",
    height: "10%",
    backgroundColor: "#d4d2d2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,

    shadowColor: "#0f0e0e",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 25,
    fontSize: 20,
    marginBottom: 20,
    height: "11%"
  },
})

export default LoginScreen;
