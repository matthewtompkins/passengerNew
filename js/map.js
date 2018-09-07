
// INIT GOOGLE MAP //

var map;

//autocomplete variables

var placeSearch, autocomplete, place, acMarker, tempAC;

//geolocate variables

var userIcon = "./img/userIcon.png";

//map center

var mapCenter = [];

//Get Map Center

function getMapCenter() {

  var mapLat, mapLng;

  mapLat = Number( getQueryVariable('lat') );

  if ( !mapLat ) {

    mapLat = 42.3974392;
  }

  mapLng = Number( getQueryVariable('lng') );

  if ( !mapLng ) {

    mapLng = -83.0656352;
  }

  mapCenter = [ mapLat, mapLng ];

}

//Get URL Variable

function getQueryVariable(variable) {

   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
}

//launch google maps API and autocomplete API on google map callback function

function initMap() {

  getMapCenter();

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: new google.maps.LatLng( mapCenter[0] , mapCenter[1] ),
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    gestureHandling: 'greedy',
    styles: [
{
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#f5f5f5"
    }
  ]
},
{
  "elementType": "labels.icon",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
},
{
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#616161"
    }
  ]
},
{
  "elementType": "labels.text.stroke",
  "stylers": [
    {
      "color": "#f5f5f5"
    }
  ]
},
{
  "featureType": "administrative.land_parcel",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
},
{
  "featureType": "administrative.land_parcel",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#bdbdbd"
    }
  ]
},
{
  "featureType": "administrative.neighborhood",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
},
{
  "featureType": "landscape",
  "stylers": [
    {
      "color": "#f8f7fc"
    }
  ]
},
{
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#eeeeee"
    }
  ]
},
{
  "featureType": "poi",
  "elementType": "labels.text",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
},
{
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#757575"
    }
  ]
},
{
  "featureType": "poi.business",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#e5e5e5"
    }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#9e9e9e"
    }
  ]
},
{
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#ffffff"
    }
  ]
},
{
  "featureType": "road",
  "elementType": "labels",
  "stylers": [
    {
      "visibility": "on"
    }
  ]
},
{
  "featureType": "road",
  "elementType": "labels.icon",
  "stylers": [
    {
      "visibility": "on"
    }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "labels",
  "stylers": [
    {
      "visibility": "on"
    }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#757575"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#dadada"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#FAC6D0"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#FAC6D0"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "labels",
  "stylers": [
    {
      "visibility": "on"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#616161"
    }
  ]
},
{
  "featureType": "road.local",
  "stylers": [
    {
      "visibility": "on"
    }
  ]
},
{
  "featureType": "road.local",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#9e9e9e"
    }
  ]
},
{
  "featureType": "transit",
  "stylers": [
    {
      "visibility": "on"
    }
  ]
},
{
  "featureType": "transit.line",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#e5e5e5"
    }
  ]
},
{
  "featureType": "transit.station",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#eeeeee"
    }
  ]
},
{
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#c9c9c9"
    }
  ]
},
{
  "featureType": "water",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#c1bfc1"
    }
  ]
},
{
  "featureType": "water",
  "elementType": "labels.text",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
},
{
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#9e9e9e"
    }
  ]
}
]
  });


  // INIT AUTOCOMPLETE

  // Create the autocomplete object, restricting the search to geographical
  // location types.

    autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById("searchForm")),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.

  autocomplete.addListener('place_changed', startSearch);

  acMarker = new google.maps.Marker({
    map: map,
  });

  //generates lvAutocomplete for editing listings

  tempAC = new google.maps.places.Autocomplete(
    (document.getElementById("tempACInput")),
    {types: ['geocode']}
  );

    fadeLoad();
    createUserMarker();
    geoLocateNoSnap();


  //event listener that orders map resize once map hits idle - prevents render issue
  google.maps.event.addListenerOnce(map, 'idle', function () {

    google.maps.event.trigger(map, 'resize');

  });

  //google bounds listener that only shows markers in viewport
  //TODO update this event Listener to maintain active filters
  //on map bounds changed
  //google.maps.event.addListener(map, 'bounds_changed', updateMarkers);

}

//autocomplete search function
function startSearch() {

  place = autocomplete.getPlace();

  //validation and error message

  if ( !place.geometry ) {

    document.getElementById("infoDiv").className = "visible";
    document.getElementById("infoDiv").innerHTML = '<h1 class="infoText">' + "We're sorry, we don't recognize that location." + '</h1>';
  } else {

    map.setCenter(place.geometry.location);
    map.setZoom(13);
    acMarker.setMap(map);
    acMarker.setPosition(place.geometry.location);
  }

  autocomplete.bindTo('bounds', map);
}

//creates a user icon for geolocate featureType

function createUserMarker() {

  userLocation = new google.maps.Marker({
    map: map,
    position: null,
    icon: userIcon
  });
}

//function to display markers in current viewport
//TODO Adapt function to maintain active filters
//when map bounds change

function updateMarkers() {

  for (i = 0; i < markerArray.length; i++) {

    if (map.getBounds().contains(markerArray[i].getPosition()) ) {

      markerArray[i].setVisible(true);
    } else {

      markerArray[i].setVisible(false);
    }
  }
}
