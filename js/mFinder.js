
var mFinderNav = $("#mFinderNav").on("click", openNav);
var mFinderCloseNav = $("#mFinderCloseNav").on("click", closeNav);

function openNav() {

  $("#finderHeader").css("background-color", "rgba(10,10,10,.8)");
  $("#mFinderMenu").height( $(window).height() - 50 ).fadeIn(400)
                                                     .addClass("showFinderMNav")
                                                     .css("left", "0");
  mFinderNav.css("display", "none");
  mFinderCloseNav.css("display", "block");
}

function closeNav() {

  $("#finderHeader").css("background-color", "rgba(10,10,10,.5)");
  $("#mFinderMenu").fadeOut(400)
                   .removeClass("showFinderMNav")
                   .css("left", "-400px");
  mFinderCloseNav.css("display", "none");
  mFinderNav.css("display", "block");
}
