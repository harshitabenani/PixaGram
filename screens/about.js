import React, { Component, useReducer } from 'react';
import { View, Text, TouchableOpacity,  StyleSheet,SafeAreaView} from 'react-native'
import {Ionicons} from "@expo/vector-icons"


//about the app



class AboutScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

   render()
   {
       

     return(

   

       
    <SafeAreaView>

        <View style={styles.container1}>  
         <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
             <Ionicons name="md-arrow-back" size={35} color={"#fff"} style={{marginVertical:20,marginHorizontal:20}}></Ionicons>
         </TouchableOpacity>
         <Text style={{color:"#fff",marginVertical:28,fontSize:20,marginRight:150}}>About Us</Text>
         </View>

       <View style={styles.item}>

           <Text style={{padding:10,textAlign:'center',fontSize:20}}>Not sure how your post looks on Instagram? Try posting it here first and see how it looks on your feed. </Text>
           <Text style={{padding:10,textAlign:'center',fontSize:17}}>This is an application made with the help of react native as front-end and firebase as back-end. An open-ended application which authenticates the user and accordingly opens the user's account based on the data stored in the firebase real time database. A challenging as well as interesting project which helps the user to choose images from his/her gallery and upload it on their feed with a caption. Users can like their images, edit their details and add a profile picture too. Do give it a try. Happy Posting !</Text>
         
        </View>
        
       
      
       
       

      
               
</SafeAreaView>




     )
   }
  
}

const styles = StyleSheet.create({

    container1:{
    
        height:80,
        width:'100%',
        backgroundColor:'#7F58FF',
        borderBottomColor:"#bdbdbd",
        borderBottomWidth:1,
        justifyContent:'space-between',
        flexDirection:'row',
        
   },
    item:{
    height:500,
    width:300,
    backgroundColor:"#e0e0e0",
    borderRadius:7,
    alignSelf:'center',
    marginTop:70,
    padding:8,
  },
    
})

  export default AboutScreen