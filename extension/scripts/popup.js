var anvilAppId = "ldncnaddidblggfmabnfllmjhmagkdoh";

$(document).ready(function() {

  /* Ask whether there is a available bluetooth device. */
  chrome.runtime.sendMessage(anvilAppId, {getAdapterStateAvailable: true},
    function(response) {
      $("#output").text(response.adapterStateAvailable);
    });

  $('#findDeviceButton').click(findDevice);
});

function findDevice() {
  $('#findDeviceButton').fadeOut('fast', function() {
    $('#findingDevice').fadeIn('fast', false);
  });

  $('body').animate({
    height: '400px'
  }, 500, false);

}
