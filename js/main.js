var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('mapita'), {
    zoom: 18,
    center: {lat: 11.019102, lng: -74.850524},
    mapTypeId: 'satellite',
    disableDefaultUI: true,
    zoomControl: true,
    scaleControl: true,
    streetViewControl: true
  });
  
  map.addListener('click', function(event) {
      var marker = addMarker(event.latLng);
      marker.addListener('click', function() {
          map.setZoom(20);
          map.setCenter(marker.getPosition());
        });
    });

    makeInfoBox(document.getElementById('map-container'), map);
}



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