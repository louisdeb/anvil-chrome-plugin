var anvilAppId = 'ldncnaddidblggfmabnfllmjhmagkdoh';

$(document).ready(function() {

  /* Get bluetooth adapter info. */
  chrome.runtime.sendMessage(anvilAppId, {getAdapterStateInfo: true},
    function(response) {
      $('#available').text('adapter available: ' + response.info.available);

      $('#powered').text('adapter powered: ' + response.info.powered);

      $('#name').text('adapter name: ' + response.info.name);

      $('#discovering').text('adapter discovering: ' + response.info.discovering);
    });

  $('#findDeviceButton').click(findDevice);
  $('#stopDiscovering').click(stopDiscovering);
});

function findDevice() {
  chrome.runtime.sendMessage(anvilAppId, {startDiscovering: true}, function(response) {
    $('#findDeviceButton').fadeOut('fast', function() {
      $('#findingDevice').fadeIn('fast', false);
    });
  });

  $('#discovering').text('adapter discovering: true');
}

function stopDiscovering() {
  chrome.runtime.sendMessage(anvilAppId, {stopDiscovering: true}, function(response) {});

  $('#discovering').text('adapter discovering: false');
}

function getDevices() {
  chrome.runtime.sendMessage(anvilAppId, {getDevices: true}, function(deviceInfos) {
    $('#num-devices').text('num devices: ' + deviceInfos.length);

  });
}

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if(request.deviceAdded)
      getDevices();
  }
);

// Add a function to stop discovery when the extension window is closed.
