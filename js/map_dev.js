
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
        document.getElementById("latLng").innerHTML += JSON.stringify(event.latLng);
        currentLatLong = event.latLng;
        var marker = addMarker(event.latLng);
        marker.addListener('click', function() {
            map.setZoom(20);
            map.setCenter(marker.getPosition());
        });
    });
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}
// End Map set-up

function savePlace() {
    var nombre = document.getElementById("nombre").value;
    var categoria = document.getElementById("categoria");
    addPlace(nombre, currentLatLong, categoria, firebase.database());
}

function saveCategory() {
    
}

// Added helpful methods
function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    return marker;
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