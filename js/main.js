// Algunas funcionalidades fueron tomadas de https://developers.google.com/maps/documentation/javascript/
// Globals
var id = 0;
var places;
var categories;

databaseSetUp();

var database = firebase.database();
var auth = firebase.auth();
/*
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.pathname = "/dashboard.html";
    }
});
*/

retrieve('places', database).then(function(snapshot){
    places = snapshot.val();
    for (x in places) {
        var marker = new google.maps.Marker({
            position: JSON.parse( places[x].latLng ),
            label: places[x].name,
            map: map
        });
    };
});

