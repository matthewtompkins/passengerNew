//geolocator function

var locateButton = $("#locateButton").on("click", geoLocate);
var userLocation;
var meetingDistance;

function geoLocate() {

  if ( navigator.geolocation ) {

            navigator.geolocation.getCurrentPosition(function(position) {

              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              map.setCenter(pos);
              map.setZoom(13);
              userLocation.setPosition(pos);
            }, function() {

              handleLocationError(true, map.getCenter());
            });

          } else {

            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter());
          }

        function handleLocationError(browserHasGeolocation, pos) {
          errorScreen.addClass("showError");
          errorTxt.text("Geolocation must be enabled to use Passenger's location feature. Please enable geolocation, search for your address manually, or try refreshing your page.");
        }
  }

//working geolocate function that enables geolocate but doesn't shift position of map
//will be deprecated once database has grown and we are no longer demonstrating the app

function geoLocateNoSnap() {

  if ( navigator.geolocation ) {

            navigator.geolocation.getCurrentPosition(function(position) {

              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              userLocation.setPosition(pos);

            }, function() {

              handleLocationError(true, map.getCenter());
            });

          } else {

            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter());
          }

        function handleLocationError(browserHasGeolocation, pos) {

          errorScreen.addClass("showError");
          errorTxt.text("Geolocation must be enabled to use Passenger's location feature. Please enable geolocation, search for your address manually, or try refreshing your page.");
        }
}


function getDistance(lat1, lng1, lat2, lng2) {

  var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: {
              lat : lat1,
              lng : lng1},
            destination: {
              lat : lat2,
              lng : lng2},
            travelMode: google.maps.DirectionsTravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
        };
        
        directionsService.route(directionsRequest, function (response, status) {

            if ( status == google.maps.DirectionsStatus.OK ) {

              meetingDistance = response.routes[0].legs[0].distance.text;
              $("#distanceP").removeClass("callback")
                             .text("Distance: " + meetingDistance);
            } else {

              meetingDistance = '';
            }

        });
}
