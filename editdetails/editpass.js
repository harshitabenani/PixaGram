import React, { Component, useReducer } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView} from 'react-native'
import {Ionicons} from "@expo/vector-icons"
import * as firebase from 'firebase'




class EditpassScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

    state = {
    
      pass1: '',
      pressed:'false',
      

   }
   
   handlepass1 = (text) => {
    this.setState({ pass1: text })
 }
 


 changePass=async()=>{                                            //update user's password
    
 firebase.database()                                                 //update firebase database
  .ref('users/' + firebase.auth().currentUser.uid + "/profile")
  .update({
    Password: this.state.pass1,
  })
  
      await firebase.auth().currentUser.updatePassword(this.state.pass1);        //update firebase authentication password
      alert("Done - Password Updated")
    
     
 }
  




   render()
   {
       

     return(

   

       
    <SafeAreaView>

        <View style={styles.header}>  
         <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
             <Ionicons name="md-arrow-back" size={24} color="#000"></Ionicons>
         </TouchableOpacity>
         </View>

       <View>
         <Text style={{color:"#9e9e9e",marginTop:50,marginHorizontal:38}}>New Password:</Text>
 
         <TextInput style={styles.inputfirst}
                underlineColorAndroid = "transparent"
                autoCapitalize = "none"
                onChangeText = {this.handlepass1}
                />
        
        <TouchableOpacity style={styles.submitButton} onPress={this.changePass}>
        <Text style={{color:"#fff",textAlign:'center',margin:15,fontSize:15}}>Save Changes</Text>
        </TouchableOpacity>

        </View>
        
       
      
       
       

      
               
</SafeAreaView>




     )
   }
  
}

const styles = StyleSheet.create({

    header:{
        height:60,
        width:'100%',
        paddingHorizontal:30,
        paddingVertical:20,
        borderBottomWidth:1,
        borderBottomColor:'#9e9e9e',
        justifyContent:'space-between',
        flexDirection:'row'
       },

    inputfirst: {
    
      height:30,
      width:300,
      padding:5,
      alignSelf:'center',
      borderBottomColor:"#9e9e9e",
      borderBottomWidth:1
   },

      
    submitButton:{
      height:50,
      width:160,
      marginTop:40,
      alignSelf:'center',
  
     borderRadius:100,
    backgroundColor:'#7F58FF',
  },
    
})

  export default EditpassScreen