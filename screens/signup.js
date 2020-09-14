import React, { Component, useReducer } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,ImageBackground ,ScrollView, Dimensions} from 'react-native'
import firebase from './config'
import {Ionicons} from "@expo/vector-icons"


const devHeight = Dimensions.get('screen').height ;
const devWidth = Dimensions.get('screen').width; 

class SignInputs extends React.Component {

  static navigationOptions = {
    header: null,
  };

    state = {
      name:'',
      email: '',
      contact:'',
      password: '',
      cp:''

   }
   
   handlename = (text) => {
      this.setState({ name: text })
   }
   handleemail = (text) => {
      this.setState({ email: text })
   }
   handlecontact = (text) => {
      this.setState({ contact: text })
   }
   handlepassword = (text) => {
      this.setState({ password: text })
   }
   handleconfirmpassword = (text) => {
      this.setState({ cp: text })
   }

 
 
  SignUp = (email,password) => {                        //firebase authentication signup/register
      try{
    firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(userCredentials => {

        this.props.navigation.navigate('MainHome')
        
        return userCredentials.user.updateProfile({
          displayName:this.state.name
          
         }).then(()=>{

          firebase                            //adding user details to firebase database
          .database()
          .ref('users/' + firebase.auth().currentUser.uid + "/profile")
          .set({
              UserName: this.state.name,
              UserEmail: this.state.email,
              Contact:this.state.contact,
              Password:this.state.password
            })
          

           }).catch((error)=>{ 
              alert(error.message)
        })

      })
      .catch(error => {   
        alert(error.message);
     })
   }catch(err){
      alert(err);
   }
  };




check=()=>                          //checking if all fields are filled and passwords match
{

  if(this.state.password != '' && this.state.cp != '' && this.state.name != '' && this.state.email != '' && this.state.contact != '' )
  {
    if( this.state.password!=this.state.cp)
    {
      alert("PASSWORDS DO NOT MATCH ")
    }
  
    else
    {
     this.SignUp(this.state.email,this.state.password)
    
    }
  }
  else
  {
    alert("PLEASE ENTER THE EMPTY FIELD(S)")
  }
}


 render()
   {
     return(

      <ImageBackground
      style={{ height:devHeight , width: devWidth }}
      source={ require('./assets/signup.png') }>

       
       <ScrollView style={{flex:1}}>
      
      <View style={{width: '100%', height: devHeight + devHeight*25/100 }}>
       <View>

         <View style={{paddingHorizontal:35,paddingTop:75}}>

       <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
             <Ionicons name="md-arrow-back" size={30} color="#000" ></Ionicons>
         </TouchableOpacity>

         </View>

       <Text style={{marginHorizontal:35,marginTop:70,fontSize:30,fontWeight:'bold'}}>Hello,</Text>
        <Text style={{marginHorizontal:35,marginTop:3,fontSize:23,fontWeight:'bold'}}>Let's get you started!</Text>
       
      
       
       </View>

       <Text style={{color:"#9e9e9e",marginTop:50,marginHorizontal:38}}>Name</Text>

              <TextInput style={styles.inputfirst}
               underlineColorAndroid = "transparent"
               autoCapitalize = "none"
               onChangeText = {this.handlename}
               const names={this.state.name}/>

               <Text style={{color:"#9e9e9e",marginTop:30,marginHorizontal:38}}>Email</Text>

               <TextInput style={styles.inputfirst}
               underlineColorAndroid = "transparent"
               autoCapitalize = "none"
               onChangeText = {this.handleemail}/>

               <Text style={{color:"#9e9e9e",marginTop:30,marginHorizontal:38}}>Contact</Text>


              <TextInput style={styles.inputfirst}
               underlineColorAndroid = "transparent"
               autoCapitalize = "none"
               onChangeText = {this.handlecontact}
               keyboardType={'numeric'} 
               maxLength={10}/>

               <Text style={{color:"#9e9e9e",marginTop:30,marginHorizontal:38}}>Password</Text>


                 <TextInput style={styles.inputfirst}
               underlineColorAndroid = "transparent"
               autoCapitalize = "none"
               onChangeText = {this.handlepassword}
               secureTextEntry='true'
               />

               <Text style={{color:"#9e9e9e",marginTop:30,marginHorizontal:38}}>Confirm Password</Text>


                 <TextInput style={styles.inputfirst}
               underlineColorAndroid = "transparent"
               autoCapitalize = "none"
               onChangeText = {this.handleconfirmpassword}
               secureTextEntry='true'
               />

                   <TouchableOpacity
       
      onPress={()=>this.check()} >
       

      <View style={styles.submitButton}>
      <Text style={{color: '#FFF',textAlign:'center',paddingTop:11,fontSize:20,fontWeight:'bold'}}>Submit</Text>
      </View>
       
     
      </TouchableOpacity>
    </View>
</ScrollView>

</ImageBackground>


     )
   }
  
}

const styles = StyleSheet.create({



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

  export default SignInputs