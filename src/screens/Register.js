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
  TouchableOpacity
} from "react-native";
import bg from '../assets/images/bg.jpg'
import logo from '../assets/images/logo.png'
import Input from '../components/Input'
import tick from '../assets/images/check-box-tick.png'
import untick from '../assets/images/check-box-black.png'
import SplashScreen from '../screens/SplashScreen'
import AsyncStorage from "@react-native-async-storage/async-storage";



const Register = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
    address: "",


  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [check, setcheck] = useState(false)



  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      alert("Please input email");
      valid = false;
      return
    } // regex expression for email validation
    else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      valid = false;
      alert("Please input valid email");
      return
    }
    
    if (!inputs.address) {
      valid = false;
      alert("Please input Address",);
      return
    }

    if (!inputs.phone) {
      valid = false;
      alert("Please input phone");
      return
    }

    if(!check){
      alert('Please accept term and conditon')
      return
    }
    
    if (!inputs.fullname) {
      valid = false;
      alert("Please input fullname");
      return
    }
    if (!inputs.password) {
      valid = false;
      alert("Please input fullname");
      return
    } else if (inputs.password.length < 5) {
      valid = false;
      alert("Minimum Password length of 5");
      return
    }

    if (valid) {
      register();
    }
  };

  // if data is valid send/save data to server
  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // save inputs of user
      try {
        AsyncStorage.setItem("user", JSON.stringify(inputs));
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Error", "Something went wrong"+error);
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
            marginBottom: 30
          }}
        />
        <Input
          label="Email"
          placeholder="Enter Email ID "
          error={errors.email}
          iconName="email-outline"
          onFocus={() => {
            handleError(null, "email");
          }}
          onChangeText={(text) => handleOnChange(text, "email")}
        />

        <Input
          label="Password"
          placeholder="Set password"
          password
          iconName="lock-outline"
          onChangeText={(text) => handleOnChange(text, "password")}
          error={errors.password}
          onFocus={() => {
            handleError(null, "password");
          }}
        />

        <Input
          label="Name"
          placeholder="Full Name"
          iconName="account-outline"
          onChangeText={(text) => handleOnChange(text, "fullname")}
          error={errors.fullname}
          onFocus={() => {
            handleError(null, "fullname");
          }}
        />


        <Input
          label="Email"
          placeholder="Full Address "
         
          iconName="email-outline"
          onFocus={() => {
            handleError(null, "address");
          }}
          onChangeText={(text) => handleOnChange(text, "address")}
        />
        <Input
          label="phone"
          placeholder="Mobile No. "
          error={errors.email}
          keyboardType='numeric'
          iconName="email-outline"
          onFocus={() => {
            handleError(null, "phone");
          }}
        
          onChangeText={(text) =>{
            text.length > 10
            ? alert('Please enter 10 digit only'):
            handleOnChange(text, "phone")}}
        />



        <TouchableOpacity style={styles.btn} onPress={validate}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkbox} onPress={() => setcheck(!check)}>

          {check ?
            <Image source={tick} style={{ width: 10, height: 10, margin: 5 }} />
            :
            <Image source={untick} style={{ width: 10, height: 10, margin: 5, borderWidth: 0.56, borderColor: 'white' }} />
          }

          <Text style={{ color: 'white', fontSize: 12 }}>I've Read & Accept term and condition</Text>
        </TouchableOpacity>

      </View>

          
      <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate("Login")} activeOpacity={0.9} >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 12,
            
          }}
        >
          Already have an account{" "}
          <Text style={{ color: "#bcba1e" ,fontWeight:'bold'}}> Login</Text>{" "}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
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
    bottom:0
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

export default Register