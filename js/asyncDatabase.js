

var asyncDatabase = firebase.database();
var asyncMeetings = asyncDatabase.ref('/meetings/');
var key, childData, addMeetings;
var meetings;
var markerArray = [];
var mSerial;
var marker;

var infoDiv = $("#infoDiv");

var aaRetinaRef = './img/aaRetina.png';
var naRetinaRef = './img/naRetina.png';
var namiRetinaRef = './img/namiRetina.png';
var rRetinaRef = './img/rRetina.png';

//selected marker properties on click
var sName, sAddress, sLatLng, sDay, sTime, sNumTime, sType, sNote;


function getMeetings() {

  var meetings = firebase.database().ref("meetings").orderByKey();
  meetings.on("value", function(snapshot) {

    //clears current markerArray so snapshot does not double current array
    //every time database is changed, all active users are sent a call to
    //update the database. In this instance, that would re-push the same meetings
    //into the markerArray
    markerArray = [];
    snapshot.forEach(function(childSnapshot) {

      //sends childSnapshots to logMeetings function as they are ready
        logAllMeetings(childSnapshot.val());
      });
  });
}

$(getMeetings);

function logAllMeetings(value) {

  var serial = value.mSerial;
  var name = value.mName;
  var address = value.mAddress;
  var latLng = { lat : Number(value.mCoords[0]) , lng : Number(value.mCoords[1]) };
  var day = value.mDay;
  var time = value.mTime;
  var numTime = value.mNumTime;
  var type = value.mType;
  var note = value.mNote;

  //change header color for NA meetings
  //TODO move each of these variables into the corresponding if/then statements
  //So each meeting isn't generating 4 variables, only 1 of which will end up being used

  var naInfoText = '<h1 class="naInfoText">' + name + '</h1>';
  var aaInfoText = '<h1 class="aaInfoText">' + name + '</h1>';
  var namiInfoText = '<h1 class="namiInfoText">' + name + '</h1>';
  var rInfoText = '<h1 class="rInfoText">' + name + '</h1>';
  var meetingHeader;

  //choose type of icon to display
  if ( type === "AA" ) {

    var aaRetina = {
      url : aaRetinaRef,
      scaledSize : new google.maps.Size(30,30),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(15,30)
    }

    icon = aaRetina;
    meetingHeader = aaInfoText;

  } else if ( type === "NA" ) {

    var naRetina = {
      url : naRetinaRef,
      scaledSize : new google.maps.Size(30,30),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(15,30)
    }

    icon = naRetina;
    meetingHeader = naInfoText;

  } else if ( type === "NAMI" ) {

    var namiRetina = {
      url : namiRetinaRef,
      scaledSize : new google.maps.Size(30,30),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(15,30)
    }

    icon = namiRetina;
    meetingHeader = namiInfoText;

  } else if ( type === "R" ) {

    var rRetina = {
      url : rRetinaRef,
      scaledSize : new google.maps.Size(30,30),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(15,30)
    }

    icon = rRetina;
    meetingHeader = rInfoText;
  }


  //drop marker
    marker = new google.maps.Marker ({
    map: map,
    position: latLng,
    lat: latLng.lat,
    lng: latLng.lng,
    icon: icon,
    name: name,
    address: address,
    day: day,
    time: time,
    numTime: numTime,
    type: type,
    serial: serial,
    note: note
  });

  markerArray.push(marker);

  //if user curently has near me enabled, any meetings added
  //will not interfere with the filter
    if ( nearMeFilter === true ) {

      marker.setVisible(false);
    }


  //Don't display empty notes
  var ifNote;
  if ( note === '' || note === undefined ) {

    ifNote = '';
  } else {

    ifNote = "<em>Note: </em> ";
  }

  var googleLink = "https://maps.google.com/?q=" + address;

  //TODO This should be switched over to standard JS DOM manipulation, not jQuery
  var reportBtn = $("<p></p>").addClass("reportBtn")
                              .text("Report Issue")
                              .on("click", function() {

                                reportMeeting(name, address, day, time, type, serial);
                              });

  //write content to infowindow
  //TODO dirty code - create individual DOM elements and append to parent Div
  //rather than a long string of HTML
  var windowContent = '<div id="close-button" onclick="closeDiv();">' + '</div>' + meetingHeader + '<p class="infoText">' + address + '</p>' + '<p class="infoText">' + day + ' ' + time + '</p>' + '<p class="infoText">' + '<p class="infoText">' + ifNote + note + '</p>' + '<p id="distanceP" class="infoText callback">Calculating distance...</p>' + '<a class="getDirections" target="_blank" href="' + googleLink + '">' + "Get Directions" + '</a>';
  bindInfoWindow(marker, map, windowContent, reportBtn, marker.lat, marker.lng);

}

//function that adds marker listeners and gets infowindow

function bindInfoWindow(marker, map, html, report, lat, lng) {
    google.maps.event.addListener(marker, 'click', function() {

        closeAdd();
        closeFilterOptions();

        //checks for geolocation and calculates distance from user
        if ( navigator.geolocation ) {

          navigator.geolocation.getCurrentPosition(function(position) {

            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            getDistance(pos.lat, pos.lng, lat, lng);
          });
        }

        infoDiv.addClass("visible")
                     .html(html)
                     .append(report);

        //document.getElementById("infoDiv").className = "visible";
        //document.getElementById("infoDiv").innerHTML = html;
      });
}


//close infoWindow

function closeDiv() {
  infoDiv.removeClass("visible");
}
