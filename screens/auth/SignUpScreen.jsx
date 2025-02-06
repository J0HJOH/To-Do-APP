/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {
    Text, TextInput,
    TouchableOpacity, SafeAreaView, StyleSheet,
    Keyboard, View,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { handleEmailInput, handleSignUp, handlePasswordInput } from '../../services/authentication';

// get your input and put it as your user model and remember its state
// throughout the app

function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setComfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigator = useNavigation();

    // customize toast
    const toastConfig = {
        success: (internalState) => (
            <View style={{ padding: 10, backgroundColor: 'green', borderRadius: 8 }}>
                <Text style={{ color: 'white' }}>{internalState.text1}</Text>
            </View>
        ),
        error: (internalState) => (
            <View style={{
                padding: 10,
                backgroundColor: 'red',
                borderRadius: 8,
            }}
            >
                <Text style={{ color: 'white' }}>{internalState.text1}</Text>
            </View>
        ),
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <SafeAreaView style={styles.container}>

                <Text style={styles.title}>Create an Account</Text>

                <KeyboardAvoidingView
                    behavior={
                        Platform.OS === 'ios' ? 'padding' : 'height'
                    }
                >
                    {/* Name */}
                    <TextInput
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="black"
                        style={styles.input}
                    />

                    {/* Phone Number */}
                    <TextInput
                        placeholder="Phone Number"
                        value={phone}
                        keyboardType="phone-pad"
                        onChangeText={setPhone}
                        placeholderTextColor="black"
                        style={styles.input}
                    />

                    {/* Email */}
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(mail) => handleEmailInput(mail, setEmail, setErrors, errors)}
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
                    {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

                    {/* Confirm Password */}
                    <TextInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        placeholderTextColor="black"
                        onChangeText={setComfirmPassword}
                        secureTextEntry
                        style={styles.input}
                    />

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={styles.fab}
                        onPress={() => {
                            if (name.trim() && phone.length > 0 && confirmPassword.trim()) {
                                handleSignUp(email, password, phone, name, navigator);
                            } else {
                                Alert.alert('Info', 'Please complete the form');
                            }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>Sign Up</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

                <Text>
                    Already have an account?
                    <Text
                        style={styles.linkText}
                        onPress={() => navigator.navigate('Login')}
                    >
                        LOGIN
                    </Text>
                </Text>
                <Toast config={toastConfig} />
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
        marginBottom: 2,
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
        color: 'black',
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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: '15%',
    },
});

export default SignUpScreen;
