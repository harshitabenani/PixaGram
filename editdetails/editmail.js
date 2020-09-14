import React, { Component, useReducer } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView} from 'react-native'
import {Ionicons} from "@expo/vector-icons"
import * as firebase from 'firebase'




class EditmailScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

    state = {
    
      email1: '',
      pressed:'false'

   }
   
   handleemail1 = (text) => {
    this.setState({ email1: text })
 }
 

   componentDidMount(){
      
    const {email}=firebase.auth().currentUser
    this.setState({email:email})
 }

 changeEmail=async()=>{                            //function to change email

 firebase.database()                                                   //update database
  .ref('users/' + firebase.auth().currentUser.uid + "/profile")
  .update({
    UserEmail: this.state.email1,
  })
  
      await firebase.auth().currentUser.updateEmail(this.state.email1);        //update firebase authentication email
      alert("Done - Email Updated")
     this.setState({email:this.state.email1})
     
 }
  




   render()
   {
       const {pressed}=this.state

     return(

   

       
    <SafeAreaView>

        <View style={styles.header}>  
         <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
             <Ionicons name="md-arrow-back" size={24} color="#000"></Ionicons>
         </TouchableOpacity>
         </View>

    
       <Text style={{marginHorizontal:35,marginTop:70,fontSize:30,fontWeight:'bold'}}>Current Email:</Text>
        <Text style={{marginHorizontal:35,marginTop:3,fontSize:23,fontWeight:'bold'}}>{this.state.email}</Text>

        <TouchableOpacity style={styles.submitButton} onPress={()=>this.setState({pressed:'true'})}>
        <Text style={{color:"#fff",textAlign:'center',margin:15,fontSize:15}}>Change Email</Text>
        </TouchableOpacity>

        {this.state.pressed=='true'?
         <View>
         <Text style={{color:"#9e9e9e",marginTop:50,marginHorizontal:38}}>New Email :</Text>
 
         <TextInput style={styles.inputfirst}
                underlineColorAndroid = "transparent"
                autoCapitalize = "none"
                onChangeText = {this.handleemail1}
                />
        
        <TouchableOpacity style={styles.submitButton} onPress={this.changeEmail}>
        <Text style={{color:"#fff",textAlign:'center',margin:15,fontSize:15}}>Save Changes</Text>
        </TouchableOpacity>

        </View>
        :null
        }
       
      
       
       

      
               
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
      width:150,
      marginTop:40,
      marginLeft:110,
  
     borderRadius:100,
    backgroundColor:'#7F58FF',
  },
    
})

  export default EditmailScreen