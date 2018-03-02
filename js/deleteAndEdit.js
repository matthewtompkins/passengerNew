
//Delete Screen variables
var deleteScreen = $("#deleteScreen");
var deleteName = $("#deleteName");
var deleteAddress = $("#deleteAddress");
var deleteTime = $("#deleteTime");
var deleteType = $("#deleteType");
var deleteNote = $("#deleteNote");
var deleteConfirm = $("#deleteConfirm");
var deleteCancel = $("#deleteCancel");
var deleteSuccess = $("#deleteSuccess");

//Temporary autocomplete for editing
var tempACInput = $("#tempACInput");

function deletePrompt(serial, name, address, day, time, type, note) {

  deleteScreen.addClass("showDelete");
  deleteName.text(name);
  deleteAddress.text(address);
  deleteTime.text(day + ' ' + time);
  deleteType.text(type);
  deleteNote.text(note);

  deleteConfirm.on("click", function() {

    var deleteRef = firebase.database().ref("meetings/" + serial + "/").remove().then(function() {

      //loop serial through array to find meeting, delete from array
      for (i = 0; i < markerArray.length; i++) {
        if ( markerArray[i].serial == serial ) {

          markerArray[i].setVisible(false);
          markerArray.splice(i, 1);
        }
      }

      $(".lvPush").remove();
      createLV();
      deleteSuccess.addClass("visible");
      setTimeout(function() {
        closeDelete();
      }, 1000);
    });
  });

  deleteCancel.on("click", function() {

    closeDelete();
  });
}

function closeDelete() {

  deleteScreen.removeClass("showDelete");
  deleteSuccess.removeClass("visible");
}

//determines which listing attribute is being called and creates an edit input
function editListingAttr(target, attribute, value, path) {

  if ( attribute === "name" ) {

    //grabs existing listing info and removes display
    var listingTitle = target.prev();
    listingTitle.css("display", "none");

    //generates new input, sets value to $(this) value argument
    var tempInput = $("<input>").addClass("tempInput").val(value);

    //hides edit icon
    target.css("display", "none");

    //creates uploadIcon
    var uploadIcon = $("<div></div>").addClass("uploadIcon").on("click", function() {

      //when upload click, grab temp input info, remove input field, bring back existing field
      var getInfo = tempInput.val();
      listingTitle.css("display", "inline-block").text(getInfo);
      tempInput.remove();
      uploadIcon.remove();
      target.css("display", "inline-block");
      //update value to existing field
      target.attr("name", getInfo);
      //upload info
      uploadInfo(path, "mName", getInfo);
    });
    var parentDiv = target.parent();
    parentDiv.prepend(tempInput);
    parentDiv.append(uploadIcon);

  } else if ( attribute === "address" ) {

    var listingAddress = target.prev();
    listingAddress.css("display", "none");
    tempACInput.css("display", "inline-block")
               .val(value);
    target.css("display", "none");
    var uploadIcon = $("<div></div>").addClass("uploadIcon").on("click", function() {

      var inpAddress = tempAC.getPlace();
      if( inpAddress === undefined ) {

        errorScreen.addClass("showError");
        errorTxt.text("Please enter a valid location.");

      } else {

        var getAddress = inpAddress.formatted_address;
        var getLat = inpAddress.geometry.location.lat();
        var getLng = inpAddress.geometry.location.lng();
        var getCoords = [ getLat, getLng ];
        listingAddress.css("display", "inline-block").text(getAddress);
        tempACInput.css("display", "none");
        uploadIcon.remove();
        target.css("display", "inline-block");
        target.attr("address", getAddress);
        uploadInfo(path, "mAddress", getAddress);
        uploadInfo(path, "mCoords", getCoords);

      }
    });

    var parentDiv = target.parent();
    parentDiv.prepend(tempACInput);
    parentDiv.append(uploadIcon);

  } else if ( attribute === "day" ) {

    var listingDay = target.prev();
    listingDay.css("display", "none");
    var tempDaySelect = $("<select></select>").addClass("tempDay");
    var tempMonday = $("<option>Monday</option>").val("Monday");
    var tempTuesday = $("<option>Tuesday</option>").val("Tuesday");
    var tempWednesday = $("<option>Wednesday</option>").val("Wednesday");
    var tempThursday = $("<option>Thursday</option>").val("Thursday");
    var tempFriday = $("<option>Friday</option>").val("Friday");
    var tempSaturday = $("<option>Saturday</option>").val("Saturday");
    var tempSunday = $("<option>Sunday</option>").val("Sunday");
    target.css("display", "none");
    var uploadIcon = $("<div></div>").addClass("uploadIcon").on("click", function() {

      var getDay = tempDaySelect.val();
      listingDay.css("display", "inline-block").text(getDay);
      tempDaySelect.remove();
      uploadIcon.remove();
      target.css("display", "inline-block");
      target.attr("day", getDay);
      uploadInfo(path, "mDay", getDay);

    });

    var parentDiv = target.parent();
    parentDiv.prepend(tempDaySelect);
    tempDaySelect.append(tempMonday, tempTuesday, tempWednesday, tempThursday, tempFriday, tempSaturday, tempSunday);
    parentDiv.append(uploadIcon);

  } else if ( attribute === "time" ) {

    var listingTime = target.prev();
    listingTime.css("display", "none");
    var tempHourSelect = $("<select></select").addClass("tempTime");
    var tempTwelve = $("<option>12</option>").val("12");
    var tempOne = $("<option>1</option>").val("1");
    var tempTwo = $("<option>2</option>").val("2");
    var tempThree = $("<option>3</option>").val("3");
    var tempFour = $("<option>4</option>").val("4");
    var tempFive = $("<option>5</option>").val("5");
    var tempSix = $("<option>6</option>").val("6");
    var tempSeven = $("<option>7</option>").val("7");
    var tempEight = $("<option>8</option>").val("8");
    var tempNine = $("<option>9</option>").val("9");
    var tempTen = $("<option>10</option>").val("10");
    var tempEleven = $("<option>11</option>").val("11");
    tempHourSelect.append(tempTwelve, tempOne, tempTwo, tempThree, tempFour, tempFive, tempSix, tempSeven, tempEight, tempNine, tempTen, tempEleven);
    var tempColon = $("<p> : </p>").addClass("elP");
    var tempMinuteSelect = $("<select></select>").addClass("tempTime");
    var tempZero = $("<option>00</option>").val("00");
    var tempFifteen = $("<option>15</option>").val("15");
    var tempThirty = $("<option>30</option>").val("30");
    var tempFortyFive = $("<option>45</option>").val("45");
    tempMinuteSelect.append(tempZero, tempFifteen, tempThirty, tempFortyFive);
    var tempMeridiemSelect = $("<select></select>").addClass("tempTime");
    var tempAM = $("<option>AM</option>").val("AM");
    var tempPM = $("<option>PM</option>").val("PM");
    tempMeridiemSelect.append(tempAM, tempPM);
    target.css("display", "none");
    var uploadIcon = $("<div></div>").addClass("uploadIcon").on("click", function() {

      var getTime = tempHourSelect.val() + ':' + tempMinuteSelect.val() + ' ' + tempMeridiemSelect.val();
      var getNumTime, getNumHour;
      if ( tempMeridiemSelect.val() === "PM" ) {

        var getNumHour = Number(tempHourSelect.val()) + 12;
        getNumTime = getNumHour + tempMinuteSelect.val();

      } else {

        var getNumTime = tempHourSelect.val() + tempMinuteSelect.val();
      }

      listingTime.css("display", "inline-block").text(getTime);
      tempHourSelect.remove();
      tempColon.remove();
      tempMinuteSelect.remove();
      tempMeridiemSelect.remove();
      uploadIcon.remove();
      target.css("display", "inline-block");
      uploadInfo(path, "mTime", getTime);
      uploadInfo(path, "mNumTime", getNumTime);

    });

    var parentDiv = target.parent();
    parentDiv.prepend(tempHourSelect, tempColon, tempMinuteSelect, tempMeridiemSelect, uploadIcon);
  } else if ( attribute === "type" ) {

    var listingType = target.prev();
    listingType.css("display", "none");
    var tempTypeSelect = $("<select></select>").addClass("tempType");
    var tempAA = $("<option>AA</option>").val("AA");
    var tempNA = $("<option>NA</option>").val("NA");
    var tempNAMI = $("<option>NAMI</option>").val("NAMI");
    tempTypeSelect.prepend(tempAA, tempNA, tempNAMI);
    target.css("display", "none");
    var uploadIcon = $("<div></div>").addClass("uploadIcon").on("click", function() {

      var getType = tempTypeSelect.val();
      listingType.css("display", "inline-block").text(getType);
      tempTypeSelect.remove();
      uploadIcon.remove();
      target.css("display", "inline-block");
      uploadInfo(path, "mType", getType);

    });

    var parentDiv = target.parent();
    parentDiv.prepend(tempTypeSelect, uploadIcon);

  } else if ( attribute === "note" ) {

    var listingNote = target.prev();
    listingNote.css("display", "none");
    var tempNote = $("<textarea></textarea>").addClass("tempNote").attr("maxlength", "140");
    target.css("display", "none");
    var uploadIcon = $("<div></div>").addClass("uploadIcon").on("click", function() {

      var getNote = tempNote.val();
      listingNote.css("display", "inline-block").text(getNote);
      tempNote.remove();
      uploadIcon.remove();
      target.css("display", "inline-block");
      uploadInfo(path, "mNote", getNote);
    });

    var parentDiv = target.parent();
    parentDiv.prepend(tempNote, uploadIcon);
    
  }
}

function uploadInfo(infoPath, getProperty, newInfo) {

  //generates object and uploads to database
  var updateObject = {};
  updateObject[getProperty] = newInfo;
  var updateRef = firebase.database().ref(infoPath).update(updateObject);
}
