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

  getDevices();

  $('#findDeviceButton').click(findDevice);
  $('#stopDiscovering').click(stopDiscovering);
});

/* Start discovery. */
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

/* Fetches all discovered devices from the App, and populates the list with them. */
function getDevices() {
  chrome.runtime.sendMessage(anvilAppId, {getDevices: true}, function(deviceInfos) {
    $('#num-devices').text('num devices: ' + deviceInfos.length);
    populateDeviceList(deviceInfos);
  });
}

/* Instead of emptying the list each time, we should try and just fetch new discoveries and add those. Currently we empty the list and fetch all discoveries, and then repopulate the list. */
function populateDeviceList(deviceInfos) {
  var list = $('#device-list');
  $(list).empty();
  $.each(deviceInfos, function(i) {
    var button = $('<button type="button" class="list-group-item device-button"/>').attr('id', deviceInfos[i].address).text(deviceInfos[i].name).appendTo(list);
  });
  $('.device-button').click(deviceSelected);
}

/* When the App notifies us that a new device has been discovered, we get the devices. */
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if(request.deviceAdded)
      getDevices();
  }
);

// Possibly add a function to stop discovery when the extension window is closed.

/* Called when a button in the device list is clicked.
   event.target provides the button element. */
function deviceSelected() {
  var button = event.target;
  $('#device-click').text(button.id);
}
