import {StyleSheet, Text, View,Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = React.useState();

  React.useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      'user',
      JSON.stringify({...userDetails, loggedIn: false}),
    );
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>{userDetails?.fullname[0]}</Text>
      <Text>Name : {userDetails?.fullname}</Text>
      <Text>Email : {userDetails?.email}</Text>
      <Text>Phone : {userDetails?.phone}</Text>
      <Text>Adress : {userDetails?.address}</Text>
      {/* Logout function  */}
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
  },
  avatar: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    paddingVertical: 26,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 80,
    marginBottom: 80,
    textAlign: 'center',
    alignSelf: 'center',
  },
});