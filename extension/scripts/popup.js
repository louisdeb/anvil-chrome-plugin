var anvilAppId = 'ldncnaddidblggfmabnfllmjhmagkdoh';

$(document).ready(function() {
  /* Get bluetooth adapter info. */
  chrome.runtime.sendMessage(anvilAppId, {getAdapterStateInfo: true},
    function(response) {
      if(response.info.discovering)
        animateDiscovering();

      /* Debug */
      $('#available').text('adapter available: ' + response.info.available);
      $('#powered').text('adapter powered: ' + response.info.powered);
      $('#name').text('adapter name: ' + response.info.name);
      $('#discovering').text('adapter discovering: ' + response.info.discovering);
    });

  getDevices();
  addButtonListeners();
});

/* Assign functions to the click of buttons. */
function addButtonListeners() {
  $('#findDeviceButton').click(findDevice);
  $('#stopDiscovering').click(stopDiscovering);
}

/* Called to start discovering devices. */
function findDevice() {
  animateDiscovering();
  chrome.runtime.sendMessage(anvilAppId, {startDiscovering: true}, function(response) {});
  $('#discovering').text('adapter discovering: true'); // Debug
}

/* Called to stop discovering devices. */
function stopDiscovering() {
  stopAnimateDiscovering();
  chrome.runtime.sendMessage(anvilAppId, {stopDiscovering: true}, function(response) {});
  $('#discovering').text('adapter discovering: false'); // Debug
}

/* Fetches all discovered devices and connecting addresses from the app.
   When populating the list, it checks whether to set the button to yellow
   to indicate connecting.
   Will eventually also fetch connected devices. */
function getDevices() {
  chrome.runtime.sendMessage(anvilAppId, {getDevices: true},
  function(deviceInfos) {
    chrome.runtime.sendMessage(anvilAppId, {getConnectingAddresses: true},
    function(connectingAddresses) {
      $.each(deviceInfos, function(i) {
        var button = addDevice(deviceInfos[i]);
        if($.inArray(deviceInfos[i].address, connectingAddresses) != -1)
          setButtonConnecting(button);
      });
    });
  });
}

function addDevice(device) {
  var list = $('#device-list');
  var button = $('<button type="button" class="list-group-item device-button"/>').attr('id', device.address).text(device.name).appendTo(list);
  $('.device-button').click(deviceSelected);
  return button;
}

/* Called when a button in the device list is clicked.
   event.target provides the button element. */
function deviceSelected() {
  var button = event.target;
  var id = button.id;
  $('#device-click').text(button.id);
  setButtonConnecting(button);

  chrome.runtime.sendMessage(anvilAppId, {connectionRequested: id},
  function(response) {});
}

/* The app passes us a device which has just been added. We then add it to
   the list.*/
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if('null' != request.deviceAdded)
      addDevice(request.deviceAdded);
  }
);
