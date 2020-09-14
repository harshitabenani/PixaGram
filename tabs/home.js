import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image ,Dimensions,ScrollView,SafeAreaView,FlatList} from 'react-native'
import {Ionicons} from "@expo/vector-icons"
import * as firebase from 'firebase'


const devHeight = Dimensions.get('screen').height ;



class HomeScreen extends React.Component{

  state = {
 
    
    mylist:[],
    profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpg3HRSCK3YCy9SpEAuAlLAWnaj7oEdbf-Rg&usqp=CAU"
    

  } ;

  componentDidMount(){
      
    this.display()
    this.display1()

}

display(){       //function to store database value in array 'mylist'

  try{
    
    const myitems=firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/photos")
    myitems.on("value",datasnapshot=>{

      try{

     this.setState({mylist:Object.values(datasnapshot.val())}) 
      }
      catch(error){

        alert("NO POSTS YET")

      }
      
     
  })
 } catch(error){
   alert("Error")
 }

}

display1(){           //function to store profile photo in 'profile' 

  
    
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/profilephoto").on('value',datasnapshot=>{

      try{
     
      this.setState({profile:datasnapshot.val().profile})
      }
      catch(error){
       
        
      }
      
  })
 } 
 




likeHandler=(item,ind)=>{                //handling likes on images
      
    const{mylist}=this.state
    
    let arr=mylist.map((item,index)=>{
      if(ind==index)
      {
        item.isLiked= !item.isLiked
      }
      return{...item}
    })

    this.setState({mylist:arr})
} 


renderPost= ({item,index})=> {                            //flatlist display

  

    return(
      <View style={styles.item}>
        <View>
       <Image source={{ uri: item.image }} style={{width:270,height:270,alignSelf:'center'}}></Image>
       </View>

       <Text style={{margin:10,textAlign:'center',fontFamily:'American Typewriter'}}>{item.text}</Text>
       <View style={{height:1,width:'100%',backgroundColor:"#000"}}></View>
        
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <TouchableOpacity onPress={()=>{this.likeHandler(item,index)}}>
      <Ionicons name="md-heart" size={24} color={ item.isLiked ? '#fb7777' : '#fff'} style={{marginTop:5}}/>
       </TouchableOpacity>

       <Text style={{marginTop:5,fontFamily:'Cochin-Bold',fontSize:16,color:"#7F58FF"}}>{new Date(item.time).toDateString()}</Text>

      </View>
   </View>
    )
  
}



  
render() {
 
 return (
      <SafeAreaView>
       
        <View style={styles.container1}>
           <Text style={{alignItems:'center',margin:20,fontWeight:"bold",fontSize:18,color:"#fff"}}>Feed</Text>
           <Image source={{uri:this.state.profile}}
           style={{borderRadius:30,height:40,width:40,alignSelf:'center',marginRight:20}}></Image>
           
         </View>

         <View >

         <ScrollView>
         <View style={{width: '100%', height: '100%' }}>

         <FlatList style={{marginHorizontal:20,marginVertical:10,marginBottom:125}}
         data={this.state.mylist}
         renderItem={this.renderPost}
         keyExtractor={item=>item.id}
         extraData={this.state}
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}>
           
         </FlatList>

      </View>
     
      </ScrollView>
      </View>
    
      </SafeAreaView>
     
     );
  }
}
const styles=StyleSheet.create({
  item:
  {
    backgroundColor:"#e0e0e0",
    borderRadius:5,
    padding:8,
    marginVertical:8
  },

  container1:{
    
  height:60,
  width:'100%',
  backgroundColor:'#7F58FF',
  borderBottomColor:"#bdbdbd",
  borderBottomWidth:1,
  justifyContent:'space-between',
  flexDirection:'row'
  
 },

 deleteAllButton:{
  height:50,
  width:200,
  alignSelf:'center',
  borderRadius:100,
 backgroundColor:'#fb7777',
},


  

  

 


})
export default HomeScreen