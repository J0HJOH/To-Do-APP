import React, { useState } from 'react';
import { Text, TextInput, 
  TouchableOpacity, SafeAreaView, StyleSheet, 
  Keyboard, View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert} from 'react-native';
import {handleEmailInput, handleSignUp, handlePasswordInput} from './services/authentication'
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";


//get your input and put it as your user model and remember its state 
//throughout the app

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setComfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigator = useNavigation();

  //customize toast
  const toastConfig = {
    success: (internalState) => (
      <View style={{ padding: 10, backgroundColor: "green", borderRadius: 8 }}>
        <Text style={{ color: "white" }}>{internalState.text1}</Text>
      </View>
    ),
    error: (internalState) => (
      <View style={{ padding: 10, 
      backgroundColor: "red", borderRadius: 8 }}>
        <Text style={{ color: "white" }}>{internalState.text1}</Text>
      </View>
    ),
  };

  return (
    <TouchableWithoutFeedback 
   onPress = { () => Keyboard.dismiss()}>
     <SafeAreaView style={styles.container}>

      <Text style ={styles.title}>Create an Account</Text>

     <KeyboardAvoidingView
     behavior={
      Platform.OS == "ios" ? "padding" : "height"
     }
     >
       {/* Name */}
       <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={(name) => setName(name)}
        placeholderTextColor={"black"}
        style={styles.input}
      />

      {/* Phone Number */}
      <TextInput
        placeholder="Phone Number"
        value={phone}
        keyboardType='phone-pad'
        onChangeText={(text) => setPhone(text)}
        placeholderTextColor={"black"}
        style={styles.input}
      />

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
       
      
      {/* Confirm Password */}
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        placeholderTextColor={"black"}
        onChangeText={(password) => setComfirmPassword(password)}
        secureTextEntry
        style={styles.input}
      />

      {/* Sign Up Button */}
       <TouchableOpacity
              style={styles.fab}
              onPress={() => { 
                if(name.trim() && phone.length > 0 && confirmPassword.trim()){
                  handleSignUp(email,password,phone,name,navigator)
                }else{
                  Alert.alert("Info", "Please complete the form")
                }
               }}
            >
              <Text style={{ fontSize: 20 }}>Sign Up</Text>
            </TouchableOpacity>
     </KeyboardAvoidingView>

     <Text>Already have an account? <Text style= {styles.linkText} 
      onPress={() => navigator.navigate("Login")}>LOGIN</Text></Text>
      <Toast config={toastConfig}/>
    </SafeAreaView>
   </TouchableWithoutFeedback>
   
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginBottom: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 30,
  },
  title: {
    fontSize:32,
    fontWeight:"bold",
    marginBottom: "15%"
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
  linkText: {
    color: '#1E90FF', // Dodger blue
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Adds underline for link style
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 25,
    fontSize: 20,
    color:"black",
    marginBottom: 20,
    height: "11%"
  },
})

export default SignUpScreen;
