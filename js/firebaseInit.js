
var config = {
  apiKey: "AIzaSyCvdPSYzRyC1NKc6Tqp8LrAqr30dM4baVM",
  authDomain: "passenger-recovery.firebaseapp.com",
  databaseURL: "https://passenger-recovery.firebaseio.com",
  storageBucket: "passenger-recovery.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
