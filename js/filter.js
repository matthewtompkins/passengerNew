
//bottom screen filter buttons
var nearMe = $("#nearMe").on("click", showNearMe);
var filterOptions = $("#filterOptions").on("click", showFilterOptions);
var listView = $("#listView").on("click", showListView);
var showAll = $("#showAll").on("click", showAll);

//filter options variables
var filterDiv = $("#filterDiv");
var filterDivCloseBtn = $("#filterDivCloseBtn").on("click", closeFilterOptions);
var filterDayList = $("#filterDayList");
var allDayFilters = $("#filterDayList li");
var filterTodList = $("#filterTodList");
var allTod = $("#filterTodList li");
var allType = $("#filterTypeList li");
var filterTypeList = $("#filterTypeList");
var clearFiltersBtn = $("#clearFiltersBtn").on("click", clearFilters);

//filter day variables

var filterMonday = $("#filterMonday").on("click", function() {
  filterDay(filterMonday, "Monday");
});

var filterTuesday = $("#filterTuesday").on("click", function() {
  filterDay(filterTuesday, "Tuesday");
});

var filterWednesday = $("#filterWednesday").on("click", function() {
  filterDay(filterWednesday, "Wednesday");
});

var filterThursday = $("#filterThursday").on("click", function() {
  filterDay(filterThursday, "Thursday");
});

var filterFriday = $("#filterFriday").on("click", function() {
  filterDay(filterFriday, "Friday");
});

var filterSaturday = $("#filterSaturday").on("click", function() {
  filterDay(filterSaturday, "Saturday");
});

var filterSunday = $("#filterSunday").on("click", function() {
  filterDay(filterSunday, "Sunday");
});

//filter time variables

var filterAM = $("#filterAM").on("click", function() {
  filterTod(filterAM, "AM");
})

var filterAfternoon = $("#filterAfternoon").on("click", function() {
  filterTod(filterAfternoon, "Afternoon");
})

var filterEvening = $("#filterEvening").on("click", function() {
  filterTod(filterEvening, "Evening");
})

// filter type variables

var filterAA = $("#filterAA").on("click", function() {
  filterType(filterAA, "AA");
});

var filterNA = $("#filterNA").on("click", function() {
  filterType(filterNA, "NA");
});

var filterNAMI = $("#filterNAMI").on("click", function() {
  filterType(filterNAMI, "NAMI");
});

var filterR = $("#filterR").on("click", function() {
  filterType(filterR, "R");
});

//list view "goBack" buttons

var toMap = $(".toMap").on("click", closeListView);


//trigger functions to declare which filter mode is active
//these indicators should be FALSE whenever this filter isn't active
//they prevent database updates from affecting the current filter settings
var nearMeFilter = false;
var listViewFilter = false;
var showAllFilter = true;

var daysOTW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


//animate Show All button on load
$(setTimeout(function() {
  showAll.addClass("filterSelected");
}, 1500));


//show all meetings near user and filter out meetings that have already happened today

function showNearMe() {

  //first show all markers (in case any were filtered out)
  for (i = 0; i < markerArray.length; i++) {
    markerArray[i].setVisible(true);
  }

  geoLocate();
  nearMeFilter = true;

  //if not mobile, button animation
  if ( $(window).width() >= 900 ) {

    nearMe.addClass("filterSelected");
  }

  //other selected button animations
  if (showAllFilter === true) {
    showAllFilter = false;
    showAll.removeClass("filterSelected");
  }

  if (listViewFilter === true) {
    listViewFilter = false;
    listView.removeClass("filterSelected");
  }

  filterOptions.removeClass("filterSelected");

  filterToday();
}

//Filters specifically today instead of a selected day

function filterToday() {

  //get current time and convert to military hours string
  var date = new Date();
  var day = date.getDay();
  var hours = date.getHours();
  hours = hours.toString();
  var minutes = date.getMinutes();
  minutes = minutes.toString();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  var filterNumTime = hours + minutes;

  //get day of the week string
  var stringDay = daysOTW[day];

//removes visibility of non-matching days
  for (i = 0; i < markerArray.length; i++) {
    if ( stringDay != markerArray[i].day ) {
      markerArray[i].setVisible(false);
    }
  }

//removes visibility of meetings that already happened on this day
  for (i = 0; i < markerArray.length; i++) {
    if ( filterNumTime >= Number(markerArray[i].numTime) ) {
      markerArray[i].setVisible(false);
    }
  }
}

//opens Filter Options div

function showFilterOptions() {

  filterOptionsFilter = true;
  filterDiv.addClass("visible");

  //if add window open, close
  if ( addDiv.hasClass("visible") ) {
    closeAdd();
  }

  //if info window open, close
  if ( $("#infoDiv").hasClass("visible") ) {
    $("#infoDiv").removeClass("visible");
  }

  //if not mobile, button animations
  if ( $(window).width() >= 900 ) {

    filterOptions.addClass("filterSelected");
  }

  //button animations

  if ( listViewFilter ) {

    filterOptionsFilter = false;
    listViewFilter.removeClass("filterSelected");
  }

}

//close function for filter options window

function closeFilterOptions() {

  if ( filterDiv.hasClass("visible") ) {

    filterDiv.removeClass("visible");
  }
  if ( filterOptions.hasClass("filterSelected") ) {

    filterOptions.removeClass("filterSelected");
  }
}

//open and close List View

function showListView() {

  createLV();
  listViewScreen.addClass("visible");
}

function closeListView() {

  $(".lvListing").remove();
  $(".lvPush").remove();
  listViewScreen.removeClass("visible");
}

//Shows all meetings

function showAll() {

  showAllFilter = true;

  clearFilters();

  //button animations
  if ( nearMeFilter ) {

    nearMeFilter = false;
    nearMe.removeClass("filterSelected");
  }

  if ( listViewFilter ) {

    listViewFilter = false;
    listView.removeClass("filterSelected");
  }
}


//filter options div functions
//Each functions accepts a button arguement
//This is so the filter button that has been pressed
//not only calls the filter function
//but gets assigned an active css class
//Probably should have used $(this) in retrospect
//but fully functional as it stands

function filterDay(button, day) {

  allDayFilters.removeClass("optionSelected");
  button.addClass("optionSelected");
  filterDayList.attr("filter",day);
  for (i = 0; i < markerArray.length; i++) {

    markerArray[i].setVisible(true);

    //check other filters
    checkTodFilter();
    checkTypeFilter();

    if ( markerArray[i].day != day ) {

      markerArray[i].setVisible(false);
    }
  }

  showAll.removeClass("filterSelected");
}

function filterTod(button, time) {

  allTod.removeClass("optionSelected");
  button.addClass("optionSelected");
  filterTodList.attr("filter",time);

  for (i = 0; i < markerArray.length; i++) {

    markerArray[i].setVisible(true);

    //check other filters
    checkDayFilter();
    checkTypeFilter();

    //hide markers of non-selected time
    if ( markerArray[i].visible && time === "AM" ) {

      if ( markerArray[i].numTime > 1199 ) {

        markerArray[i].setVisible(false);
      }
    } else if ( markerArray[i].visible && time === "Afternoon" ) {

        if ( markerArray[i].numTime <= 1199 || markerArray[i].numTime > 1700 ) {

          markerArray[i].setVisible(false);
        }
      } else if ( markerArray[i].visible && time === "Evening" ) {

          if ( markerArray[i].numTime < 1700 ) {

            markerArray[i].setVisible(false);
          }
        }
  }

  showAll.removeClass("filterSelected");
}

function filterType(button, type) {

  allType.removeClass("optionSelected");
  button.addClass("optionSelected");
  filterTypeList.attr("filter", type);

  for (i = 0; i < markerArray.length; i++) {

    markerArray[i].setVisible(true);

    //check other filters
    checkDayFilter();
    checkTodFilter();

    if ( markerArray[i].type != type ) {

      markerArray[i].setVisible(false);
    }
  }

  showAll.removeClass("filterSelected");
}

//Check filters are quick cross-reference functions
//executed when another filter is called
//They insure that active filters stay active
//while a new filter becomes active

function checkDayFilter() {

  var dayFilter = filterDayList.attr("filter");
  if ( dayFilter === undefined ) {

    doNothing();
  } else if ( markerArray[i].day != dayFilter ) {

    markerArray[i].setVisible(false);
  }
}

function checkTodFilter() {

  var todFilter = filterTodList.attr("filter");
  if ( todFilter === undefined ) {

    doNothing();
  }

  if ( todFilter === "AM" ) {

    if ( markerArray[i].numTime > 1199 ) {

      markerArray[i].setVisible(false);
    }
  } else if ( todFilter === "Afternoon" ) {

      if ( markerArray[i].numTime <= 1199 || markerArray[i].numTime > 1700 ) {

        markerArray[i].setVisible(false);
      }
    } else if ( todFilter === "Evening" ) {

        if ( markerArray[i].numTime < 1700 ) {

          markerArray[i].setVisible(false);
        }
      }
}

function checkTypeFilter() {

  var typeFilter = filterTypeList.attr("filter");
  if ( typeFilter === undefined ) {

    doNothing();
  } else if ( markerArray[i].type != typeFilter ) {

    markerArray[i].setVisible(false);
  }
}

//clear all active filters

function clearFilters() {

  showAll.addClass("filterSelected");
  allDayFilters.removeClass("optionSelected");
  allTod.removeClass("optionSelected");
  allType.removeClass("optionSelected");
  filterDayList.removeAttr("filter");
  filterTodList.removeAttr("filter");
  filterTypeList.removeAttr("filter");

  for (i = 0; i < markerArray.length; i++) {

    markerArray[i].setVisible(true);
  }
}
