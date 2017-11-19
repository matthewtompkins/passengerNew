
window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)};

 //GLOBAL PAGE ELEMENTS
 var headerMain = $(".headerMain");
 var hamburger = $(".hamburger").on("click", openMenu);
 var sidebar = $(".sidebar");
 var bgText = $(".bgText");
 var winWidth = window.innerWidth;
 var screenSmall = 768;
 var ifMobile;
 var newScroll = 0;

 if ( winWidth <= screenSmall ) {
   ifMobile = true;
 } else {
   ifMobile = false;
 }

 //MENU ELEMENTS
 var menu = $(".menu");
 var navOption = $(".navOption");

//HOME PAGE ELEMENTS

var homePage = $("#homePage");
var imgMain = document.getElementById("imgMain");

var titleLeft = document.getElementById("titleLeft");
var titleRight = document.getElementById("titleRight");

var contMiss = document.getElementById("contMiss");
var missHeight;

if (contMiss) {

   missHeight = contMiss.offsetHeight;
}

var imgMission = document.getElementById("imgMission");
var missionStatement = document.getElementById("missionStatement");

var contService = document.getElementById("contService");

//STORY PAGE ELEMENTS

if ( window.location.pathname.includes("story.html") ) {

  //TEXT ANIMATIONS
  var contProb = document.getElementById("problem");

  var probHeight = contProb.offsetHeight;
  var rightBorder = $("#rightBorder");
  var probText = $("#probText");
  var probText2 = $("#probText2");

  var animTLBorder = $("#animTLBorder");
  var animBRBorder = $("#animBRBorder");
  var animTopBorder = $("#animTopBorder");

  var contInsp = document.getElementById("insp");

  var inspHeight = contInsp.offsetHeight;
  var cloudOne = $("#cloudOne");
  var cloudTwo = $("#cloudTwo");
  var car = $("#car");
}

window.addEventListener("scroll", function() {

  if ( !ifMobile ) {

    if ( !window.location.pathname.includes("story.html") && !window.location.pathname.includes("contact.html") ) {

      requestAnimationFrame(parallaxHome);
    } else if ( window.location.pathname.includes("story.html") ) {

      requestAnimationFrame(parallaxStory);
    }
  }
}, false);

//HOMEPAGE PARALLAX FUNCTIONS

function parallaxHome() {

  var scrollTop = window.pageYOffset;

  imgMain.style.top = 50 + scrollTop * .02 + '%';

  var titlePerc = -50 + -scrollTop * .2 + '%';

  titleLeft.style.left = titlePerc;
  titleRight.style.right = titlePerc;

  var missTop = contMiss.offsetTop;

  if ( scrollTop >= missTop - 100 && scrollTop <= missTop + missHeight ) {

    requestAnimationFrame(articleShow);
    requestAnimationFrame(hamPink);
    requestAnimationFrame(bgTextPink);
  } else {

    requestAnimationFrame(articleHide);
    requestAnimationFrame(hamWhite);
    requestAnimationFrame(bgTextNotPink);
  }

  var servTop = contService.offsetTop;

  if ( scrollTop >= servTop - 100) {

    requestAnimationFrame(serviceShow);
  }

  imgMission.style.right = scrollTop * .08 + 'px';
}

function articleShow() {

  missionStatement.style.left = 0 + 'px';
}

function articleHide() {

  missionStatement.style.left = '-100%';
}

function serviceShow() {

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

//OUR-STORY PARALLAX FUNCTIONS

function parallaxStory() {

  var scrollTop = window.pageYOffset;

  var probTop = contProb.offsetTop;

  var inspTop = contInsp.offsetTop;

  if ( scrollTop >= probTop - 200 && scrollTop <= probTop + probHeight ) {

    requestAnimationFrame(function() {

      animateBorder(rightBorder);
      slideText(probText, "left");
      slideText(probText2, "left");
      animTLBorder.css("width", "calc(12em - 1px)");

        setTimeout(function() {
          animTLBorder.css("height", "100%");
          animBRBorder.css("width", "100%");

          setTimeout(function() {
            animBRBorder.css("height", "100%");
            animTopBorder.css("width", "100%");
          }, 300);

        }, 600);
    });

  }

  if ( scrollTop >= inspTop - inspHeight - 200 && scrollTop <= inspTop + inspHeight ) {

      if ( scrollTop < newScroll ) {

        car.css("transform", "scaleX(-1)");
      } else {

        car.css("transform", "scaleX(1)");
      }

    requestAnimationFrame(function() {

      var calcDist = ( contInsp.offsetTop - window.pageYOffset + inspHeight ) / winWidth * 100;

      animateScene(cloudOne, "left", calcDist, .3);
      animateScene(cloudTwo, "right", calcDist, .6);
      animateScene(car, "left", calcDist, 1);
    });
  }

  newScroll = scrollTop;
}

//OUR-STORY ANIMATE FUNCTIONS

function animateBorder(object) {

  object.addClass("animateBorder");
}

function removeBorder(object) {

  object.removeClass("animateBorder");
}

function slideText(object, direction) {

  object.css(direction, "0");
}

function hideText(object, direction) {

  object.css(direction, "calc(100% + 2em)");
}

function animateScene(object, direction, distance, speed) {

  var calcSpeed = distance * speed;
  var makePercent = calcSpeed + '%';

  object.css( direction, makePercent);
}

//MENU FUNCTIONS

function hamWhite() {

  hamburger.removeClass("hamburgerPink")
           .addClass("hamburgerWhite");
}

function hamPink() {

  hamburger.removeClass("hamburgerWhite")
           .addClass("hamburgerPink");
}

function bgTextPink() {

  bgText.addClass("fontPink");
}

function bgTextNotPink() {

  bgText.removeClass("fontPink");
}


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

    if (homePage) {

      homePage.prepend(bgText);
    }

    bgText.css("opacity", ".1")
            .addClass("dFlex");
  }, 1250);

}