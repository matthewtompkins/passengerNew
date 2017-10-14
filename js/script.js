
var winVar = $(window);

//GLOBAL PAGE ELEMENTS
var headerMain = $(".headerMain");
var hamburger = $(".hamburger").on("click", openMenu);
var sidebar = $(".sidebar");
var bgText = $(".bgText");
var winWidth = winVar.width();
var screenSmall = 768;

//MENU ELEMENTS
var menu = $(".menu");
var navOption = $(".navOption");

//HOME PAGE SECTION ELEMENTS
var homePage = $(".homePage");

if ( winWidth < 768 ) {

  homePage.height( winVar.height() );
}

var imgMain = $(".imgMain");
var titleLeft = $(".titleLeft");
var titleRight = $(".titleRight");

//MISSION SECTION ELEMENTS
var mission = $(".mission");
var missionStatement = $(".missionStatement");
var imgMission = $(".imgMission");

//SERVICES SECTION ELEMENTS
var serviceContainer = $(".serviceContainer");

//FOOTER ELEMENTS
var mainFooter = $(".mainFooter");

//HOME PAGE SCROLL ANIMATIONS

document.addEventListener("scroll", function() {

  var x = $(this).scrollTop();
  var y = $(window).width();
  winWidth = y;

  //ANIMATE COLOR CHANGE FOR HAMBURGER AND BG LETTERS

  if ( winWidth > screenSmall && x >= mission.offset().top / 3 ) {

    titleLeft.css("left", "-100vw");
    titleRight.css("right", "-100vw");
  }

  if ( winWidth > screenSmall && x <= mission.offset().top / 3 ) {

    titleLeft.css("left", "-50%");
    titleRight.css("right", "-50%");
  }

  if ( winWidth > screenSmall && x >= mission.offset().top - 50 ) {

    hamburger.removeClass("hamburgerWhite").
             addClass("hamburgerPink");
    missionStatement.css("left", "0");
  }

  if ( winWidth > screenSmall && x < mission.offset().top - 50  ) {

    hamburger.removeClass("hamburgerPink")
             .addClass("hamburgerWhite");
    missionStatement.css("left", "-100%");
  }

  //ANIMATE SIDEBAR

  if ( winWidth > screenSmall && sidebar.offset().top >= homePage.height() ) {

    bgText.addClass("fontPink");

  }

  if ( winWidth > screenSmall && sidebar.offset().top < homePage.height() ) {

    bgText.removeClass("fontPink");
  }

  //ANIMATE WORDS OFF TO THE SIDE AS SCROLL DOWN & PARALLAX IMAGES

  if ( winWidth > screenSmall && winVar.scrollTop() > 0 ) {

    /*var getPerc = Math.floor(winVar.scrollTop() / ( homePage.height() / 3 ) * 100);
    var negSubFifty = -(50 + getPerc);
    titleLeft.css("left", negSubFifty + "%");
    titleRight.css("right", negSubFifty + "%");*/

    var translate = "translateY(" + (x/10) + "px)";
    var xTranslate = "translateX(" + (x/10) + "px)";
    imgMain.css("transform", translate);
    imgMission.css("transform", xTranslate);
  }

  //COLOR CHANGE SERVICES

  if ( winWidth > screenSmall && x >= serviceContainer.offset().top ) {

    hamburger.removeClass("hamburgerPink")
  }

  //IMAGE ANIMATION SERVICES

  if ( winWidth > screenSmall && x >= serviceContainer.offset().top - ( serviceContainer.height() / 3 ) ) {

    var gridImg = $(".gridImg").css("width", "100%");

      setTimeout( function() {

        var gridCon = $(".gridCon").css("opacity", "1");
        var gridP = $(".gridImg p").css("opacity", "1");
        gridImg.css({
        "transition-delay" : "0s",
        "transition" : "2s"
        });
      }, 1000);
  }

}, {passive:true});

function openMenu() {

  headerMain.addClass("z7");
  sidebar.addClass("op0");
  hamburger.addClass("hamburgerClose").off().on("click", closeMenu);
  menu.addClass("fullHeight");
  bgText.css("opacity", "0");

  setTimeout( function() {
    sidebar.removeClass("op0")
           .addClass("z7");
    menu.prepend(bgText);
  },900);

  setTimeout( function() {

    bgText.removeClass("z2 fontPink")
          .addClass("fontBlack")
          .css("opacity", ".02");
  }, 950);

  setTimeout( function() {

    navOption.css("opacity", "1");
  }, 1600);
}

function closeMenu() {

  hamburger.removeClass("hamburgerClose").off().on("click", openMenu);
  bgText.css("opacity", "0");
  sidebar.addClass("op0")
         .removeClass("z7");

  setTimeout( function() {

    navOption.css("opacity", "0");
  }, 300);

  setTimeout( function() {

    menu.removeClass("fullHeight");
  }, 950);

  setTimeout( function() {

    sidebar.removeClass("op0");
    bgText.removeClass("fontBlack")
          .addClass("fontWhite z2");
    homePage.prepend(bgText);
    bgText.css("opacity", ".1")
            .addClass("dFlex");
  }, 1250);

}
