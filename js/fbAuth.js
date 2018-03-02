
var signInScreen = $("#signInScreen").height(windowHeight);
var signInDiv = $("#signInDiv");

//userID input and animation
var userID = $("#userID").on("focusin", animateID).on("focusout", function() {

  if ( userID.val() === "" || undefined ) {
    animateID.removeClass("animateID");
  }

});
var animateID = $("#animateID");

//userPW input and animation
var userPW = $("#userPW").on("focusin", animatePW).on("focusout", function() {

  if ( userPW.val() === "" || undefined ) {

    animatePW.removeClass("animatePW");
  }

});
var animatePW = $("#animatePW");

var signInClose = $("#signInClose").on("click", closeSignIn);
var signInBtn = $("#signInBtn").on("click", function() {
  userSignIn(userID.val(), userPW.val());
});
var authCatch = $("#authCatch");

function openSignIn() {

  signInScreen.addClass("showSignIn");
}

function closeSignIn() {

  signInScreen.removeClass("showSignIn");
}

function userSignIn(email, password) {

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {

    authCatch.text("Sign in succeessful. Welcome!");

    setTimeout( function() {
      closeSignIn();
      userID.val("");
      userID.text("");
      userPW.val("");
      authCatch.text("");
    }, 1000);

  }).catch(function(error) {

  var errorCode = error.code;
  var errorMessage = error.message;

  authCatch.text("Invalid email or password. Try again.");
});

}

function animateID() {

  animateID.addClass("animateID");
}

function animatePW() {

  animatePW.addClass("animatePW");
}
