import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
  Alert,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
  TextInput
} from "react-native";
import bg from '../assets/images/bg.jpg'
import logo from '../assets/images/logo.png'
import LoginInput from '../components/LoginInput'
import FacebookLogo from "../assets/images/fb-icon.png";
import GoogleLogo from "../assets/images/gplus-icon.png";
import SplashScreen from '../screens/SplashScreen'
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;
    let userData = await AsyncStorage.getItem("user");
    userData = JSON.parse(userData);
    if (!inputs.email) {
      alert("Please input email");
      return;
      valid = false;
    } else if (inputs.email !== userData.email) {
      valid = false;
      alert("Invalid email");
      return
    }
    if (!inputs.password) {
      valid = false;
      
      alert("Please input password");
      return
    } else if (inputs.password !== userData.password) {
      valid = false;
      alert("Invalid Password");
      return
    }
    if (valid) {
      login();
    }
  };

  // if data is valid send/save data to server
  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem(
            "user",
            JSON.stringify({ ...userData, loggedIn: true }),
            navigation.navigate("HomeScreen")
          );
        } else {
          alert("Error", "Invalid details");
        }
      } else {
        alert("Error", "User doenot exist");
      }
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  if (loading)
    return <SplashScreen />

  return (
    <ImageBackground source={bg} style={{ height: '100%', width: '100%' }}>
      <View style={styles.container}>

        <Image
          source={logo}
          resizeMode="contain"
          style={{
            widthL: 100,
            height: 100,
            alignSelf: "center",
            marginTop: 120,
            marginBottom:150
          }}
        />
            <TouchableOpacity style={[styles.socialSign,{backgroundColor:'#203f7f'}]}>
          <View style={styles.btnImg}>
          <Image source={FacebookLogo}  style={{width:30,height:30,marginBottom:10}} />  
          </View>
         
          <Text style={{fontWeight:'bold',color:'white',textAlign:'center',marginLeft:50}}>Sign in with Facebook</Text>
          
        </TouchableOpacity>

         <TouchableOpacity style={[styles.socialSign,{backgroundColor:'#bd2c1b'}]}>
          <View style={[styles.btnImg,{backgroundColor:'#dc4b38'}]}>
          <Image source={GoogleLogo}  style={{width:30,height:30,marginBottom:10}} />  
          </View>
         
          <Text style={{fontWeight:'bold',color:'white',textAlign:'center',marginLeft:50}}>Sign in with Google+</Text>
          
        </TouchableOpacity> 

             


       
         <View style={{flexDirection:'row',alignItems:'center',marginVertical:4, marginBottom:12,alignSelf:'center'}}>
       <Text style={{color:'#49ac44',margin:10,fontWeight:'bold'}}>_________________________</Text>
       <Text style={{color:'#49ac44',marginTop:10,fontWeight:'bold'}}>Or Use Email</Text>
       <Text style={{color:'#49ac44',margin:10,fontWeight:'bold'}}>_____________________</Text>
       
       </View>

        <LoginInput
          label="Email"
          placeholder="Enter Email ID "
          error={errors.email}
          iconName="email"
          onFocus={() => {
            handleError(null, "email");
          }}
          onChangeText={(text) => handleOnChange(text, "email")}
        />
        
        <LoginInput
          label="Password"
          placeholder="Enter password"
          password
          iconName="pass"
          onChangeText={(text) => handleOnChange(text, "password")}
          error={errors.password}
          onFocus={() => {
            handleError(null, "password");
          }}
        />



        <TouchableOpacity style={styles.btn} onPress={validate}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkbox} >

          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Forget Password</Text>
        </TouchableOpacity>

      </View>


      <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate("Register")} activeOpacity={0.9} >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 12,

          }}
        >
          New User{" "}
          <Text style={{  color: "#bcba1e" ,fontWeight:'bold'}}>Sign Up</Text>{" "}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  btnImg:{height:40,width:60,backgroundColor:'#3b5999',alignSelf:'flex-start',
  borderRadius:5,
  justifyContent:'center',
  alignItems:'center'
},
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row'
  },
  footer: {
    backgroundColor: '#49ab44',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0
  },
  socialSign:{
    flexDirection:'row',
    alignItems:'center',
    height:32,
    alignSelf:'center',
    backgroundColor:'orange',
    width:'100%',
    borderRadius:5,
    overflow:'hidden',
    marginVertical:1
  },
  btn: {
    backgroundColor: '#ffc500',
    height: 50,
    marginTop: 3,
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    paddingBottom: 100,
  },
});

export default Login