import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import firebase from './config';
import { SafeAreaView } from 'react-navigation';

const devHeight = Dimensions.get('screen').height ;
const devWidth = Dimensions.get('screen').width ;


class Inputs extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    };
  }

  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };

  Login = (email, password) => {              //firebase authentication in login
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() =>
          this.props.navigation.navigate('MainHome',{email:this.state.email}),
          
        )
        .catch(error => {
          alert(error.message);
        });
    } catch (err) {
      alert(err);
    }
  };


  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <ImageBackground
          style={{ height:devHeight , width: devWidth }}
          source={ require('./assets/login2.png') }
        >
        <SafeAreaView>
        <Text style={{marginHorizontal:40,marginTop:150,fontSize:30,fontWeight:'bold'}}>Hello,</Text>
        <Text style={{marginHorizontal:40,marginTop:3,fontSize:23,fontWeight:'bold'}}>Welcome Again!</Text>

        <Text style={{color:"#9e9e9e",marginTop:70,marginHorizontal:40}}>Email</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <Text style={{color:"#9e9e9e",marginTop:30,marginHorizontal:40}}>Password</Text>

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          secureTextEntry="true"
          onChangeText={this.handlePassword}
        />

        <TouchableOpacity
              onPress={() => this.Login(this.state.email, this.state.password)}
              style={{
                height: 55,
                width: 110,
                backgroundColor: '#7F58FF',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop:90
              }}>
              <Text style={{ color: '#FFF',textAlign:'center' }}>Sign In</Text>
            </TouchableOpacity>
          

          <View>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={{
                justifyContent: 'space-between',
                flexDirection:'row'
              }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 30,
                marginLeft:80
              }}>
              Not a Member yet? 
            </Text>
            <Text style={{ color: '#7F58FF',textDecorationLine:'underline',marginTop:30,fontSize:18,marginRight:80 }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        
        </SafeAreaView>
        </ImageBackground>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  input: {
    
    height: 30,
    padding:5,
    width: 300,
    alignSelf: 'center',
    borderBottomColor:"#9e9e9e",
    borderBottomWidth:1,
  },
 


});

export default Inputs
