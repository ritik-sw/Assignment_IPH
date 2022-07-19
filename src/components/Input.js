import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const Input = ({
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

export default Input;

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