
function convertTimeFormat(format, str) {
    var time = str;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    var convertedTime = (sHours + sMinutes);
    return convertedTime;
}

function updateTimes() {
  for (i = 0; i < markerArray.length; i++) {
    var markerSerial = markerArray[i].serial;
    var markerTime = markerArray[i].time;
    var markerConvert = convertTimeFormat(24, markerTime);
    var convertObject = {"mNumTime" : markerConvert};
    console.log(markerSerial + ' ' + convertObject);
    firebase.database().ref("meetings/" + markerSerial + '/').update(convertObject);
  }
}
