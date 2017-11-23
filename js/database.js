function databaseSetUp() {
  // Database set-up
  var config = {
    apiKey: "AIzaSyAEXu7X_2bh1Z_eAMBKZu2njp6ifJiH1iw",
    authDomain: "un-mapita-1510518305207.firebaseapp.com",
    databaseURL: "https://un-mapita-1510518305207.firebaseio.com/"
  };
  
  firebase.initializeApp(config);
}
// End Database set-up

function retrieve(url, database) {
  return database.ref(url).once('value');
}

function addPlace(name, latLng, category, database) {
  var latLng = JSON.stringify(latLng);
  var newPlace = database.ref('places').push().key;
  database.ref('places/' + newPlace).set({
      name: name,
      category: category,
      latLng: latLng
  });
}

function addCategory(name, icon, database) {
  database.ref('categories/' + name).set({
      icon: icon
  });
}


function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    document.getElementById('email').value = ""; 
    document.getElementById('password').value = ""
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}