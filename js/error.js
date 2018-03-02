

var errorScreen = $("#errorScreen");
var errorMsg = $("#errorMsg");
var errorTxt = $("#errorTxt");
var closeError = $("#closeError").on("click", fncCloseError);

errorScreen.height( $(window).height() );

function fncCloseError() {

  errorScreen.removeClass("showError");
  $(".errorListing").remove();
  $("#verifyTxt").remove();
  $(".verifyBtn").remove();
  $(".verifyDiv").remove();
}
