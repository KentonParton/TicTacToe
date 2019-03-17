// Node Module
import firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "enter_api_key",
    authDomain: "tictactoe-e38cb.firebaseapp.com",
    databaseURL: "https://tictactoe-e38cb.firebaseio.com",
    projectId: "tictactoe-e38cb",
    storageBucket: "tictactoe-e38cb.appspot.com",
    messagingSenderId: "693056372381"
  };

// Constant for firebase database
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;