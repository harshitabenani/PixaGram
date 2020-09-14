import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Image ,ScrollView,SafeAreaView,Dimensions} from 'react-native'
import {Ionicons, AntDesign,MaterialIcons,MaterialCommunityIcons} from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker'  
import * as firebase from 'firebase'
import { NavigationEvents } from 'react-navigation';

const devHeight = Dimensions.get('screen').height ;

class SettingsScreen extends Component
{


  state = {
 
    profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpg3HRSCK3YCy9SpEAuAlLAWnaj7oEdbf-Rg&usqp=CAU",
    name:'',
    email:'',
    
    
  } ;


componentDidMount(){

   const {displayName,email}=firebase.auth().currentUser
   this.setState({name:displayName,email})

   this.display()
   this.onLoad()
   
}



display(){                     //function to display profile photo

  firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/profilephoto").on('value',datasnapshot=>{
     
    try{
     
      this.setState({profile:datasnapshot.val().profile})
      }
      catch(error){
        
      }
       
      
  })
} 

onLoad = () => {                                //function to change value of email,name or password after editing
 
  
   this.props.navigation.addListener('didFocus', () => {
    const {displayName,email}=firebase.auth().currentUser
    this.setState({name:displayName,email:email})
    
  })
}

pickImage= async() =>{                                          //choose profile photo
    let result= await ImagePicker.launchImageLibraryAsync({
        mediaTypes :ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        allowsMultipleSelection:true,
        aspect:[4,3]
     })

     if(!result.cancelled){
          
         this.addPhoto(result.uri).then(()=>{
             console.log("Image put as profile photo")
         })
         .catch((error)=>{
            alert("Error:Could not add Image")
         })

         this.setState({profile:result.uri})
     }
     
}

signoutUser=()=>{                        //user logout

   
   firebase.auth().signOut().then(() => {
      this.props.navigation.replace('Login')
    })
    .catch(()=>alert(Error))
}

edit=()=>{               //edit name
  this.props.navigation.navigate('Edit')
}

edit2=()=>{             //edit email
  this.props.navigation.navigate('Editmail')
}

edit3=()=>{             //edit password
  this.props.navigation.navigate('Editpass')
}


addPhoto = async (localUri) => {            //add/change profile photo
      
  return new Promise((res,rej)=>{
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/profilephoto").set({    //store the photo in database
          profile:localUri,
      })
      .then(ref=>{
          res(ref)
          alert("Profile Photo Updated")
      })
      .catch(err=>{
          rej(err)
      })
  })
}


  render()
  {
    
  return(
    <SafeAreaView>

          <ScrollView >

          <View style={{height: devHeight + devHeight*1/100 }}>
     
      <Image source={{uri:this.state.profile}}
           style={{borderRadius:100,height:150,width:150,alignSelf:'center',marginTop:40}}></Image>

      <Text style={{textAlign:'center',marginTop:20,fontSize:18,color:'#7F58FF'}}>{this.state.name}</Text>
      <Text style={{textAlign:'center',marginTop:2,fontSize:13,color:'#000'}}>{this.state.email}</Text>
       
       
      <TouchableOpacity onPress={this.pickImage} style={styles.container} >
      <MaterialIcons name="add-a-photo" size={24} color={'#7F58FF'} style={{marginTop:20,marginLeft:15}} />
      <Text style={{textAlign:'center',fontSize:20,fontFamily:'AppleSDGothicNeo-Bold',marginTop:22,marginRight:60}}>Add/Change Profile Photo</Text>
      </TouchableOpacity>
    

      <TouchableOpacity  style={styles.container1} onPress={this.edit}>
      <AntDesign name="edit" size={24} color={'#7F58FF'} style={{marginTop:20,marginLeft:15}} />
      <Text style={{textAlign:'center',fontSize:20,fontFamily:'AppleSDGothicNeo-Bold',marginTop:22,marginRight:200}}>Edit Name</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={styles.container1} onPress={this.edit2} >
      <AntDesign name="edit" size={24} color={'#7F58FF'} style={{marginTop:20,marginLeft:15}} />
      <Text style={{textAlign:'center',fontSize:20,fontFamily:'AppleSDGothicNeo-Bold',marginTop:22,marginRight:200}}>Edit Email</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={styles.container1} onPress={this.edit3} >
      <AntDesign name="edit" size={24} color={'#7F58FF'} style={{marginTop:20,marginLeft:15}} />
      <Text style={{textAlign:'center',fontSize:20,fontFamily:'AppleSDGothicNeo-Bold',marginTop:22,marginRight:170}}>Edit Password</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={styles.container1} onPress={()=>{this.props.navigation.navigate('About')}} >
      <AntDesign name="infocirlce" size={24} color={'#7F58FF'} style={{marginTop:20,marginLeft:15}} />
      <Text style={{textAlign:'center',fontSize:20,fontFamily:'AppleSDGothicNeo-Bold',marginTop:22,marginRight:240}}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={styles.container1} onPress={this.signoutUser}>
      <AntDesign name="logout" size={24} color={'#7F58FF'} style={{marginTop:20,marginLeft:15}} />
      <Text style={{textAlign:'center',fontSize:20,fontFamily:'AppleSDGothicNeo-Bold',marginTop:22,marginRight:230}}>Logout</Text>
      </TouchableOpacity>

      </View>

      </ScrollView>

  
   </SafeAreaView>
    
    )
  }
}


const styles=StyleSheet.create({
  
  container:{
  height:65,
  width:350,
  margin:10,
  borderRadius:30,
  marginTop:30,
  backgroundColor:'#c7c7c7',
  alignSelf:'center',
  justifyContent:'space-around',
  flexDirection:'row',
},

container1:{
  height:65,
  width:350,
  margin:10,
  borderRadius:30,
  marginTop:10,
  backgroundColor:'#c7c7c7',
  alignSelf:'center',
  justifyContent:'space-around',
  flexDirection:'row',
},

 



})

export default SettingsScreen