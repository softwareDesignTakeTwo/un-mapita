// Algunas funcionalidades fueron tomadas de https://developers.google.com/maps/documentation/javascript/
// Globals
var id = 0;
var places;
var categories;

databaseSetUp();

var database = firebase.database();
var auth = firebase.auth();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (window.location.pathname != "/dashboard.html") {
            window.location.pathname = "/dashboard.html";
        }
    } else {
        if (window.location.pathname != "/index.html") {
            window.location.pathname = "/index.html";
        }
    }
});

var marker;
retrieve('categories', database).then(function(snapshot){
    categories = snapshot.val();
    retrieve('places', database).then(function(snapshot){
        places = snapshot.val();
        for (x in places) {
            var icon = {
                url: categories[places[x].category].icon, // url
                scaledSize: new google.maps.Size(50, 50), // scaled size
            };
            marker = new google.maps.Marker({
                position: JSON.parse( places[x].latLng ),
                label: {text: places[x].name, color: "white"},
                icon: icon,
                map: map
            });
            marker.addListener('click', function(event) {
              map.setZoom(20);
              map.setCenter(event.latLng);
            });
        };
    });
});