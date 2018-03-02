
/*var meetingsRef = firebase.storage();
var meetingsURL = meetingsRef.refFromURL("gs://passenger-recovery.appspot.com/meetings/meetings_v2_1.js");
meetingsURL.getDownloadURL().then(function(url) {
  var script = document.createElement("script");
  script.src= 'https://' + meetingsURL.bucket + '/' + meetingsURL.fullPath;
  document.getElementsByTagName("head")[0].appendChild(script);
});
*/
//function that executes plot points for meetings

function plotMeetings() {

  //loop meetings array to place markers
  for (var i = 0; i < meetings.length; i++) {

    //create variables to store properties of each location
    var location = meetings[i].coords;
    var LtLng = new google.maps.LatLng(location[0],location[1]);
    var title = meetings[i].name;
    var address = meetings[i].address;
    var city = meetings[i].city;
    var state = meetings[i].state;
    var zip = meetings[i].zip;
    var type = meetings[i].type;
    var day = meetings[i].day;
    var time = meetings[i].time;
    var note = meetings[i].note;
    if ( note === undefined ) {

      note = '';
    }
    var AAicon = './img/aa-icon.png';
    var NAicon = './img/na-icon.png';
    //function to determine AA or NA icon
    var icon;

    if ( meetings[i].type === 'AA' ) {

      icon = AAicon;

    } else {

      icon = NAicon;

    }

    //write markers
    var marker = new google.maps.Marker({
      position: LtLng,
      map: map,
      icon: icon
    });

    var ifNote;

    if ( note === '' ) {

      ifNote = '';

    } else {

      ifNote = "<em>Note: </em> ";

    }

    //write content to infowindow
    var windowContent = '<div id="close-button" onclick="closeDiv();">' + '</div>' + '<h1 class="infoText">' + title + '</h1>' + '<p class="infoText">' + address + '</p>' + '<p class="infoText">' + day + ' ' + time + '</p>' + '<p class="infoText">' + ifNote + note + '</p>';
    bindInfoWindow(marker, map, windowContent);
  }
}

//close infoWindow

function closeDiv() {

  document.getElementById("infoDiv").className = "hidden";
}

//execute plot points

$(plotMeetings);

//function that adds marker listeners and gets infowindow

function bindInfoWindow(marker, map, html) {

    google.maps.event.addListener(marker, 'click', function() {

        addDiv.removeClass("visible");
        document.getElementById("infoDiv").className = "visible";
        document.getElementById("infoDiv").innerHTML = html;
      });
}
