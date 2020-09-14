import React, { Component } from 'react';
import { View, ImageBackground,Dimensions} from 'react-native'

const devHeight = Dimensions.get('screen').height ;
const devWidth = Dimensions.get('screen').width; 

//splash screen

class ImageScreen extends React.Component
{
    static navigationOptions={
      
      alignItems:'center',
     
     header: null,
}
     
     componentDidMount() 
     {
    setTimeout(() => {this.props.navigation.navigate('Login')
      
      }, 2000);
  }
  render()
  {
    return(
      <View>
     
     <ImageBackground
  source={require('./assets/splashscreen.png')}
  style={{ height:devHeight , width: devWidth }}
 ></ImageBackground>
  
  
</View>
   
    )

  }

 

}



export default ImageScreen