// Algunas funcionalidades fueron tomadas de https://developers.google.com/maps/documentation/javascript/
// Globals
var places;
var categories;

databaseSetUp();

var database = firebase.database();
var auth = firebase.auth();

retrieve('places', database).then(function(snapshot){
    places = snapshot.val();
    google.maps.event.addListenerOnce(map, 'idle', function(){
        //agregar marcadores
    });
});

