import { StyleSheet, Text, View, TextInput,Image } from "react-native";
import React from "react";
import email from '../assets/images/email-icon.png'
import pass from '../assets/images/pass-icon.png'

const LoginInput = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  



  return (
    <View style={styles.inputMainContainer}>
     
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? "#BC0000" : isFocused ? "darkblue" : "#4B4A4F",
          },
        ]}
      >
      
      {iconName=='email' ? 
           <Image
          source={email}
          style={{
            marginHorizontal:10,
            height:8.5,
            width:10,
          }}
        /> 

        :
        <Image
          source={pass}
          style={{
            marginHorizontal:10,
            height:10,
            width:8,
          }}
        /> 
        }
       
        <TextInput
          secureTextEntry={hidePassword}
          style={{ flex: 1 ,fontFamily:'Poppins-Regular'}}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
      </View>
     
    </View>
  );
};

export default LoginInput;

const styles = StyleSheet.create({
  inputMainContainer: { 
    paddingTop:3
  },
  label: {
    fontSize: 16,
    color: "#4B4A4F",
    fontFamily:'Poppins-Regular'
  },
  inputContainer: {
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    borderWidth: 0.5,
    borderRadius: 5,
  },
});