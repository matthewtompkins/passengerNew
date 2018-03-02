
//button variables
var submitAddress = $("#submitAddress").on("click", createMeeting);
var addBtn = $("#addBtn").on("click", function() {

  //check user sign-in
  var user = firebase.auth().currentUser;
  if (user) {
    openAdd();
  } else {
    openSignIn();
  }
});

//meeting property variables
var newMeeting, acInput, name, address, lat, lng, day, time, numTime, hours, numHours, twelveHrTime, type, aa, na, nami, r, note, outputText;
var addDiv = $("#addDiv");
var meetingInput = $("#meetingInput");

//define add form animation listeners
var nameInput = $("#nameInput").on("focusin", animateName).on("focusout", function() {
  if ( nameInput.val() === "" || nameInput.val() === undefined ) {
    animateName.removeClass("animateName");
  } else {
    doNothing();
  }
});
var animateName = $("#animateName");

var timeSelect = $("#hourSelect").on("focusin", animateTime).on("focusout", function() {
  if (timeSelect.val() === "" || timeSelect.val() === undefined) {
    animateTime.removeClass("animateTime");
  } else {
    doNothing();
  }
});
var animateTime = $("#animateTime");

var dayValue = $("#dayValue").on("click", openDay);
var dayBtn = $("#dayBtn").on("click", openDay);
var daySelect = $("#daySelect");

var animateDay = $("#animateDay");

var dayList = $("#dayList");
var monday = $("#monday").on("click", function() {
  selectDay("Monday");
});
var tuesday = $("#tuesday").on("click", function() {
  selectDay("Tuesday");
});
var wednesday = $("#wednesday").on("click", function() {
  selectDay("Wednesday");
});
var thursday = $("#thursday").on("click", function() {
  selectDay("Thursday");
});
var friday = $("#friday").on("click", function() {
  selectDay("Friday");
});
var saturday = $("#saturday").on("click", function() {
  selectDay("Saturday");
});
var sunday = $("#sunday").on("click", function() {
  selectDay("Sunday");
});


//type radio variables
var aaRadio, naRadio, namiRadio, rRadio, radioImg;
aaRadio = $("#aa");
naRadio = $("#na");
namiRadio = $("#nami");
rRadio = $("#r");
radioImgAA = $("#radioImgAA").on("click", checkAA);
radioImgNA = $("#radioImgNA").on("click", checkNA);
radioImgNAMI = $("#radioImgNAMI").on("click", checkNAMI);
radioImgR = $("#radioImgR").on("click", checkR);
radioImg = $(".radioImg").height( aaRadio.height() ).width( aaRadio.height() );


//noteInput variables
var noteInput = $("#noteInput").on("focusin", makeOutline).on("focusout", function() {
  if (noteInput.val() === "" || noteInput.val() === undefined) {
    removeOutline();
  } else {
    doNothing();
  }
});
var textAreaAfterTL = $("#textAreaAfterTL");
var textAreaAfterBR = $("#textAreaAfterBR");
var animateNote = $("#animateNote");


//close window
var inputClose = $("#inputClose").on("click", closeAdd);

//sample meeting display variables
var sampleMeeting = $("#sampleMeeting");
var sampleDiv = $("#sampleDiv");
var sampleName = $("#sampleName");
var sampleAddress = $("#sampleAddress");
var sampleTime = $("#sampleTime");
var sampleType = $("#sampleType");
var sampleNote = $("#sampleNote");
var uploadMeeting = $("#uploadMeeting").on("click", writeMeetingData);
var changeInfo = $("#changeInfo").on("click", closeSample);
var successContainer = $("#successContainer");
var failureContainer = $("#failureContainer").height(windowHeight);
var failureBtn = $("#failureBtn").on("click", function() {

  failureContainer.removeClass("showFailure");
});

//error variables for duplicate entries
var errorListing = $("#errorListing");
var errorLV = $("#errorLV");
var errorTxtListing = $("#errorTxtListing");
var errorName = $("#errorName");
var errorAddress = $("#errorAddress");
var errorTime = $("#errorTime");
var errorType = $("#errorType");
var errorNote = $("#errorNote");

//file storage variables
var meetingsBlob, meetingsBackup, fileContent, fileURL;

//storage variables
var storage = firebase.storage();
var storageRef = storage.ref();
var storageChild = storageRef.child('meetings/meetings.js');
var date = new Date();
var now = date.getTime();
var storageChildBackup = storageRef.child('meetings/meetings' + now + '.js');

//validation variables
var illegalCharacters = ['<', '>', '?', '!', '@', '#', '$', '%', '^', '*', '[', ']', '+', '/', '='];

//on add button click, opens infodiv with input fields

function openAdd() {

  addDiv.addClass("visible");

  //close info window if open
  if ( $("#infoDiv").hasClass("visible") ) {

    $("#infoDiv").removeClass("visible");
  }

  //close add window if open
  if ( filterDiv.hasClass("visible") ) {

    closeFilterOptions();
  }
}

//takes input from addDiv and converts it into a sample listing for user approval

function createMeeting() {

  acInput = autocomplete.getPlace();

  //if no autocomplete, show error
  if ( acInput === undefined ) {

    errorScreen.addClass("showError");
    errorTxt.text("Please enter a valid location.");
  }

  name = nameInput.val();

  //name validation

  if ( name === "" ) {
    errorScreen.addClass("showError");
    errorTxt.text("Please enter a valid name.");
    return false;
  }

  //validation to prevent malicious code
  for ( i = 0; i < illegalCharacters.length; i++ ){

    if ( name.includes(illegalCharacters[i]) ) {

      errorScreen.addClass("showError");
      errorTxt.text("Name contains characters that aren't allowed (e.g. '!', '@', '$', etc)");
      return false;
    }
  }

  address = acInput.formatted_address;
  lat = acInput.geometry.location.lat();
  lng = acInput.geometry.location.lng();

  var getHours = $("#hourSelect").val();
  var getMinutes = $("#minuteSelect").val();
  var getMeridiem = $("#meridiemSelect").val();
  time = getHours + ':' + getMinutes + ' ' + getMeridiem;
  if (getMeridiem === "PM" && Number(getHours) === 12) {
    numTime = getHours + getMinutes;
  } else if (getMeridiem === "PM" && Number(getHours) < 12) {
    var convertHour = Number(getHours) + 12;
    numTime = convertHour + getMinutes;
  } else if (getMeridiem === "AM" && getHours === "12") {
    numTime = "000";
  }  else {
    numTime = getHours + getMinutes;
  }

  //time validation
  if ( time === "" ) {

    errorScreen.addClass("showError");
    errorTxt.text("Please enter a valid time.");
    return false;
  }

  //convert time to 12 hour time
/*  var hours, minutes;
  hours = time.slice(0,2);
  minutes = time.slice(3,5);
  numTime = hours + minutes;
  numHours = Number(hours);
  numMin = Number(minutes);
  if (numHours > 12) {
    numHours = (numHours - 12) + ':' + minutes + ' PM';
  } else if (numHours < 12){
    numHours = numHours + ':' + minutes + ' AM';
  } else if (numHours === 12) {
    numHours = '12:00 PM';
  } */

  day = daySelect.val();

  aa = document.getElementById("aa");
  na = document.getElementById("na");
  nami = document.getElementById("nami");
  r = document.getElementById("r");

  if ( aa.checked ) {

    type = "AA";
  } else if ( na.checked ) {

    type = "NA";
  } else if ( nami.checked ) {

    type = "NAMI";
  } else if ( r.checked ) {

    type = "R";
  }

  note = $("#noteInput").val();

  //note validation to prevent malicious code

  for (i = 0; i < illegalCharacters.length; i++){

    if ( note === "" ) {

      doNothing;
    } else if ( note.includes(illegalCharacters[i]) ) {

    errorScreen.addClass("showError");
    errorTxt.text("Note contains characters that aren't allowed (e.g. '!', '@', '$', etc)");
    return false;
    }
  }

  sampleMeeting.addClass("showSampleMeeting");
  sampleName.text(name);
  sampleAddress.text(address);
  sampleTime.text(day + ' ' + time);
  sampleType.text(type);
  sampleNote.text(note);

//checks new meeting against marker array for duplicate entry

 for (i = 0; i < markerArray.length; i++) {

   if ( address === markerArray[i].address || name === markerArray[i].name ) {
     errorScreen.addClass("showError");
     var currentHeight = $(document).height();
     errorLV.addClass("visible")
            //.css("max-height", currentHeight * 100 / 125);
     errorTxt.text("We may already have this meeting - please check below.");
     var errorLVDiv = $("<div></div>").addClass("errorListing");
     var errorName = $("<p></p>").addClass("errorTitle")
                                 .text(markerArray[i].name);
     var errorAddress = $("<p></p>").addClass("errorP")
                                    .text(markerArray[i].address);
     var errorTime = $("<p></p>").addClass("errorP")
                                 .text(markerArray[i].day + ' ' + markerArray[i].time);
     var errorType = $("<p></p>").addClass("errorP")
                                 .text(markerArray[i].type);
     var errorNote = $("<p></p>").addClass("errorP")
                                 .text(markerArray[i].note);
     errorLVDiv.append(errorName, errorAddress, errorTime, errorType, errorNote);

      if ( !verifyDiv ) {

        var verifyTxt = $("<p></p>").addClass("errorP")
                                    .attr("id", "verifyTxt")
                                    .text("Continue adding meeting?")
        var goBackBtn = $("<p></p>").addClass("verifyBtn")
                                    .text("Cancel")
                                    .on("click", goBack);
        var notSameBtn = $("<p></p>").addClass("verifyBtn")
                                    .text("Proceed")
                                    .on("click", notSame);

        var verifyDiv = $("<div></div>").addClass("verifyDiv");
        verifyDiv.append(verifyTxt, goBackBtn, notSameBtn);
        errorMsg.append(verifyDiv);
      }

      errorLV.prepend(errorLVDiv);

     //break;
   }
 }
}


//closes add meeting window
//removes animation classes
function closeAdd() {

  addDiv.removeClass("visible");

  noteInput.val(undefined);

  if ( dayList.css("display", "block") ) {

    dayList.toggle("visible");
  }

  if ( animateName.hasClass("animateName") ) {

    animateName.removeClass("animateName");
  }

  if ( animateTime.hasClass("animateTime") ) {

    animateTime.removeClass("animateTime");
  }

  if ( animateDay.hasClass("animateDay") ) {

    animateDay.removeClass("animateDay");
  }

  if ( animateNote.hasClass("animateNote") ) {

    animateNote.removeClass("animateNote");

    textAreaAfterTL.css({
      "height" : "0",
      "width" : "0",
      "border-top" : "0",
      "border-left" : "0"
    });

    textAreaAfterBR.css({
      "height" : "0",
      "width" : "0",
      "border-bottom" : "0",
      "border-right" : "0"
    });
  }
  acMarker.setMap(null);
}

//closes meeting sample display
function closeSample() {

  sampleMeeting.removeClass("showSampleMeeting");
  acMarker.setMap(null);
}

//writes meeting to google base
function writeMeetingData() {

  //generates current milliseconds and uses it as a serial number for new meeting
    var date = new Date();
    var now = date.getTime();
  asyncDatabase.ref('meetings/' + now).set({
    mSerial : now,
    mName : name,
    mAddress : address,
    mCoords : [lat,lng],
    mDay : day,
    mTime : time,
    mNumTime : numTime,
    mType : type,
    mNote : note
  }).then(function() {
    successContainer.addClass("showSuccess");
    setTimeout(function() {
      sampleMeeting.removeClass("showSampleMeeting");
      successContainer.removeClass("showSuccess");
    }, 1000);
    addDiv.removeClass("visible");
    acMarker.setMap(null);
  }).catch(function(error) {
    failureContainer.addClass("showFailure");
  });
}


//if listing is the same as an existing meeting, this function allows you to exit the add process

function goBack() {

  errorScreen.removeClass("showError");
  sampleMeeting.removeClass("showSampleMeeting");
  addDiv.removeClass("visible");
  $(".errorListing").remove();
  $("#verifyTxt").remove();
  $(".verifyBtn").remove();
  $(".verifyDiv").remove();
  $("#searchForm").val("");
  $("#nameInput").val("");
  $("#noteInput").val("");
  name = '';
  address = '';
  day = '';
  time = '';
  type = '';
  note = '';
  acMarker.setMap(null);
}

//if 'similar listing' prompt does not match new meeting, this simply exits prompt, and allows user to proceed

function notSame() {

  errorScreen.removeClass("showError");
  $(".errorListing").remove();
  $("#verifyTxt").remove();
  $(".verifyBtn").remove();
  $(".verifyDiv").remove();
}

function doNothing() {

}

//add form animations

function animateName() {

  animateName.addClass("animateName");
}

function animateTime() {

  animateTime.addClass("animateTime");
}

//day select functions

function openDay() {

  dayList.toggle("visible");
}

function selectDay(day) {

  dayList.toggle("visible");
  dayValue.text(day);
  daySelect.val(day);
  dayValue.css("color", "#7A7575");
  animateDay.addClass("animateDay");
}

//type select functions
function checkAA() {
  aaRadio.prop("checked", true);
  radioImgAA.removeClass("radioUnselect")
            .addClass("radioSelect");
  radioImgNA.removeClass("radioSelect")
            .addClass("radioUnselect");
  radioImgNAMI.removeClass("radioSelect")
              .addClass("radioUnselect");
  radioImgR.removeClass("radioSelect")
            .addClass("radioUnselect");

}

function checkNA() {
  naRadio.prop("checked", true);
  radioImgNA.removeClass("radioUnselect")
            .addClass("radioSelect");
  radioImgAA.removeClass("radioSelect")
            .addClass("radioUnselect");
  radioImgNAMI.removeClass("radioSelect")
              .addClass("radioUnselect");
  radioImgR.removeClass("radioSelect")
            .addClass("radioUnselect");

}

function checkNAMI() {
  namiRadio.prop("checked", true);
  radioImgNAMI.removeClass("radioUnselect")
              .addClass("radioSelect");
  radioImgAA.removeClass("radioSelect")
            .addClass("radioUnselect");
  radioImgNA.removeClass("radioSelect")
            .addClass("radioUnselect");
  radioImgR.removeClass("radioSelect")
            .addClass("radioUnselect");
}

function checkR() {
  rRadio.prop("checked", true);
  radioImgR.removeClass("radioUnselect")
              .addClass("radioSelect");
  radioImgAA.removeClass("radioSelect")
            .addClass("radioUnselect");
  radioImgNA.removeClass("radioSelect")
            .addClass("radioUnselect");
  radioImgNAMI.removeClass("radioSelect")
              .addClass("radioUnselect");
}

//noteInput animation functions
function makeOutline() {

  textAreaAfterTL.css({
    "height" : "100%",
    "width" : "100%",
    "border-left" : "2px solid #DB9CB1",
    "border-top" : "2px solid #DB9CB1"
  });
  textAreaAfterBR.css({
    "height" : "100%",
    "width" : "100%",
    "border-right" : "2px solid #DB9CB1",
    "border-bottom" : "2px solid #DB9CB1"
  });
  animateNote.addClass("animateNote");
}

function removeOutline() {

  textAreaAfterTL.css({
    "height" : "0",
    "width" : "0",
    "border-top" : "0",
    "border-left" : "0"
  });
  textAreaAfterBR.css({
    "height" : "0",
    "width" : "0",
    "border-bottom" : "0",
    "border-right" : "0"
  });
  animateNote.removeClass("animateNote");
}
