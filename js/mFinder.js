
var mFinderNav = $("#mFinderNav").on("click", openNav);

function openNav() {

  $(".hamburger").addClass("hamburgerClose");
  $("#finderHeader").css("background-color", "rgba(10,10,10,.8)");
  $("#mFinderMenu").height( $(window).height() - 50 ).fadeIn(400)
                                                     .addClass("showFinderMNav")
                                                     .css("left", "0");
  mFinderNav.off();
  mFinderNav.on("click", closeNav);
}

function closeNav() {

  $(".hamburger").removeClass("hamburgerClose");
  $("#finderHeader").css("background-color", "rgba(10,10,10,.5)");
  $("#mFinderMenu").fadeOut(400)
                   .removeClass("showFinderMNav")
                   .css("left", "-400px");
  mFinderNav.off();
  mFinderNav.on("click", openNav);
}
