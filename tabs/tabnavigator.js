import {createBottomTabNavigator}  from 'react-navigation-tabs';
import React, { Component } from 'react';
import HomeScreen from './tabs/home'
import SettingsScreen from './tabs/settings'
import AddButton from './addbutton'
import {Ionicons} from "@expo/vector-icons"

//tab navigator

const AppTabNavigator=createBottomTabNavigator(
  {
    Home:{
      screen:HomeScreen,
      navigationOptions:{
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor} ></Ionicons>
       
      }
    },

    Add:{

      screen: () => null,
      navigationOptions:{
        tabBarIcon: <AddButton />
      }

    },

    Settings:{
      screen:SettingsScreen,
      navigationOptions:{
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-settings" size={24} color={tintColor} ></Ionicons>
       
      }
    },

  },

 {
    defaultNavigationOptions :{
      tabBarOnPress:({navigation,defaultHandler}) => {

        if(navigation.state.key === 'Add'){
          navigation.navigate('Post')
        }
        else
        {
          defaultHandler()
        }
        
      }
    },
    tabBarOptions: {
     activeTintColor: '#7F58FF',
      inactiveTintColor: 'gray',
      showLabel:false
    
    },
  },

 

) 


export default AppTabNavigator