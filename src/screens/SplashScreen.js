import React, { useEffect, useState } from "react";
import {
   View,
   StyleSheet,
   Text, 
   Image,
   Dimensions,
   Animated,
   LogBox,
   ProgressBarAndroidBase,
   ProgressBarAndroid
} from 'react-native'



import logo from '../assets/images/logo.png';



LogBox.ignoreAllLogs(true)

function SplashScreen({ navigation }) {

  // const navig = useNavigation();
  const [isStop, setIsStop] = useState(false);
  const width = new Animated.Value(200); //360
  const height = new Animated.Value(150);
  
  useEffect(() => {
 

    Animated.loop(
      Animated.sequence([
        Animated.timing(width, {
          toValue: 300,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(width, {
          toValue: 150,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  
    if (isStop) {
      Animated.stop();
    }
   

}, []);





async function stopLogoAnimation() {
  setIsStop(true)
}


  return (
    <View style={styles.container}>
     <View style={styles.imageContainer}>
      <Animated.Image
          source={logo}
          style={{
            width: width,
            height: height,
            resizeMode: 'contain',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
       
      </View>

      <ProgressBarAndroid color="black" styleAttr="Horizontal"  style={{alignSelf:'center',bottom:50,width:130}} />

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    top: Dimensions.get('screen').height/2-75,
    left: Dimensions.get('screen').width/2-75,
    backgroundColor:'transparent',
    height:150,
    width:150,
    resizeMode:'contain'
  },

 
})

export default SplashScreen
