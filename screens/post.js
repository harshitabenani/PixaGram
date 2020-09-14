import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Image ,Modal,TouchableWithoutFeedback,SafeAreaView,ScrollView, Keyboard} from 'react-native'
import {Ionicons,MaterialIcons} from "@expo/vector-icons"
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'  
import * as firebase from 'firebase'

class PostScreen extends React.Component{
 
    state={

        image:'',
        caption:'',
        pressed:false,
        showMe:false

    }
  
  
    handleCaption = text => {
      this.setState({ caption: text });
    };

  

    getLibraryPermission= async()=>{           //permission to access gallery
        if(Constants.platform.ios){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            

            if(status!="granted")
            {
                    alert("We need permission to access your camera roll !")
            }
           
        }
    }

    getCameraPermission=async()=>{      //permission to access camera

      if(Constants.platform.ios){
       
        const {status}=await Permissions.askAsync(Permissions.CAMERA)

        if(status!="granted")
        {
                alert("We need permission to access your camera ! ")
        }
       
    }

    }

    addPhoto = async (localUri) => {              //add photo to database
      
      return new Promise((res,rej)=>{
          firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/photos").push({
              image:this.state.image,
              text:this.state.caption,
              time:Date.now(),
          })
          .then(ref=>{
              res(ref)
              this.props.navigation.navigate('MainHome')
          })
          .catch(err=>{
              alert("Error in uploading")
          })
      })
    }

    

    pickImage= async() =>{                  //pick image from gallery
      this.getLibraryPermission()
        let result= await ImagePicker.launchImageLibraryAsync({
            mediaTypes :ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            allowsMultipleSelection:true,
            aspect:[4,3]
         })

         if(!result.cancelled){
              
             
             alert("Image Selected")

             this.setState({image:result.uri})
         }
         
    }

    captureImage= async() =>{                 //click image from camera
      this.getCameraPermission()
      let result= await ImagePicker.launchCameraAsync({
          mediaTypes :ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          allowsMultipleSelection:true,
          aspect:[4,3]
       })

       if(!result.cancelled){
            
           
           alert("Image Selected")

           this.setState({image:result.uri})
       }
       
  }

 

  render() {
    const {pressed}=this.state
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <SafeAreaView>
       <ScrollView>

         <View style={styles.header}>
         <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
             <Ionicons name="md-arrow-back" size={24} color="#000"></Ionicons>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.addPhoto}>
             <Text>POST</Text>
         </TouchableOpacity>
         </View>

         <View style={{flexDirection:'row',justifyContent:'space-between'}}>

           <View>

         <Text style={{color:"#9e9e9e",marginTop:40,marginHorizontal:30}}>Caption : (max 4 lines)</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={this.handleCaption}
          multiline={true}
         
        />
        </View>


        <Modal                                //pop up to choose where to select image from
        visible={this.state.showMe}
        animationType={'slide'}
        transparent={true}
        >
          <View style={styles.modalView}>

             
  
              <TouchableOpacity onPress={this.captureImage}>              
              <Text style={{color:"#fff",textAlign:'center',marginTop:20}}>Capture Photo</Text>
              </TouchableOpacity>

              <View style={{backgroundColor:"#fff",height:1,alignSelf:'center',width:200,marginTop:10}}/>

             
              <TouchableOpacity onPress={this.pickImage}>
              <Text style={{color:"#ffff",textAlign:'center',marginTop:10}}>Choose From Image Library</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.setState({showMe:false})}>
              <MaterialIcons name="cancel" size={24} color="#fff" style={{alignSelf:'center',marginTop:20}}/>
              </TouchableOpacity>

  
          
          </View>
        </Modal>
        
         <TouchableOpacity onPress={()=>this.setState({showMe:true})}>
             <Ionicons name="md-camera" size={45} color="#9e9e9e" style={{alignSelf:"center",paddingTop:85,marginRight:25}}></Ionicons>
        </TouchableOpacity>

           </View>

         <TouchableOpacity style={styles.previewButton} onPress={()=>this.setState({pressed:'true'})}>
         <Text style={{color: '#FFF',textAlign:'center',margin:14,fontSize:17,fontWeight:'bold'}}>See Preview</Text>
         </TouchableOpacity>

         
         {this.state.pressed=='true'?
         <View style={styles.item}>
        <Image source={{uri:this.state.image}} style={{width:270,height:270,alignSelf:'center'}}/>
       
        <Text style={{color:"#000",marginTop:15,fontSize:15,textAlign:'center',fontWeight:'bold'}}>{this.state.caption}</Text>
        </View>
        :null}

        
         

      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>

    );
  }
}
const styles=StyleSheet.create({
  
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

  input: {
    
    
    padding:10,
    marginTop:10,
    marginHorizontal:30,
    height: 80,
    width: 250,
    borderColor: '#9e9e9e',
    borderWidth: 1,
    
    
  },

  previewButton:{
    height:50,
    width:150,
    marginTop:30,
    marginLeft:110,
    borderRadius:100,
   backgroundColor:'#7F58FF',
  },
  item:
  {
    height:390,
    width:300,
    backgroundColor:"#e0e0e0",
    borderRadius:7,
    alignSelf:'center',
    marginTop:25,
    padding:8,
  },
  modalView:{
    backgroundColor:"#3f2887",
    height:200,
    marginTop:660,
    borderRadius:30

  }



 


})
export default PostScreen