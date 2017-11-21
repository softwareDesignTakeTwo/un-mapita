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

function addPlace(name, latLng, category, info, database) {
  var latLng = JSON.stringify(latLng);
  var newPlace = database.ref('lugares').push().key;
  database.ref('lugares/' + newPlace).set({
      name: name,
      category: category,
      latLng: latLng,
      info: info
  });
  //database.ref('lista-lugares').set(['prueba']);
}