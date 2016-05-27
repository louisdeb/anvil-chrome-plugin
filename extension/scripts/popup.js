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
  console.log('getDevices');
  chrome.runtime.sendMessage(anvilAppId, {getDevices: true}, function(deviceInfos) {
    console.log('amount: ' + deviceInfos.length);
    $.each(deviceInfos, function(i) {
      addDevice(deviceInfos[i]);
    });
  });
}

function addDevice(device) {
  var list = $('#device-list');
  var button = $('<button type="button" class="list-group-item device-button"/>').attr('id', device.address).text(device.name).appendTo(list);
  $('.device-button').click(deviceSelected);
}

/* When the App notifies us that a new device has been discovered, we get the devices. */
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if('null' != request.deviceAdded) {
      addDevice(request.deviceAdded);
    }
  }
);

// Possibly add a function to stop discovery when the extension window is closed.

/* Called when a button in the device list is clicked.
   event.target provides the button element. */
function deviceSelected() {
  var button = event.target;
  var id = button.id;
  $('#device-click').text(id);
  $(button).css('background', '#FFF85F');
  //yellow: FFF85F
  //green: 9EF85F

  chrome.runtime.sendMessage(anvilAppId, {connectionRequested: id}, function(response) {});
}
