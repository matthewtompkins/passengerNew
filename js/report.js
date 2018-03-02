//report meeting variables and function

var reportScreen = $("#reportScreen");
var reportTitle = $("#reportTitle");
var reportAddress = $("#reportAddress");
var reportTime = $("#reportTime");
var reportType = $("#reportType");
var reportSerial = $("#reportSerial");

//form variables
var reportClose = $("#reportClose").on("click", function() {

  reportScreen.removeClass("showError");
});

//hidden input variables, used for mailed infoDiv

var inTitle = $("#inTitle");
var inAddress = $("#inAddress");
var inTime = $("#inTime");
var inType = $("#inType");
var inSerial = $("#inSerial");

//select, textarea, and submit button

var reportSelect = $("#reportSelect");
var reportMessage = $("#reportMessage");
var reportSubmit = $("#reportSubmit");

function reportMeeting(name, address, day, time, type, serial) {

  reportScreen.addClass("showError");
  reportTitle.text(name);
  inTitle.val(name);
  reportAddress.text(address);
  inAddress.val(address);
  reportTime.text(day + ' ' + time);
  inTime.val(day + ' ' + time);
  reportType.text(type);
  inType.val(type);
  inSerial.val(serial);
}
