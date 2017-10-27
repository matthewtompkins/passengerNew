
window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)};

//HOME PAGE ELEMENTS
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

//GLOBAL PAGE ELEMENTS
var headerMain = $(".headerMain");
var hamburger = $(".hamburger").on("click", openMenu);
var sidebar = $(".sidebar");
var bgText = $(".bgText");
var winWidth = window.innerWidth;
var screenSmall = 768;
var ifMobile;

if ( winWidth <= screenSmall ) {
  ifMobile = true;
} else {
  ifMobile = false;
}

//MENU ELEMENTS
var menu = $(".menu");
var navOption = $(".navOption");

window.addEventListener("scroll", function() {

  if ( !ifMobile ) {

    if ( imgMain ) {

      requestAnimationFrame(parallaxHome);
    }
  }
}, false);

function parallaxHome() {

  var scrollTop = window.pageYOffset;

  imgMain.style.top = 50 + scrollTop * .02 + '%';

  var titlePerc = -50 + -scrollTop * .2 + '%';

  titleLeft.style.left = titlePerc;
  titleRight.style.right = titlePerc;

  var missTop = contMiss.offsetTop;

  if ( contMiss && scrollTop >= missTop - 100 && scrollTop <= missTop + missHeight ) {

    requestAnimationFrame(articleShow);
    requestAnimationFrame(hamPink);
  } else {

    requestAnimationFrame(articleHide);
    requestAnimationFrame(hamWhite);
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

function hamWhite() {

  hamburger.removeClass("hamburgerPink")
           .addClass("hamburgerWhite");
}

function hamPink() {

  hamburger.removeClass("hamburgerWhite")
           .addClass("hamburgerPink");
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
