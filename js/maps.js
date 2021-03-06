var map;
var openedInfoWindow = null;
var currentMarker = null;


var options = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];



// create the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(30.2946084, -97.7218932),
    mapTypeId: 'roadmap',
    styles: options
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

  if (currentMarker != null) marker.setMap(null);

  marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: true,
    optimized: false,
    content: '<div id="form"><table><tr><td>Notes:</td><td><input type="text" id="notes"/></td></tr><tr><td><input type="button" value="Submit" onclick="saveData(document.getElementById(\'notes\').value)"/></td></tr></table></div>'
  });

  currentMarker = marker;

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
  openedInfoWindow.close();
  openedInfoWindow = null;

  var date = new Date();
  var userSubmission = date + '~' + currentMarker.position + '~' + notes;

  // save input data here to a txt file via php
$(document).ready(function() {
  $.ajax ({
    type: "POST",
    url: "http://charliekovacs.com/tennis/tennis.php",
    data: userSubmission,
    success: function() {
      alert('Thanks! We got your submission, we will take a look at adding it to the map');
    }
  });
})

}
