import { isValidEmail, isValidPhone, isValidPassword } from "./validation";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile} from "firebase/auth";

import { auth } from '../services/API/firebase';
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
// import PropTypes from 'prop-types';
// import{ User } from "@/app/model/UserModel";

//validate email string
export const handleEmailInput = (email, setEmail, setErrors, errors) => {
    setEmail(email);
    !isValidEmail(email)
      ? setErrors({
          ...errors,
          email: "Please input a valid email address",
        })
      : setErrors({});
  };
  
  //validate password string
  export const handlePasswordInput = (password, setPassword, setErrors, errors) => {
    setPassword(password);
    !isValidPassword(password)
      ? setErrors({
          ...errors,
          password:
            "Password should be at least 6 characters and must contain one special character, capital letter, and number",
        })
      : setErrors({});
  };
 
   // Sign Up Function
   export const handleSignUp =  async (email, password,phone, name, navigator) => {
    
    if(!email?.trim() || !password?.trim()){
        //empty fields
        Alert.alert("Empty Fields");
        return;
     }
     if (!isValidEmail(email)) {
        Alert.alert("Invalid Email Address.");
        return;
      }
    
    if (!isValidPassword(password)) {
        Alert.alert("Invalid password. Password must contain at least one special character, one capital letter, and one number.");
        return;
    }
    console.log("My Num: ", phone);
    
    if (!isValidPhone(parseInt(phone, 10))) {
      console.log("number error");
      
      Toast.show({ type: 'error', 
        text1: 'Invalid phone number.',
        position: "bottom", 
       });
      return;
    }
    
  // If valid, create a user object of type UserModel
  const newUser = {
    name: name,
    password: password,
    email: email,
    phone: parseInt(phone)
  };
  console.log('New User Obj:', newUser);

  //check the new user object to be of type User Model
  //this is throwing an error
  // const chek = PropTypes.checkPropTypes(User, newUser,'prop', 'SignUpScreen' );
  // console.log("check: ", chek);
  
  console.log('New User:', newUser);

  //save in firebase by create a new user
  try{
    const userCrendential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);

    const user = userCrendential.user;
    console.log("Current Backend User", user);

    await updateProfile(user, {
      displayName : newUser.name
    });

    
    console.log("Current Update User", auth.currentUser);
    Toast.show({ type: 'success', 
      text1: 'Success', 
      text2: `Account created for ${auth.currentUser.displayName}` });
      navigator.navigate("Login")
  }catch(e){
    if(e.code === "auth/network-request-failed"){
      Toast.show({
          type: "error",
          text1: "Internet Connection disabled",
          position: "bottom",swipeable: true, autoHide: true,
        });
  }else if(e.code === "auth/email-already-in-use"){
      Alert.alert('Invalid', "User Exists, Please sign in with another Account");
  }else{
      Alert.alert('Error', e.message);
  }

  }
  
    };

    
    // Sign In Function
    export const handleSignIn =  (email, password, navigator) => {
        
        if(!email?.trim() || !password?.trim()){
            //empty fields
            Alert.alert("Empty Fields");
            return;
        }
        
        if (!isValidEmail(email)) {
            Alert.alert("Invalid Email Address.");           
            return;
          }
        
        if (!isValidPassword(password)) {
            Alert.alert("Invalid password. Password must contain at least one special character, one capital letter, and one number.");
            return;
        }
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        Alert.alert('Success', `Welcome ${userCredential.user.displayName}`);
        navigator.navigate("Main")
        })
        .catch((error) => {
            if(error.code === "auth/network-request-failed"){
                Toast.show({
                    type: "error",
                    text1: "Internet Connection disabled",
                    position: "bottom",swipeable: true, autoHide: true,
                  });
            }else if(error.code === "auth/invalid-credential"){
                Alert.alert('Invalid', "Incorrect Email or Password. Please check inputs again");
            }else{
                Alert.alert('Error', error.message);
            }
        });
    };
      
  