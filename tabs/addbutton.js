import React from 'react'
import {View,StyleSheet,TouchableHighlight,Text,TouchableOpacity} from 'react-native'

//add button in tab navigator
 
 class AddButton extends React.Component{

render(){
        return(
            <View style={{position:'absolute',alignItems:'center'}}>
                 <View style={styles.button}>
                     <TouchableOpacity>
                          <Text style={{color:"#fff",textAlign:'center',fontSize:25}}>+</Text>
                     </TouchableOpacity>
 
                 </View>

                 
            </View>
        )
    } 
}

const styles = StyleSheet.create({

    button:{
        alignItems:'center',
        justifyContent:"center", 
        height:72,
        width:72,
        backgroundColor:'#7F58FF',
        borderRadius:36,
        position:'absolute',
        top:-60,
        shadowColor:'#7F58FF',
        shadowRadius:5,
        shadowOpacity:0.3,
        shadowOffset: {height:10}

    }




})

export default AddButton