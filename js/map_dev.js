var marker;
// Map set-up
var uninorte = {lat: 11.019102, lng: -74.850524}; //considerar poner esto en Firebase
var map;
var currentLatLong;
function initMap() {
    map = new google.maps.Map(document.getElementById("mapita"), {
        zoom: 18,
        center: uninorte,
        mapTypeId: 'satellite',
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: true
    });
    map.addListener('click', function(event) {
        if (marker != null || marker != undefined) {
           marker.setMap(null); 
        }
        document.getElementById("latLng").innerHTML = "Posicion: " + JSON.stringify(event.latLng);
        currentLatLong = event.latLng;
        marker = new google.maps.Marker({
          position: currentLatLong,
          map: map
        });
    });
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}
// End Map set-up


function updateCategories() {
    retrieve('categories', database).then(function(snapshot){
        categories = snapshot.val();
        var cat = document.getElementById("categoria");
        var length = cat.options.length;
        for (i = 0; i < length; i++) {
            cat.options[i] = null;
        }
        for (x in snapshot.val()) {
            var option = document.createElement("option");
            option.text = x;
            cat.add(option);
        }
    });
};

updateCategories();

function savePlace() {
    var nombre = document.getElementById("nombre").value;
    var categoria = document.getElementById("categoria").value;
    addPlace(nombre, currentLatLong, categoria, firebase.database());
    alert("Lugar agregado!");
    retrieve('places', database).then(function(snapshot){
        places = snapshot.val();
        for (x in places) {
            var icon = {
                url: categories[places[x].category].icon, // url
                scaledSize: new google.maps.Size(50, 50), // scaled size
            };
            var marker = new google.maps.Marker({
                position: JSON.parse( places[x].latLng ),
                label: {text: places[x].name, color: "white"},
                icon: icon,
                map: map
            });
        };
    });
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("latLng").innerHTML = "Posicion:";
}

function saveCategory() {
    var nombre = document.getElementById("nombre-categoria").value;
    var icon = document.getElementById("URL").value;
    addCategory(nombre, icon, database);
    alert("Categoría agregada");
    document.getElementById("nombre-categoria").value = "";
    document.getElementById("URL").value = "";
    updateCategories();
}

// Added helpful methods
function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    return marker;
}

function signOut() {
    auth.signOut().then(function() {
        window.location.pathname = "/index.html";
    }).catch(function(error) {
        alert(JSON.stringify(error));
        window.location.pathname = "/index.html";
    });
}

function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '6px';
    controlText.textContent = 'The map shows all clicks made in the last 10 minutes.';
    controlUI.appendChild(controlText);
}

function CenterControl(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Haga click para volver al centro';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Volver al centro';
    controlUI.appendChild(controlText);
    
    controlUI.addEventListener('click', function() {
        map.setZoom(18);
        map.setCenter(uninorte);
    });
}