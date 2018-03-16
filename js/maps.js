var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(30.2946084, -97.7218932),
    mapTypeId: 'roadmap'
  });
}
