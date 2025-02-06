/* eslint-disable no-use-before-define */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import {
  handleEmailInput,
  handleSignIn,
  handlePasswordInput,
} from '../../services/authentication';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const navigator = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>User Login</Text>

        {/* Email */}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(mail) => {
            handleEmailInput(mail, setEmail, setErrors, errors);
          }}
          placeholderTextColor="black"
          style={styles.input}
        />

        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        {/* Password */}
        <TextInput
          placeholder="Password"
          value={password}
          placeholderTextColor="black"
          onChangeText={
            (passwordText) => handlePasswordInput(passwordText, setPassword, setErrors, errors)
          }
          secureTextEntry
          style={styles.input}
        />
        {errors.password ? (
          <Text style={styles.error}>{errors.password}</Text>
        ) : null}

        {/* Login Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            handleSignIn(email, password, navigator);
            // navigator.navigate("Main")
          }}
        >
          <Text style={{ fontSize: 20 }}>LOGIN</Text>
        </TouchableOpacity>

        {/* Option to signUp */}
        <Text style={styles.otherText}>
          Don&apos;t have an account?
          <Text
            style={styles.linkText}
            onPress={() => router.navigate('/SignUpScreen')}
          >
            SignUp
          </Text>
        </Text>
        <Toast />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 30,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  fab: {
    alignItems: 'center',
    backgroundColor: '#d4d2d2',
    borderRadius: 20,
    height: '10%',
    justifyContent: 'center',
    shadowColor: '#0f0e0e',

    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    width: '50%',
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 25,
    borderWidth: 1,
    fontSize: 20,
    height: '11%',
    marginBottom: 20,
    padding: 10,
  },
  linkText: {
    color: '#1E90FF', // Dodger blue
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Adds underline for link style
  },
  otherText: {
    bottom: 10,
    position: 'absolute',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: '15%',
  },
});

export default LoginScreen;
