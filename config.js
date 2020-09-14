import * as firebase from 'firebase'


//firebase details

var firebaseConfig = {
    apiKey: "AIzaSyCYj40QI7YlEHIVTe77VdTpbfKK9cqXTZA",
    authDomain: "pilgrimage-e500d.firebaseapp.com",
    databaseURL: "https://pilgrimage-e500d.firebaseio.com",
    projectId: "pilgrimage-e500d",
    storageBucket: "pilgrimage-e500d.appspot.com",
    messagingSenderId: "357009490886",
    appId: "1:357009490886:web:7364795a62221e3f3368c7"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }

export default firebase 