// Algunas funcionalidades fueron tomadas de https://developers.google.com/maps/documentation/javascript/
// Globals
var places;
var categories;

databaseSetUp();

var database = firebase.database();
var auth = firebase.auth();

function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    document.getElementById('email').value = ""; 
    document.getElementById('email').value = ""
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    }).then(function() {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          window.location = 'dashboard.html';
        }
      });
    });
}



retrieve('places', database).then(function(snapshot){
    places = snapshot.val();
    google.maps.event.addListenerOnce(map, 'idle', function(){
        //agregar marcadores
    });
});

