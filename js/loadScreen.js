var windowHeight = $(window).height();

var loadScreen = $("#loadScreen").height(windowHeight);

//close loading screen on google callback

function fadeLoad() {

  setTimeout(function() {

    $("#loadScreen").fadeOut(600);
  }, 2000);
}
