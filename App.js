import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import ImageScreen from './image'
import Inputs from './login'
import AppTabNavigator from './tabnavigator'
import SignInputs from './signup'
import PostScreen from './post'
import EditScreen from './edit/edit'
import EditmailScreen from './edit/editmail'
import EditpassScreen from './edit/editpass'
import AboutScreen from './about'
import {
 
  TransitionPresets,
} from '@react-navigation/stack';

console.disableYellowBox = true;

const RootStack=createStackNavigator(
{
    ImageScreen:ImageScreen,
    Login:Inputs,
    SignUp:{
      screen:SignInputs,
      navigationOptions:{

        headerShown:false

      },
    },
    MainHome:{
      screen: AppTabNavigator,
         navigationOptions:{

        header:null

      },
   
    },
 
    Post:{
      screen:PostScreen,
      navigationOptions:{

        headerShown:false

      },
    },
   Edit:{
        screen:EditScreen,
        navigationOptions:{
  
          headerShown:false
  
    },
   },
    Editmail:{
      screen:EditmailScreen,
      navigationOptions:{

        headerShown:false

  },

  },
  Editpass:{
    screen:EditpassScreen,
    navigationOptions:{

      headerShown:false

  },

  },

  About:{
    screen:AboutScreen,
    navigationOptions:{

      headerShown:false

  },

  },

  },
  {
    initialRouteName:'ImageScreen', 
    
    
  },
 

  
)




const AppContainer = createAppContainer(RootStack);
 class App extends React.Component {

  render() {
    return ( <AppContainer /> )
  }
}

export default App
