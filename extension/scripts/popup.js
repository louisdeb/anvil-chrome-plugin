var anvilAppId = "ldncnaddidblggfmabnfllmjhmagkdoh";

$(document).ready(function() {

  /* Get bluetooth adapter info. */
  chrome.runtime.sendMessage(anvilAppId, {getAdapterStateInfo: true},
    function(response) {
      $("#available").text("adapter available: " + response.info.available);

      $("#powered").text("adapter powered: " + response.info.powered);

      $("#name").text("adapter name: " + response.info.name);

      $("#discovering").text("adapter discovering: " + response.info.discovering);
    });

  $('#findDeviceButton').click(findDevice);
});

function findDevice() {
  $('#findDeviceButton').fadeOut('fast', function() {
    $('#findingDevice').fadeIn('fast', false);
  });

  

}
