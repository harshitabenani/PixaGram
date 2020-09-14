import React, { Component, useReducer } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet ,SafeAreaView,} from 'react-native'
import {Ionicons} from "@expo/vector-icons"
import * as firebase from 'firebase'


class EditScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

    state = {
    
      name1: '',
      pressed:'false'

   }
   
   handlename1 = (text) => {
    this.setState({ name1: text })
 }
 

   componentDidMount(){

    const {displayName}=firebase.auth().currentUser
    this.setState({name:displayName})
 }

 changeName=async()=>{                                //function to change user's name

  firebase.database()                                                //update firebase database
  .ref('users/' + firebase.auth().currentUser.uid + "/profile")
  .update({
    UserName: this.state.name1,
  })

    const update = {
        displayName: this.state.name1,
      };
      await firebase.auth().currentUser.updateProfile(update);             //update firebase authentication name
      alert("Done - Name Updated")
     this.setState({name:this.state.name1})
     
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

    
       <Text style={{marginHorizontal:35,marginTop:70,fontSize:30,fontWeight:'bold'}}>Current Name:</Text>
        <Text style={{marginHorizontal:35,marginTop:3,fontSize:23,fontWeight:'bold'}}>{this.state.name}</Text>

        <TouchableOpacity style={styles.submitButton} onPress={()=>this.setState({pressed:'true'})}>
        <Text style={{color:"#fff",textAlign:'center',margin:15,fontSize:15}}>Change Name</Text>
        </TouchableOpacity>

        {this.state.pressed=='true'?                   //if user clicks on "change name" this text input opens
         <View>
         <Text style={{color:"#9e9e9e",marginTop:50,marginHorizontal:38}}>New Name :</Text>
 
         <TextInput style={styles.inputfirst}
                underlineColorAndroid = "transparent"
                autoCapitalize = "none"
                onChangeText = {this.handlename1}
                const names={this.state.name}/>
        
        <TouchableOpacity style={styles.submitButton} onPress={this.changeName}>
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

  export default EditScreen