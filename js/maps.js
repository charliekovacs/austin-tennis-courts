var map;
var openedInfoWindow = null;

// create the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(30.2946084, -97.7218932),
    mapTypeId: 'roadmap'
  });

  var script = document.createElement('script');
  script.src = 'markers.js';
  document.getElementsByTagName('head')[0].appendChild(script);


  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });



}

// drop in the pre-existing markers
window.feedCallback = function(results) {
  var infowindow = new google.maps.InfoWindow();

  for (var i = 0; i < results.features.length; i++) {
    var coordinates = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);

    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      optimized: false,
      info: results.features[i].properties.notes
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(this.info);

        if (openedInfoWindow != null) openedInfoWindow.close();
        infowindow.open(map, this);
        openedInfoWindow = infowindow;
    });
  }
}

// create new markers (when user clicks on map)
function placeMarker(location) {

  var marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: true,
    optimized: false,
    content: '<div id="form"><table><tr><td>Notes:</td><td><input type="text" id="notes"/></td></tr><tr><td><input type="button" value="Submit" onclick="saveData(document.getElementById(\'notes\').value)"/></td></tr></table></div>'
  });

  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');

  var infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(this.content);

    if (openedInfoWindow != null) openedInfoWindow.close();
    infowindow.open(map, this);
    openedInfoWindow = infowindow;
  });

  google.maps.event.addListener(marker, 'dblclick', function() {
    deleteMarker(this);
  });

}

// delete markers (on double click)
function deleteMarker(marker) {
  marker.setMap(null);
}

function saveData(notes) {
  alert(notes);
  openedInfoWindow.close();
  openedInfoWindow = null;
}
