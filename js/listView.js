
var listViewScreen = $("#listViewScreen").css("min-height", windowHeight);
var lvContainer = $("#lvContainer").css("min-height", windowHeight - 40);

//lv filter
var lvNearMe = $("#lvNearMe").on("click", function() {

    showNearMe();
    filterToday();
    createLV();
});

function createLV() {

  $(".lvListing").remove();

  //sort alphatbetically (default)
  function compare(a,b) {

    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }

    return 0;
  }

  markerArray.sort(compare);

  for (i = 0; i < markerArray.length; i++) {

    if ( markerArray[i].getVisible() && map.getBounds().contains(markerArray[i].getPosition()) ) {

      var listing = $("<div></div>").addClass("lvListing");
      lvContainer.append(listing);

      var lvName = markerArray[i].name;
      var lvAddress = markerArray[i].address;
      var lvDay = markerArray[i].day;
      var lvTime = markerArray[i].time;
      var lvCombTime = lvDay  + ' ' + lvTime;
      var lvType = markerArray[i].type;
      var lvNote = markerArray[i].note;

      if ( lvNote === undefined || lvNote === '' ) {
        lvNote = "";
      }

      var lvSerial = markerArray[i].serial;

      var elTitleDiv = $("<div></div>").addClass("lvAttrDiv")
                                       .attr("id", "elTitleDiv");
      var elTitle = $("<h2></h2>").addClass("elTitle").text(lvName);
      var editName = $("<div></div>").addClass("editAttr")
                                     .attr("name", lvName)
                                     .attr("serial", lvSerial)
                                     .on("click", function() {

                                        editListingAttr($(this), "name", $(this).attr("name"), "meetings/" + $(this).attr("serial"));
                                      });
      elTitleDiv.append(elTitle, editName);

      var elAddressDiv = $("<div></div>").addClass("lvAttrDiv")
                                         .attr("id", "elTitleDiv");
      var elAddress = $("<p></p>").addClass("elAddress")
                                  .text(lvAddress);
      var editAddress = $("<div></div>").addClass("editAttr")
                                        .attr("address", lvAddress)
                                        .attr("serial", lvSerial)
                                        .on("click", function() {

                                          editListingAttr($(this), "address", $(this).attr("address"), "meetings/" + $(this).attr("serial"));
                                        });
      elAddressDiv.append(elAddress, editAddress);


      var elDayDiv = $("<div></div>").addClass("lvAttrDiv")
                                     .attr("id", "elDayDiv");
      var elDay = $("<p></p>").addClass("elP")
                              .text(lvDay);
      var editDay = $("<div></div>").addClass("editAttr")
                                    .attr("day", lvDay)
                                    .attr("serial", lvSerial)
                                    .on("click", function() {

                                      editListingAttr($(this), "day", $(this).attr("day"), "meetings/" + $(this).attr("serial"));
                                    });
      elDayDiv.append(elDay, editDay);

      var elTimeDiv = $("<div></div>").addClass("lvAttrDiv")
                                      .attr("id", "elTimeDiv");
      var elTime = $("<p></p>").addClass("elP")
                               .text(lvTime);
      var editTime = $("<div></div>").addClass("editAttr")
                                     .attr("time", lvTime)
                                    .attr("serial", lvSerial)
                                    .on("click", function() {

                                      editListingAttr($(this), "time", $(this).attr("time"), "meetings/" + $(this).attr("serial"));
                                    });
      elTimeDiv.append(elTime, editTime);

      var elTypeDiv = $("<div></div>").addClass("lvAttrDiv")
                                      .attr("id", "elTypeDiv");
      var elType = $("<p></p>").addClass("elP")
                               .text(lvType);
      var editType = $("<div></div>").addClass("editAttr")
                                     .attr("type", lvType)
                                     .attr("serial", lvSerial)
                                     .on("click", function() {

                                        editListingAttr($(this), "type", $(this).attr("type"), "meetings/" + $(this).attr("serial"));
                                      });
      elTypeDiv.append(elType, editType);

      var elNoteDiv = $("<div></div>").addClass("lvAttrDiv")
                                  .attr("id", "elNoteDiv")
      var elNote = $("<p></p>").addClass("elP")
                               .text("Note: " + lvNote);
      var editNote = $("<div></div>").addClass("editAttr")
                                     .attr("note", lvNote)
                                     .attr("serial", lvSerial)
                                     .on("click", function() {

                                      editListingAttr($(this), "note", $(this).attr("note"), "meetings/" + $(this).attr("serial"));
                                    });
      elNoteDiv.append(elNote, editNote);

      var lvGoogleLink = "https://maps.google.com/?q=" + lvAddress;

      var elDirections = $("<a>Get Directions</a>").addClass("lvDirections")
                                     .attr("target", "_blank")
                                     .attr("href", lvGoogleLink);

      var user = firebase.auth().currentUser;

      if ( user ) {

        var deleteListing = $("<p></p>").addClass("deleteP")
                                        .attr("serial", lvSerial)
                                        .attr("name", lvName)
                                        .attr("address", lvAddress)
                                        .attr("day", lvDay)
                                        .attr("time", lvTime)
                                        .attr("type", lvType)
                                        .attr("note", lvNote);
          deleteListing.text("Delete").on("click", function() {

          deletePrompt($(this).attr("serial"), $(this).attr("name"), $(this).attr("address"), $(this).attr("day"), $(this).attr("time"), $(this).attr("type"), $(this).attr("note"));
        });

      } else {

        deleteListing = "";
        $(".editAttr").css("display", "none");
      }

      listing.append(elTitleDiv, elAddressDiv, elDayDiv, elTimeDiv, elTypeDiv, elNoteDiv, elDirections, deleteListing);
    }
  }

  $(".lvListing:last-child").css("border-bottom", "0");

  var push = $("<div></div>").addClass("lvPush");
  lvContainer.append(push);
}
