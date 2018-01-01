
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

//OUR STORY ELEMENTS

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

//CONTACT ELEMENTS

if ( window.location.pathname.includes("contact.html") ) {

  var bgGrad = $("#bgGrad");

  var contactDiv = $("#contactDiv");

  var promptEm = $("#promptEm");
  var promptQu = $("#promptQu");

  //EMERGENCY VARIABLES

  var emDiv = $("#emDiv");

  var emBack = document.getElementById("emBack");
  emBack.addEventListener("click", closeEmergency);

  var emergency = document.getElementById("emergency");
  emergency.addEventListener("click", showEmergency);

  //FORM VARIABLES

  var quDiv = document.getElementById("quDiv");

  var query = document.getElementById("query");
  query.addEventListener("click", showQuery);

  var backArrow = document.getElementById("backArrow");
  backArrow.addEventListener("click", queryBack)

  var quName = document.getElementById("quName");

  var typeTitle = document.getElementById("typeTitle");



  //TYPE OF QUERY INPUT

  var optionType = $(".optionType").on("click", function() {

    bgGrad.css("background-position", "25%");
    optionType.removeClass("activeOption");
    $(this).addClass("activeOption");

    setTimeout(function() {

      showName();
    },300);
  });

  var optServ = document.getElementById("optServ");
  optServ.addEventListener("click", function() {

    selectRad("serv");
  });

  var optEvent = document.getElementById("optEvent");
  optEvent.addEventListener("click", function() {

    selectRad("eve");
  });

  var optVol = document.getElementById("optVol");
  optVol.addEventListener("click", function() {

    selectRad("vol");
  });

  var optQu = document.getElementById("optQu");
  optQu.addEventListener("click", function() {

    selectRad("qu");
  });

  //NAME AND EMAIL INPUT

  var formInput = $(".formInput").on("focusin", function() {

    var thisIn = $(this);

    var inHold = thisIn.next();
    inHold.css("bottom", "1em");

    formInput.on("input", function() {

      var thisIn = $(this);

      if ( thisIn.val() === "" ) {

        if ( thisIn.attr("name") === "name" ) {

          nValTrue.css("opacity", "0");
          nValFalse.css("opacity", ".5");
          thisIn.attr("valid", "false");
        } else {

          eValTrue.css("opacity", "0");
          eValFalse.css("opacity", ".5");
          thisIn.attr("valid", "false");
        }

        var inHold = thisIn.next();
        inHold.css("bottom", "0");
      } else {

        var inHold = thisIn.next();
        inHold.css("bottom", "1em");

        if ( thisIn.attr("name") === "name" ) {

          nValFalse.css("opacity", "0");
          nValTrue.css("opacity", ".5");
          thisIn.attr("valid", "true");
        } else {

          validate(thisIn);
        }
      }
    }).on("focusout", function() {

      var thisIn = $(this);

      if ( thisIn.val() === "" ) {

        if ( thisIn.attr("name") === "name" ) {

          nValTrue.css("opacity", "0");
          nValFalse.css("opacity", ".5");
        } else {

          eValTrue.css("opacity", "0");
          eValFalse.css("opacity", ".5");
        }

        var inHold = thisIn.next();
        inHold.css("bottom", "0");

      }
    });
  });

  var nValTrue = $("#nVal .trueIcon");
  var nValFalse = $("#nVal .falseIcon");

  var eValTrue = $("#eVal .trueIcon");
  var eValFalse = $("#eVal .falseIcon");

  var toMessage = document.getElementById("toMessage");
  toMessage.addEventListener("click", function() {

    if ( formInput[0].getAttribute("valid") === "true" && formInput[1].getAttribute("valid") === "true" ) {

      var errMsg = document.getElementById("errMsg");
      errMsg.style.opacity = "0";
      showMsg();
    } else {

      var errMsg = document.getElementById("errMsg");
      errMsg.style.opacity = "1";
    }
  });

  //MESSAGE INPUT

  var quMsg = document.getElementById("quMsg");

}

//PARALLAX LISTENER

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

//CONTACT FUNCTIONS

function hideContact() {

  contactDiv.css("opacity", "0");
  bgGrad.css("background-position", "50%");

  setTimeout(function() {

    contactDiv.css("display", "none");
  }, 600);
}

function showContact() {

  contactDiv.css("display", "flex");

  setTimeout(function() {
    contactDiv.css("opacity", "1");
  }, 60);
}

function showEmergency() {

  hideContact();

  setTimeout(function() {

    emDiv.css("display", "block");

    setTimeout(function() {

      emDiv.css("opacity", "1");
    }, 60 );
  }, 600);
}

function closeEmergency() {

  bgGrad.css("background-position", "100%");
  emDiv.css("opacity", "0");

  setTimeout(function() {

    emDiv.css("display", "none");
    showContact();
  }, 600);
}

//QUERY FUNCTION

function showQuery() {

  hideContact();

  contactDiv.attr("state", "type");
  setTimeout(function() {

    quDiv.style.display = "block";

    setTimeout(function() {

      quDiv.style.opacity = "1";
    }, 60);
  }, 600);

}


function queryBack() {

  if ( contactDiv.attr("state") === "type" ) {

    optionType.removeClass("activeOption");
    quDiv.style.opacity = "0";
    bgGrad.css("background-position", "100%");

    setTimeout(function() {

      quDiv.style.display = "none";
      showContact();
    }, 600);
  } else if ( contactDiv.attr("state") === "name" ) {

    contactDiv.attr("state", "type");
    quName.style.opacity = "0";
    bgGrad.css("background-position", "50%");

    setTimeout(function() {

      quName.style.display = "none";
    }, 600);
  } else if ( contactDiv.attr("state") === "msg" ) {

    contactDiv.attr("state", "name");
    quMsg.style.opacity = "0";
    bgGrad.css("background-position", "25%");

    setTimeout(function() {

      quMsg.style.display = "none";
    }, 600);
  }
}

//TYPE FUNCTIONS

function selectRad(type) {

  $(".radType").attr("checked", false);

  if ( type === "serv" ) {

    var radServ = $("#radServ").attr("checked", "checked");
  } else if ( type === "eve" ) {

    var radEvent = $("#radEvent").attr("checked", "checked");
  } else if ( type === "vol" ) {

    var radVol = $("#radVol").attr("checked", "checked");
  } else {

    var radQu = $("#radQu").attr("checked", "checked");
  }
}

//NAME FUNCTIONS

function showName() {

  if ( $("#radServ").attr("checked") === "checked" ) {

    var servNote = document.getElementById("servNote");
    servNote.style.display = "flex";

    var noteClose = document.getElementById("noteClose");
    noteClose.addEventListener("click", function() {

      servNote.style.display = "none";
    });
  }

  contactDiv.attr("state", "name");

  quName.style.display = "flex";

  typeTitle.style.opacity = "0";

  setTimeout(function() {

    quName.style.opacity = "1";
  }, 60);
}


//EMAIL VALIDATION

function validate(input) {

  var eStrings = [".", "@"];

  var value = input.val();

  if ( value.includes( eStrings[0]) && value.includes( eStrings[1] ) ) {


    eValFalse.css("opacity", "0");
    eValTrue.css("opacity", ".5");
    input.attr("valid", "true");
  } else {

    eValTrue.css("opacity", "0");
    eValFalse.css("opacity", ".5");
    input.attr("valid", "false");
  }
}

//MESSAGE FUNCTIONS

function showMsg() {

  contactDiv.attr("state", "msg");
  bgGrad.css("background-position", "0%");
  quMsg.style.display = "block";

  setTimeout(function() {

    quMsg.style.opacity = "1";
  }, 60);
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
